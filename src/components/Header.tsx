import { useState } from "react"
import { Link, useNavigate } from "react-router"
import { useUserContext } from "../context/UserContextProvider"
import { $fetch } from "../api/api"

const Header = () => {
	const { user, toggleUser } = useUserContext()
	const [show, setShow] = useState(false)

	const navigate = useNavigate()

	const logout = async () => {
		const result = await $fetch("logout", "GET", undefined, false, false)

		if (result.success) {
			toggleUser({ auth: false, user: null })
			localStorage.removeItem("token")
			navigate("/login")
		}
	}

	return (
		<nav className='navbar navbar-expand-lg fixed-top'>
			<div className='container'>
				<div
					className='align-items-center w-100 d-flex justify-content-between gap-xxl-4'
					id='navbarNav'
				>
					<Link to='/' className='sidebar-brand'>
						<h2>
							R<span className='brand-accent'>Tub</span>
						</h2>
					</Link>

					{!user.auth && (
						<div className='d-flex align-items-center' id='auth-buttons'>
							<Link to='/login' className='btn btn-outline-primary me-2'>
								Войти
							</Link>
							<Link to='/register' className='btn btn-primary'>
								Регистрация
							</Link>
						</div>
					)}

					{user.auth && (
						<div className='d-flex align-items-center' id='user-menu'>
							<div className='dropdown'>
								<button
									onClick={() => setShow(prev => !prev)}
									className='btn btn-outline-primary dropdown-toggle'
									type='button'
								>
									<i className='bi bi-person-circle me-1'></i>{" "}
									{user.user.nickname}
								</button>
								<ul
									style={{ display: show ? "block" : "" }}
									className='dropdown-menu'
								>
									<li>
										<Link
											className='dropdown-item'
											to={`/profile/${user.user.nickname}`}
										>
											<i className='bi bi-person me-2'></i> Мой канал
										</Link>
									</li>
									<li>
										<Link className='dropdown-item' to='/create-video'>
											<i className='bi bi-upload me-2'></i> Загрузить видео
										</Link>
									</li>
									<li>
										<hr className='dropdown-divider' />
									</li>
									<li>
										<button
											className='dropdown-item text-danger'
											onClick={logout}
										>
											<i className='bi bi-box-arrow-right me-2'></i> Выйти
										</button>
									</li>
								</ul>
							</div>
						</div>
					)}
				</div>
			</div>
		</nav>
	)
}

export default Header
