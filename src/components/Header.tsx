import React, { useState } from "react"
import { Link } from "react-router"
import { useUserContext } from "../context/UserContextProvider"

const Header = () => {
	const { user } = useUserContext()
	const [show, setShow] = useState(false)
	return (
		<nav className='navbar navbar-expand-lg fixed-top'>
			<div className='container'>
				<div
					className='align-items-center w-100 d-flex justify-content-between gap-xxl-4'
					id='navbarNav'
				>
					<a href='index.html' className='sidebar-brand'>
						<h2>
							R<span className='brand-accent'>Tub</span>
						</h2>
					</a>

					{!user && (
						<div className='d-flex align-items-center' id='auth-buttons'>
							<Link to='/login' className='btn btn-outline-primary me-2'>
								Войти
							</Link>
							<Link to='/register' className='btn btn-primary'>
								Регистрация
							</Link>
						</div>
					)}

					<div className='d-flex align-items-center' id='user-menu'>
						<div className='dropdown'>
							<button
								onClick={() => setShow(prev => !prev)}
								className='btn btn-outline-primary dropdown-toggle'
								type='button'
								data-bs-toggle='dropdown'
							>
								<i className='bi bi-person-circle me-1'></i> User123
							</button>
							<ul
								style={{ display: show ? "block !important" : "" }}
								className='dropdown-menu'
							>
								<li>
									<a className='dropdown-item' href='my_channel.html'>
										<i className='bi bi-person me-2'></i> Мой канал
									</a>
								</li>
								<li>
									<a className='dropdown-item' href='create_video.html'>
										<i className='bi bi-upload me-2'></i> Загрузить видео
									</a>
								</li>
								<li>
									<hr className='dropdown-divider' />
								</li>
								<li>
									<a className='dropdown-item text-danger' href='#'>
										<i className='bi bi-box-arrow-right me-2'></i> Выйти
									</a>
								</li>
							</ul>
						</div>
					</div>
				</div>
			</div>
		</nav>
	)
}

export default Header
