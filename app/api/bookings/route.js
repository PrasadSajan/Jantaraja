// app/api/bookings/route.js
export async function POST(request) {
  try {
    const body = await request.json();
    
    const response = await fetch(`${process.env.BACKEND_API_URL}/api/bookings`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    const data = await response.json();

    if (!response.ok) {
      return new Response(JSON.stringify({ error: data.error }), { 
        status: response.status 
      });
    }

    return new Response(JSON.stringify(data), { status: 201 });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Internal server error' }), { 
      status: 500 
    });
  }
}