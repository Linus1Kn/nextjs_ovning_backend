import React, { useState } from 'react'

type locationProps = {
	id: number,
	name: string,
	lat: number,
	lng: number,
	setModal: any,
	setList: any,
}

export default function Location({ id, name, lat, lng, setModal, setList }: locationProps) {

	function showModal(title: string, description: string, onConfirm: any, formInfo?: {}) {
		setModal({
			title: title,
			description: description,
			onConfirm: onConfirm,
			formInfo: formInfo,
		})
	}

	async function putChanges(id:number, name:string, lat:number, lng:number) {
    const body = {
			id: id,
      name: name,
      lat: lat,
      lng: lng,
    }

    try {
      const res = await fetch('/api/map', {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      })
      const data = await res.json()
      setList(data)
      
    } catch (err) {
      console.error("failed to apply changes")
    }

  }

	async function deleteLoc(id:number) {
    const body = {
			id: id,
    }

    try {
      const res = await fetch('/api/map', {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      })
      const data = await res.json()
      setList(data)
      
    } catch (err) {
      console.error("failed to delete")
    }

  }

	function editHandler() {
		showModal(
			"Editing '" + name + "'", 
			"very nice", 
			(name:string, lat:number, lng:number)=>{
				putChanges(id, name, lat, lng)
			}, 
			{name: name, lat: lat, lng: lng}
		)
	}

	function deleteHandler() {
		showModal(
			"Are you sure?", 
			"Deletion is permanent", 
			()=>{
				deleteLoc(id)
			}
		)
	}

	return (
		<div className="bg-gray-700 p-2 rounded-md">
			<p className="font-bold">Name: {name}</p>
			<p>LAT: {lat} LONG: {lng}</p>
			<div className="flex gap-2">
				<button onClick={editHandler} className="p-2 py-0.5 rounded-md font-bold cursor-pointer bg-amber-400 hover:bg-amber-300">Edit</button>
				<button onClick={deleteHandler} className="p-2 py-0.5 rounded-md font-bold cursor-pointer bg-rose-500 hover:bg-rose-400">Delete</button>
			</div>
		</div>
	)
}
