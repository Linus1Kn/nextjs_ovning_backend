import { cookies } from 'next/headers'

const coords = [ 
    { "id": 1, "name": "Skolan", "lat": 59.3, "lng": 18.1 }, 
    { "id": 2, "name": "Biblioteket", "lat": 59.4, "lng": 18.05 } 
]

export async function GET() {
    return Response.json(coords)
}

export async function POST(req: Request) {
    const cookieStore = await cookies()
    const role = cookieStore.get('role')
    if (role == undefined || role.value != "user"){return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 })}

    const body = await req.json();

    const newCoord = {
        id: Math.max(...coords.map(c => c.id), 0) + 1,
        name: body.name || "unknown",
        lat: body.lat || 0,
        lng: body.lng || 0,
    }

    coords.push(newCoord)

    return Response.json(coords)
}

export async function PUT(req: Request) {
    const cookieStore = await cookies()
    const role = cookieStore.get('role')
    if (role == undefined || role.value != "admin"){return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 })}

    const body = await req.json();
    const { id, name, lat, lng } = body;

    const index = coords.findIndex(c => c.id === id);
    if (index === -1) {
        return new Response(JSON.stringify({ error: "Not found" }), { status: 404 });
    }

    coords[index] = {
        ...coords[index],
        ...(name !== undefined && { name }),
        ...(lat !== undefined && { lat }),
        ...(lng !== undefined && { lng })
    };

    return Response.json(coords);
}

export async function DELETE(req: Request) {
    const cookieStore = await cookies()
    const role = cookieStore.get('role')
    if (role == undefined || role.value != "admin"){return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 })}

    const body = await req.json()

    console.log(body.id)

    const index = coords.findIndex(c => c.id === body.id);
    if (index === -1) {
        return new Response(JSON.stringify({ error: "Not found" }), { status: 404 });
    }

    coords.splice(index, 1)

    return Response.json(coords)
}