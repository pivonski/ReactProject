import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import Profile from './Profile'

const MainFeed = () => {
	const [posts, setPosts] = useState([])
	const [newPhoto, setNewPhoto] = useState('')
	const [photoTitle, setPhotoTitle] = useState('')
	const [newComment, setNewComment] = useState('')
	const [comments, setComments] = useState({})
	const [loggedInUser, setLoggedInUser] = useState(null)
	const [users, setUsers] = useState([
		{ username: 'Michal', password: 'password1', posts: [] },
		{ username: 'Pawel', password: 'password2', posts: [] },
		{ username: 'Kamil', password: 'password3', posts: [] },
		{ username: 'pivonski', password: 'password4', posts: [] },
	])
	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')

	useEffect(() => {
		const fetchData = async () => {
			// Pobierz dane
			const sampleData = [
				{ id: 1, user: 'Michał', content: 'Old Lambo', image: '/assets/car1.jpg', date: '2024-02-11' },
				{ id: 2, user: 'Paweł', content: 'Old Porsche', image: '/assets/car2.jpg', date: '2024-02-10' },
				{ id: 3, user: 'Kamil', content: 'Clasic Porsches', image: '/assets/car3.jpg', date: '2024-02-09' },
			]

			// Przypisz posty do odpowiednich użytkowników
			const updatedUsers = users.map(user => ({
				...user,
				posts: sampleData.filter(post => post.user === user.username),
			}))

			// Ustaw posty i użytkowników w stanie
			setPosts(sampleData)
			setUsers(updatedUsers)

			// Zainicjuj puste komentarze dla każdego postu
			const initialComments = {}
			sampleData.forEach(post => {
				initialComments[post.id] = []
			})
			setComments(initialComments)
		}

		fetchData()
	}, [])

	const handleNewPhotoChange = e => {
		setNewPhoto(e.target.value)
	}

	const handleTitleChange = e => {
		setPhotoTitle(e.target.value)
	}

	const handleCommentChange = e => {
		setNewComment(e.target.value)
	}

	const handleLogin = () => {
		const user = users.find(user => user.username === username && user.password === password)
		if (user) {
			setLoggedInUser(user)
		} else {
			alert('Nieprawidłowe dane logowania')
		}
	}

	const handleLogout = () => {
		setLoggedInUser(null)
	}

	const handleSubmit = e => {
		e.preventDefault()
		if (!loggedInUser) {
			alert('Zaloguj się, aby dodać post')
			return
		}
		const currentDate = new Date().toISOString().slice(0, 10)
		const newPost = {
			id: posts.length + 1,
			user: loggedInUser.username,
			content: photoTitle,
			image: newPhoto,
			date: currentDate,
		}
		setPosts([newPost, ...posts])
		setNewPhoto('')
		setPhotoTitle('')
		// Dodajemy post do listy postów użytkownika
		const updatedUsers = [...users]
		const userIndex = updatedUsers.findIndex(user => user.username === loggedInUser.username)
		updatedUsers[userIndex].posts.unshift(newPost)
		setUsers(updatedUsers)
	}

	const handleDelete = (postId, postUser) => {
		if (!loggedInUser) {
			alert('Zaloguj się, aby usunąć post')
			return
		}
		if (loggedInUser.username === postUser) {
			const updatedPosts = posts.filter(post => post.id !== postId)
			setPosts(updatedPosts)
			// Usuwamy post z listy postów użytkownika
			const updatedUsers = [...users]
			const userIndex = updatedUsers.findIndex(user => user.username === loggedInUser.username)
			updatedUsers[userIndex].posts = updatedUsers[userIndex].posts.filter(post => post.id !== postId)
			setUsers(updatedUsers)
			alert('Zdjęcie usunięte')
		} else {
			alert('Nie masz uprawnień do usunięcia tego zdjęcia')
		}
	}

	const handleCommentSubmit = (e, postId) => {
		e.preventDefault()
		if (!loggedInUser) {
			alert('Zaloguj się, aby dodać komentarz')
			return
		}
		if (!newComment.trim()) {
			alert('Komentarz nie może być pusty')
			return
		}
		const currentDate = new Date().toISOString().slice(0, 10)
		const newCommentData = { user: loggedInUser.username, content: newComment, date: currentDate }
		const updatedComments = { ...comments }
		if (updatedComments.hasOwnProperty(postId)) {
			updatedComments[postId] = [...updatedComments[postId], newCommentData]
		} else {
			updatedComments[postId] = [newCommentData]
		}
		setComments(updatedComments)
		setNewComment('')
	}

	const handleCommentDelete = (postId, commentId) => {
		if (!loggedInUser) {
			alert('Zaloguj się, aby usunąć komentarz')
			return
		}

		const updatedComments = { ...comments }
		if (updatedComments.hasOwnProperty(postId)) {
			updatedComments[postId] = updatedComments[postId].filter(comment => commentId !== comment.date)
			setComments(updatedComments)
			alert('Komentarz usunięty')
		}
		// Możesz dodać tutaj dalszą logikę, jeśli chcesz obsługiwać przypadki, gdy komentarz nie istnieje.
	}

	return (
		<Router>
			<div className='main-feed-container'>
				{loggedInUser ? (
					<div className='post-form'>
						<form onSubmit={handleSubmit}>
							<input type='text' placeholder='URL zdjęcia' value={newPhoto} onChange={handleNewPhotoChange} />
							<input type='text' placeholder='Tytuł posta' value={photoTitle} onChange={handleTitleChange} />
							<button type='submit'>Dodaj post</button>
						</form>
						<button onClick={handleLogout}>Wyloguj</button>
					</div>
				) : (
					<div className='login-form'>
						<input
							type='text'
							placeholder='Nazwa użytkownika'
							value={username}
							onChange={e => setUsername(e.target.value)}
						/>
						<input type='password' placeholder='Hasło' value={password} onChange={e => setPassword(e.target.value)} />
						<button onClick={handleLogin}>Zaloguj</button>
					</div>
				)}
				<h2>Główny feed</h2>
				{posts.map(post => (
					<div key={post.id} className='post'>
						<img src={post.image} alt={post.content} />
						<p>{post.content}</p>
						<p>Autor: {post.user}</p>
						{loggedInUser && loggedInUser.username === post.user && (
							<button onClick={() => handleDelete(post.id, post.user)}>Usuń post</button>
						)}
						<form onSubmit={e => handleCommentSubmit(e, post.id)}>
							<input type='text' placeholder='Dodaj komentarz' value={newComment} onChange={handleCommentChange} />
							<button type='submit'>Dodaj komentarz</button>
						</form>
						{comments[post.id] &&
							comments[post.id].map((comment, index) => (
								<div key={index} className='comment'>
									<p>
										<strong>{comment.user}</strong>: {comment.content}
									</p>
									<p>{comment.date}</p>
									{loggedInUser && loggedInUser.username === comment.user && (
										<button onClick={() => handleCommentDelete(post.id, comment.date)}>Usuń komentarz</button>
									)}
								</div>
							))}
					</div>
				))}
				<Routes>
					{users.map(user => (
						<Route key={user.username} path={`/profile/${user.username}`} element={<Profile posts={user.posts} />} />
					))}
				</Routes>
			</div>
		</Router>
	)
}

export default MainFeed
