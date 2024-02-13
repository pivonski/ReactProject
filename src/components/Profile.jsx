import React from 'react'

const Profile = ({ match, posts }) => {
	// Pobierz nazwę użytkownika z parametru URL
	const { username } = match.params

	// Filtrowanie postów użytkownika
	const userPosts = posts.filter(post => post.user === username)

	return (
		<div>
			<h2>Profil użytkownika: {username}</h2>
			{userPosts.map(post => (
				<div key={post.id} className='post'>
					<div className='post-header'>
						<p>{post.user}</p>
						<p>{post.date}</p>
					</div>
					<img src={post.image} alt={post.content} />
					<p>{post.content}</p>
				</div>
			))}
		</div>
	)
}

export default Profile
