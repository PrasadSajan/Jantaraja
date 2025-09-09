// app/components/CarCard.js
import Image from 'next/image';
import Link from 'next/link';

// Helper function to format the price
function formatPrice(price) {
  // Convert the price to a number, round it to remove decimals, then format with commas
  return '₹' + Math.round(Number(price)).toLocaleString('en-US');
}


export default function CarCard({ car }) {
  return (
    <div className="border border-gray-200 rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
      {/* Car Image */}
      <div className="relative w-full h-48 bg-gray-200">
        <Image
          src={car.image_url || "/placeholder-car.jpg"} // Shows a placeholder if image is missing
          alt={`${car.make} ${car.model}`}
          fill // This makes the image fill the container
          style={{objectFit: "cover"}} // This crops the image to fit
          className='group-hover:scale-105 transition-transform duration-300'
        />
      </div>

      {/* Car Details */}
      <div className="p-4">
        <h3 className="text-xl font-semibold text-gray-800">{car.make} {car.model}</h3>
        <p className="text-gray-600">Year: {car.year} | Type: {car.type}</p>
        <div className="mt-3 flex items-center justify-between">
          <p className="text-2xl font-bold text-blue-600">{formatPrice(car.price_per_day)}<span className="text-sm font-normal text-gray-600"> / day</span></p>
          <Link href={`/cars/${car.id}`} className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors">
            Rent Now
          </Link>
        </div>
      </div>
    </div>
  );
}