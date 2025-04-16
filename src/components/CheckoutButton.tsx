import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSupabase } from '../hooks/useSupabase';
import { Product } from '../stripe-config';

interface CheckoutButtonProps {
  product: Product;
  quantity?: number;
}

export function CheckoutButton({ product, quantity = 1 }: CheckoutButtonProps) {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { supabase } = useSupabase();

  const handleCheckout = async () => {
    try {
      setLoading(true);

      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session) {
        navigate('/login', { state: { returnTo: window.location.pathname } });
        return;
      }

      const response = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/stripe-checkout`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${session.access_token}`,
        },
        body: JSON.stringify({
          price_id: product.priceId,
          success_url: `${window.location.origin}/success`,
          cancel_url: `${window.location.origin}/cancel`,
          mode: product.mode,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to create checkout session');
      }

      const { url } = await response.json();

      if (url) {
        window.location.href = url;
      }
    } catch (error) {
      console.error('Error during checkout:', error);
      // Handle error appropriately
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleCheckout}
      disabled={loading}
      className="px-6 py-2 bg-amber-900 text-white rounded-lg hover:bg-amber-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
    >
      {loading ? 'Processing...' : `Add to Cart ($${(quantity * 3.99).toFixed(2)})`}
    </button>
  );
}