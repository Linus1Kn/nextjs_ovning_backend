const messages:[any?] = [{
    name: "Initial example Name",
    message: "Test Msg2",
}]

export async function GET() {
    return Response.json(messages)
}

export async function POST(what:any) {
    console.log("from client ", what.name)
    messages.push({
        name: "Test Name",
        message: "Test Msg",
    })
    return Response.json(messages)
}