'use client'
import Image from "next/image";
import { useEffect, useState } from "react";
import Location from "./components/Location";
import Modal from "./components/Modal";
import Login from "./components/Login";
import Logout from "./components/Logout";

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

  const [role, setRole] = useState<string|null>()
  const [list, setList] = useState<[placeType?]>([])
  const [modal, setModal] = useState<any>(null)
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

  async function submitHandler(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    
    setFormMsg(null)

    const form = e.currentTarget
    const formData = new FormData(form)
    const body = {
      name: formData.get("name") as string,
      lat: Number(formData.get("lat")),
      lng: Number(formData.get("lng")),
    }

    try {
      const res = await fetch('/api/map', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      })
      const data = await res.json()
      if (data && data.error == undefined){
        setList(data)
        setFormMsg({
          message: "Submitted successfully",
          type: "success",
        })
      }else{
        setFormMsg({
          message: "Failed to submit",
          type: "error",
        })
      }
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
      
      {modal && (
        <Modal 
          title={modal.title} 
          description={modal.description} 
          id={modal.id}
          setModal={setModal} 
          onConfirm={modal.onConfirm}
          formInfo={modal.formInfo}
        />
      )}
      

      <h2 className="font-bold text-4xl">Fun Coordinates Website</h2>
      <p>test accounts: <span className="text-neutral-400">user - user123, admin - admin123</span></p>

      {role ? 
      (
        <>
          <p>Logged in as: <span className="font-black text-green-500">{role}</span> <Logout setRole={setRole}/></p>
          
        </>
      ) : 
      (
        <Login setRole={setRole}/>
      )}

      {role==="user" ? (
				<form onSubmit={submitHandler} className="bg-gray-800 flex flex-col p-2 rounded-md gap-1">
          <label htmlFor="name">Name</label>
          <input required type="text" id="name" name="name" className="bg-gray-700 p-2 rounded-md" />
          <label htmlFor="lat">Latitude</label>
          <input required type="number" id="lat" name="lat" className="bg-gray-700 p-2 rounded-md" />
          <label htmlFor="lng">Longitude</label>
          <input required type="number" id="lng" name="lng" className="bg-gray-700 p-2 rounded-md" />
          <button className="cursor-pointer p-4 py-2 font-bold text-white bg-blue-500 hover:bg-blue-400 rounded-md">Submit</button>
          {formMsg && (<p className={"text-white rounded-md p-2 " + formMsgColors[formMsg.type]}>{formMsg.message}</p>)}
        </form>
			) : (
				<></>
			)}

      <div className="bg-gray-800 flex flex-col p-2 rounded-md gap-4">
      
      {error ? (
        <p className="bg-red-600 text-white rounded-md p-2">{error}</p>
      ) : list.length === 0 ? (
        <p>Loading...</p>
      ) : 
      (list.map(place => (

        <Location role={role} key={place.id} id={place.id} name={place.name} lat={place.lat} lng={place.lng} setModal={setModal} setList={setList}/>
      
      )))}

      </div>
    </div>
  );
}