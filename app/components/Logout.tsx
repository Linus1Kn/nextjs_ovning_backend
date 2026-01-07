import React from 'react'

type logoutType = {
	setRole: any,
}

export default function Logout({setRole}:logoutType) {
  async function logout() {
		await fetch('/api/auth', { method: 'DELETE' });
		setRole(null)
	}

  return (
    <button onClick={logout} className="p-2 py-0.5 rounded-md font-bold cursor-pointer bg-rose-500 hover:bg-rose-400">Log out</button>
  )
}
