import React, { useState } from 'react'

type formMsgType = {
  message: string,
  type: "error"|"success"
}

type loginType = {
	setRole: any,
}

export default function Login({setRole}: loginType) {

	const [formMsg, setFormMsg] = useState<formMsgType|null>(null)
  const formMsgColors = {
    error: "bg-red-600",
    success: "bg-green-500",
  }

	async function submitHandler(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();
		setFormMsg(null);

		const form = e.currentTarget
    const formData = new FormData(form)
    const body = {
      username: formData.get("name") as string,
      password: formData.get("password") as string,
    }

		try {
      const res = await fetch('/api/auth', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(body),
			});
			const data = await res.json()

			if (data && data.success){
				setRole(data.role)
				setFormMsg({
					message: "Success",
					type: "success",
				})
			}else{
				setFormMsg({
					message: "Incorrect username or password",
					type: "error",
				})
			}

    } catch (err) {
			console.log("uh oh!")
		}
	}

  return (
    <form onSubmit={submitHandler} className="bg-gray-800 flex flex-col p-2 rounded-md gap-1">
			<label htmlFor="name">Name</label>
			<input required type="text" id="name" name="name" className="bg-gray-700 p-2 rounded-md" />
			<label htmlFor="password">Password</label>
			<input required type="password" id="password" name="password" className="bg-gray-700 p-2 rounded-md" />
			<button className="cursor-pointer p-4 py-2 font-bold text-white bg-blue-500 hover:bg-blue-400 rounded-md">Log in</button>
			{formMsg && (<p className={"text-white rounded-md p-2 " + formMsgColors[formMsg.type]}>{formMsg.message}</p>)}
		</form>
  )
}
