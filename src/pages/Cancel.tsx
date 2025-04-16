import { Link } from 'react-router-dom';

export function Cancel() {
  return (
    <div className="min-h-screen bg-amber-50 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-xl max-w-md w-full text-center">
        <h1 className="text-2xl font-bold text-amber-900 mb-4">Order Cancelled</h1>
        <p className="text-gray-600 mb-6">Your order has been cancelled. No charges were made.</p>
        <Link
          to="/"
          className="inline-block px-6 py-2 bg-amber-900 text-white rounded-lg hover:bg-amber-800 transition-colors"
        >
          Return to Home
        </Link>
      </div>
    </div>
  );
}