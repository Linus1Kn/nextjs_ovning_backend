import React, { use, useState } from 'react'

type modalProps = {
	title: string,
	description: string,
	setModal: any,
	onConfirm: any,
	id: number,
	formInfo?: {
		name: string,
		lat: number,
		lng: number,
	}
}

export default function Modal({ title, description, formInfo, setModal, onConfirm, id }: modalProps) {

	const [name, setName] = useState<string>("")
	const [lat, setLat] = useState<string>("")
	const [lng, setLng] = useState<string>("")

	function confirmHandler(){
		onConfirm(
			name === "" ? undefined : name, 
			lat === "" ? undefined : Number(lat), 
			lng === "" ? undefined : Number(lng), 
		)
		setModal(null)
	}

	return (
		<div className="fixed inset-0 bg-black/60 z-50 flex justify-center items-center">
			<div className="bg-gray-800 min-w-60 rounded-md p-4 gap-1 flex flex-col justify-center items-center">
				<p className="text-white font-semibold text-2xl">{title}</p>
				<p className="text-gray-400">{description}</p>

				{formInfo && (
					<div className='flex flex-col gap-2'>
						<label htmlFor="name">Name</label>
						<input onChange={(e)=>{setName(e.target.value)}} required type="text" id="name" name="name" placeholder={formInfo.name} className="bg-gray-700 p-2 rounded-md" />
						<label htmlFor="lat">Latitude</label>
						<input onChange={(e)=>{setLat(e.target.value)}} required type="number" id="lat" name="lat" placeholder={formInfo.lat.toString()} className="bg-gray-700 p-2 rounded-md" />
						<label htmlFor="lng">Longitude</label>
						<input onChange={(e)=>{setLng(e.target.value)}} required type="number" id="lng" name="lng" placeholder={formInfo.lng.toString()} className="bg-gray-700 p-2 rounded-md" />
					</div>
				)}

				<div className='flex gap-2'>
					<button
						onClick={confirmHandler}
						className="font-bold p-1 px-5 mt-2 w-full rounded-md bg-green-500 text-white hover:bg-green-400"
					>
						Confirm
					</button>

					<button
						onClick={() => { setModal(null) }}
						className="font-bold p-1 px-5 mt-2 w-full rounded-md bg-rose-500 text-white hover:bg-rose-400"
					>
						Cancel
					</button>
				</div>

			</div>
		</div>
	)
}
