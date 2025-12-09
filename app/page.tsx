'use client'
import Image from "next/image";
import { useEffect, useState } from "react";

type placeType = {
  id: number,
  name: string,
  lat: number,
  lng: number,
}

export default function Home() {

  const [list, setList] = useState<[placeType?]>([])
  const [error, setError] = useState<string|null>(null)

  async function getData() {
    setError(null)

    try {
      const res = await fetch("/api/map")
      const data = await res.json()
      setList(data)
    } catch (err) {
      setError("Failed to load data")
    }
  }

  useEffect(()=> {
    getData()
  }, [])
  
  return (
    <div className="flex flex-col min-h-screen items-center justify-center gap-5 bg-black">
      <h2 className="font-bold text-4xl">Fun Coordinates Website</h2>

      <div className="bg-gray-800 flex flex-col p-2 rounded-md gap-4">
      
      {error ? (
        <p>{error}</p>
      ) : list.length === 0 ? (
        <p className="bg-red-600 text-white rounded-md p-2">Loading...</p>
      ) : 
      (list.map(place => (

        <div key={place.id}>
          <p className="font-bold">Name: {place.name}</p>
          <p>LAT: {place.lat} LONG: {place.lng}</p>
        </div>
      
      )))}

      </div>
    </div>
  );
}