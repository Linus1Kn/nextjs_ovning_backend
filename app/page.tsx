'use client'
import Image from "next/image";
import { useEffect, useState } from "react";

type placeType = {
  id: number,
  name: string,
  lat: number,
  lng: number,
}
type formMsgType = {
  message: string,
  type: "error"|"success"
}

export default function Home() {

  const [list, setList] = useState<[placeType?]>([])
  const [error, setError] = useState<string|null>(null)
  const [formMsg, setFormMsg] = useState<formMsgType|null>(null)
  const formMsgColors = {
    error: "bg-red-600",
    success: "bg-green-500",
  }

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

  async function submitHandler(e) {
    e.preventDefault()
    
    setFormMsg(null)

    try {
      const res = await fetch('/api/map', { method: 'POST', body: JSON.stringify({name:"hello",lat:1,lng:1}) })
      const data = await res.json()
      setList(data)
      setFormMsg({
        message: "Submitted successfully",
        type: "success",
      })
    } catch (err) {
      setFormMsg({
        message: "Failed to submit",
        type: "error",
      })
    }

  }

  useEffect(()=> {
    getData()
  }, [])
  
  return (
    <div className="flex flex-col min-h-screen items-center justify-center gap-5 bg-black">
      <h2 className="font-bold text-4xl">Fun Coordinates Website</h2>

      <form onSubmit={submitHandler} className="bg-gray-800 flex flex-col p-2 rounded-md gap-1">
        <label htmlFor="name">Name</label>
        <input required type="text" id="name" className="bg-gray-700 p-2 rounded-md" />
        <label htmlFor="lat">Latitude</label>
        <input required type="number" id="lat" className="bg-gray-700 p-2 rounded-md" />
        <label htmlFor="lng">Longitude</label>
        <input required type="number" id="lng" className="bg-gray-700 p-2 rounded-md" />
        <button className="cursor-pointer p-4 py-2 font-bold text-white bg-blue-500 hover:bg-blue-400 rounded-md">Submit</button>
        {formMsg && (<p className={"text-white rounded-md p-2 " + formMsgColors[formMsg.type]}>{formMsg.message}</p>)}
      </form>

      <div className="bg-gray-800 flex flex-col p-2 rounded-md gap-4">
      
      {error ? (
        <p className="bg-red-600 text-white rounded-md p-2">{error}</p>
      ) : list.length === 0 ? (
        <p>Loading...</p>
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