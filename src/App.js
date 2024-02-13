// src/App.js

import React, { useState } from 'react'
import './App.css'
import Login from './components/Login'
import MainFeed from './components/MainFeed'

function App() {
	const [loggedIn, setLoggedIn] = useState(false)

	return <div className='App'>{loggedIn ? <MainFeed /> : <Login setLoggedIn={setLoggedIn} />}</div>
}

export default App
