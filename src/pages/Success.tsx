import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSupabase } from '../hooks/useSupabase';

export function Success() {
  const [orderDetails, setOrderDetails] = useState<any>(null);
  const { supabase } = useSupabase();

  useEffect(() => {
    const fetchLatestOrder = async () => {
      const { data: orders, error } = await supabase
        .from('stripe_user_orders')
        .select('*')
        .order('order_date', { ascending: false })
        .limit(1)
        .single();

      if (error) {
        console.error('Error fetching order:', error);
        return;
      }

      setOrderDetails(orders);
    };

    fetchLatestOrder();
  }, [supabase]);

  return (
    <div className="min-h-screen bg-amber-50 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-xl max-w-md w-full">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-amber-900 mb-4">Thank You for Your Order!</h1>
          <p className="text-gray-600 mb-6">Your order has been successfully processed.</p>

          {orderDetails && (
            <div className="bg-amber-50 p-4 rounded-lg mb-6">
              <h2 className="font-semibold text-amber-900 mb-2">Order Details</h2>
              <p className="text-gray-600">
                Amount: ${(orderDetails.amount_total / 100).toFixed(2)} {orderDetails.currency.toUpperCase()}
              </p>
              <p className="text-gray-600">Order ID: {orderDetails.order_id}</p>
            </div>
          )}

          <Link
            to="/"
            className="inline-block px-6 py-2 bg-amber-900 text-white rounded-lg hover:bg-amber-800 transition-colors"
          >
            Return to Home
          </Link>
        </div>
      </div>
    </div>
  );
}