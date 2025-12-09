'use client'
import Image from "next/image";
import { useState } from "react";


export default function Home() {

  const [data, setData] = useState(null)

  async function getData() {
    const res = await fetch("/api/test")
    const data = await res.json()
    console.log(data)
  }
  getData()
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <h1>hi</h1>
    </div>
  );
}
//comment