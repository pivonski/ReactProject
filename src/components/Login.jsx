import React, { useState } from 'react'
import './login.css'

const Login = ({ setLoggedIn }) => {
	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')
	const [error, setError] = useState('')

	const handleUsernameChange = e => {
		setUsername(e.target.value)
	}

	const handlePasswordChange = e => {
		setPassword(e.target.value)
	}

	const handleSubmit = e => {
		e.preventDefault()
		// LOGIKA POPRAWNOŚCI DANYCH
		if (username === 'admin' && password === '1234') {
			setLoggedIn(true) // Ustawienie stanu zalogowania na true
		} else {
			setError('Nieprawidłowa nazwa użytkownika lub hasło')
		}
	}

	return (
		<div className='login-container'>
			{' '}
			{/* Dodanie klasy dla kontenera strony logowania */}
			<h2>Aby uzyskać dostęp do strony wpisz wymagane dane:</h2>
			<form onSubmit={handleSubmit}>
				<label>
					Nazwa
					<input type='text' value={username} onChange={handleUsernameChange} />
				</label>
				<br />
				<label>
					Kod
					<input type='password' value={password} onChange={handlePasswordChange} />
				</label>
				<br />
				<button type='submit'>Zaloguj</button>
				{error && <p className='error-message'>{error}</p>} {/* Dodanie klasy dla komunikatu o błędzie */}
			</form>
		</div>
	)
}

export default Login
