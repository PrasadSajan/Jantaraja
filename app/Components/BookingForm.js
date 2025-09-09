// app/components/BookingForm.js
'use client'; // This directive makes this a Client Component

import { useState } from 'react';

export default function BookingForm({ carId, pricePerDay }) {
  // State to manage form inputs
  const [formData, setFormData] = useState({
    user_name: '',
    user_email: '',
    user_phone: '',
    start_date: '',
    end_date: '',
  });
  const [totalPrice, setTotalPrice] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState('');

  // Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Calculate price when dates change
  const calculatePrice = (start, end) => {
    if (start && end) {
      const startDate = new Date(start);
      const endDate = new Date(end);
      // Calculate difference in days
      const timeDiff = endDate.getTime() - startDate.getTime();
      const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));
      // Calculate total price, ensure at least 1 day
      const total = daysDiff > 0 ? daysDiff * pricePerDay : pricePerDay;
      setTotalPrice(total);
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage('');

    try {
      const response = await fetch('/api/bookings', { // We'll create this API route next
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          car_id: carId,
          ...formData,
          total_price: totalPrice,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage('Booking successful! We will confirm your reservation shortly.');
        // Reset form
        setFormData({
          user_name: '',
          user_email: '',
          user_phone: '',
          start_date: '',
          end_date: '',
        });
        setTotalPrice(0);
      } else {
        setMessage(data.error || 'Something went wrong!');
      }
    } catch (error) {
      setMessage('Network error. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="mt-8 p-6 bg-gray-50 rounded-lg">
      <h2 className="text-2xl font-bold mb-4 text-gray-900 bg-white">Book This Car</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="user_name" className="block text-sm font-medium text-gray-700">Full Name *</label>
            <input
              type="text"
              id="user_name"
              name="user_name"
              value={formData.user_name}
              onChange={handleChange}
              required
              className="mt-1 block w-full border border-gray-300 rounded-md py-2 px-3 text-gray-900 bg-white focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
          </div>
          <div>
            <label htmlFor="user_email" className="block text-sm font-medium text-gray-700">Email *</label>
            <input
              type="email"
              id="user_email"
              name="user_email"
              value={formData.user_email}
              onChange={handleChange}
              required
              className="mt-1 block w-full border border-gray-300 rounded-md py-2 px-3 text-gray-900 bg-white focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
          </div>
        </div>

        <div>
          <label htmlFor="user_phone" className="block text-sm font-medium text-gray-700">Phone Number</label>
          <input
            type="tel"
            id="user_phone"
            name="user_phone"
            value={formData.user_phone}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md py-2 px-3 text-gray-900 bg-white focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="start_date" className="block text-sm font-medium text-gray-700">Start Date *</label>
            <input
              type="date"
              id="start_date"
              name="start_date"
              value={formData.start_date}
              onChange={(e) => {
                handleChange(e);
                calculatePrice(e.target.value, formData.end_date);
              }}
              required
              min={new Date().toISOString().split('T')[0]} // Disable past dates
              className="mt-1 block w-full border border-gray-300 rounded-md py-2 px-3 text-gray-900 bg-white focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label htmlFor="end_date" className="block text-sm font-medium text-gray-700">End Date *</label>
            <input
              type="date"
              id="end_date"
              name="end_date"
              value={formData.end_date}
              onChange={(e) => {
                handleChange(e);
                calculatePrice(formData.start_date, e.target.value);
              }}
              required
              min={formData.start_date || new Date().toISOString().split('T')[0]}
              className="mt-1 block w-full border border-gray-300 rounded-md py-2 px-3 text-gray-900 bg-white focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>

        {totalPrice > 0 && (
          <div className="p-4 bg-blue-50 rounded-md">
            <p className="text-lg font-semibold text-blue-800">
              Total Price: ₹{totalPrice.toLocaleString()}
              <span className="text-sm font-normal text-blue-600"> ({totalPrice / pricePerDay} days)</span>
            </p>
          </div>
        )}

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-semibold py-3 px-4 rounded-md transition-colors"
        >
          {isSubmitting ? 'Processing...' : 'Confirm Booking'}
        </button>

        {message && (
          <div className={`p-3 rounded-md ${message.includes('successful') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
            {message}
          </div>
        )}
      </form>
    </div>
  );
}