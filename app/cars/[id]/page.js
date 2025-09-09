// app/cars/[id]/page.js
import Image from 'next/image';
import Link from 'next/link';
import BookingForm from '@/app/Components/BookingForm'; // Import the form

// Helper function to format the price (reuse from CarCard)
function formatPrice(price) {
  return '₹' + Math.round(Number(price)).toLocaleString('en-US');
}

// This function fetches the specific car based on the ID in the URL
async function getCar(id) {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'}/api/cars/${id}`);
    if (!res.ok) {
      throw new Error('Failed to fetch car');
    }
    return res.json();
  } catch (error) {
    console.error("Error fetching car:", error);
    return null; // Return null if there's an error
  }
}

// The page component receives the `params` prop, which contains the [id] from the URL
export default async function CarDetailPage({ params }) {
  // Fetch the car data using the ID from params
  const { id } = await params;
  const car = await getCar(id);

  // If the car isn't found, show an error message
  if (!car) {
    return (
      <main className="container mx-auto px-4 py-8 text-center">
        <h1 className="text-2xl font-bold text-red-600">Car Not Found</h1>
        <Link href="/" className="text-blue-600 hover:underline mt-4 inline-block">
          &larr; Back to All Cars
        </Link>
      </main>
    );
  }

  // If the car is found, display its details
  return (
    <main className="container mx-auto px-4 py-8 max-w-4xl">
      {/* Navigation Back */}
      <Link href="/" className="text-blue-600 hover:underline mb-6 inline-block">
        &larr; Back to All Cars
      </Link>

      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        {/* Car Image */}
        <div className="relative w-full h-80 md:h-96">
          <Image
            src={car.image_url}
            alt={`${car.make} ${car.model}`}
            fill
            style={{ objectFit: 'cover' }}
            priority // Prioritize loading this image
          />
        </div>

        {/* Car Details */}
        <div className="p-6 md:p-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
            {car.make} {car.model}
          </h1>
          <p className="text-lg text-gray-600 mb-1">Year: {car.year}</p>
          <p className="text-lg text-gray-600 mb-1">Type: {car.type}</p>
          
          {/* Price */}
          <div className="mt-4 mb-6">
            <p className="text-3xl font-bold text-blue-600">
              {formatPrice(car.price_per_day)} <span className="text-base font-normal text-gray-600">/ day</span>
            </p>
          </div>

          {/* "Rent Now" Button - This will be the booking form trigger */}
          <BookingForm carId={car.id} pricePerDay={car.price_per_day} />
        </div>
      </div>
    </main>
  );
}