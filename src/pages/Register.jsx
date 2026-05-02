import { Link, useNavigate } from "react-router"
import { $fetch } from "../api/api"
import { useState } from "react"
import { useUserContext } from "../context/UserContextProvider"

const Register = () => {
	const navigate = useNavigate()
	const { toggleUser } = useUserContext()
	const [errors, setErrors] = useState()

	const onSubmit = async e => {
		e.preventDefault()
		const data = new FormData(e.target)

		const result = await $fetch("registration", "POST", data, false)
		if (result.success) {
			localStorage.setItem("token", result.data.data.credentials.token)
			toggleUser(true)
			return navigate("/")
		} else {
			setErrors(result.data)
		}
	}
	return (
		<>
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

						<div className='d-flex align-items-center' id='auth-buttons'>
							<Link to='/login' className='btn btn-outline-primary me-2'>
								Войти
							</Link>
							<Link to='/register' className='btn btn-primary'>
								Регистрация
							</Link>
						</div>

						<div
							className='d-flex align-items-center'
							id='user-menu'
							style={{ display: "none !important" }}
						>
							<div className='dropdown'>
								<button
									className='btn btn-outline-primary dropdown-toggle'
									type='button'
									data-bs-toggle='dropdown'
								>
									<i className='bi bi-person-circle me-1'></i> User123
								</button>
								<ul className='dropdown-menu'>
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

			<div id='register-page' className='page'>
				<div className='auth-form'>
					<h2 className='fw-bold text-center mb-4'>Регистрация</h2>

					<form onSubmit={onSubmit} id='register-form'>
						<div className='mb-3'>
							<label className='form-label'>Никнейм</label>
							<input
								name='nickname'
								type='text'
								className='form-control'
								placeholder='Ваш уникальный никнейм'
							/>
						</div>

						<div className='mb-3'>
							<label className='form-label'>Электронная почта</label>
							<input
								name='email'
								type='email'
								className='form-control'
								placeholder='example@mail.com'
							/>
						</div>

						<div className='mb-3'>
							<label className='form-label'>Пароль</label>
							<input name='password' type='password' className='form-control' />
						</div>

						<div className='mb-3'>
							<label className='form-label'>Дата рождения</label>
							<input name='birthdate' type='date' className='form-control' />
						</div>

						<div className='mb-4'>
							<label className='form-label'>Аватарка (опционально)</label>
							<input
								name='file'
								type='file'
								className='form-control'
								accept='image/*'
							/>
						</div>

						<div className='d-grid mb-3'>
							<button type='submit' className='btn btn-primary'>
								Зарегистрироваться
							</button>
						</div>

						<div className='text-center'>
							<p className='mb-0'>
								Уже есть аккаунт?{" "}
								<Link to='/login' className='text-primary'>
									Войти
								</Link>
							</p>
						</div>
					</form>
				</div>
			</div>
		</>
	)
}

export default Register
