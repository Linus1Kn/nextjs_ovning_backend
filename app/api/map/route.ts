const coords = [ 
    { "id": 1, "name": "Skolan", "lat": 59.3, "lng": 18.1 }, 
    { "id": 2, "name": "Biblioteket", "lat": 59.4, "lng": 18.05 } 
]

export async function GET() {
    return Response.json(coords)
}

export async function POST(req: Request) {
    const body = await req.json();

    const newCoord = {
        id: coords.length + 1,
        name: body.name || "unknown",
        lat: body.lat || 0,
        lng: body.lng || 0,
    }

    coords.push(newCoord)

    return Response.json(coords)
}