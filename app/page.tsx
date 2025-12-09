'use client'
import Image from "next/image";
import { useEffect, useState } from "react";


export default function Home() {

  const [result, setResult] = useState(null)

  async function getData() {
    const res = await fetch("/api/test")
    const data = await res.json()
    console.log(data)
    setResult(data)
  }

  async function postData(e: React.FormEvent) {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());
    console.log("sent", data)
    const res = await fetch('/api/test', { method: 'POST', body: JSON.stringify(data) })
    const resdata = await res.json()
    console.log("res", resdata)
  }

  useEffect(() => {

    getData()
    
  }, [])
  
  return (
    <div className="flex flex-col min-h-screen items-center justify-center gap-2 bg-zinc-50 font-sans dark:bg-black">
      <form onSubmit={postData} className="flex flex-col">
        <label htmlFor="name">Name</label>
        <input required type="text" name="name" id="name" placeholder="Name here" />

        <label htmlFor="message">Message</label>
        <textarea required name="message" id="message" placeholder="Message here"></textarea>

        <button type="submit" className="p-2 bg-green-500 hover:bg-green-400 rounded-md">Publish</button>
      </form>

      <div className="w-full h-0.5 bg-gray-500 max-w-1/2"></div>

      <div>

        {result === null && <p>Loading...</p>}
        {Array.isArray(result) &&
          result.map((item, idx) => (
            <p key={idx}>
              <strong>{item.name}:</strong> {item.message}
            </p>
        ))}

      </div>
    </div>
  );
}
