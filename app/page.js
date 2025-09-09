// app/page.js
import CarCard from './Components/CarCard';

// This function will fetch the cars from our new backend API
async function getCars() {
  try {
    const res = await fetch('http://localhost:3001/api/cars'); // Fetch from backend
    if (!res.ok) {
      throw new Error('Failed to fetch cars');
    }
    return res.json();
  } catch (error) {
    console.error("Error fetching cars:", error);
    return []; // Return an empty array if there's an error
  }
}


export default async function Home() {
   // Fetch the cars data from the backend
  const cars = await getCars();

  return (
    <main className="container mx-auto px-4 py-8">
      {/* Hero Section */}
      <section className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Welcome to Janta raja Motars & Financial Services</h1>
        <p className="text-lg text-gray-600">Find the perfect car for your next journey.</p>
      </section>

      {/* Cars Grid Section */}
      <section>
        <h2 className="text-3xl font-semibold text-gray-800 mb-6 text-center">Our Fleet</h2>
        
        {/* Grid of Cars */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {cars.map((car) => (
            <CarCard key={car.id} car={car} />
          ))}
        </div>
      </section>
    </main>
  );
}

//Welcome to Janta raja Motars & Financial Services
