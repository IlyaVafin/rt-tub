import { useState } from "react"
import { Link, useNavigate } from "react-router"
import { $fetch } from "../api/api"

const Login = () => {
	const [loginData, setLoginData] = useState({ email: "", password: "" })
	const navigate = useNavigate()
	const handleInput = (key, value) => {
		setLoginData(prev => ({ ...prev, [key]: value }))
	}
	const onSubmit = async e => {
		e.preventDefault()
		const result = await $fetch(
			"authorization",
			"POST",
			JSON.stringify({
				email: loginData.email,
				password: loginData.password,
			}),
		)
		if (result.success) {
			localStorage.setItem("token", result.data.credentials.token)
			navigate("/")
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
						<Link to='/' className='sidebar-brand'>
							<h2>
								R<span className='brand-accent'>Tub</span>
							</h2>
						</Link>

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
										<Link className='dropdown-item' to='/profile'>
											<i className='bi bi-person me-2'></i> Мой канал
										</Link>
									</li>
									<li>
										<Link className='dropdown-item' href='/create-video'>
											<i className='bi bi-upload me-2'></i> Загрузить видео
										</Link>
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

			<div id='login-page' className='page'>
				<div className='auth-form'>
					<h2 className='fw-bold text-center mb-4'>Вход в аккаунт</h2>

					<form onSubmit={onSubmit} id='login-form'>
						<div className='mb-3'>
							<label className='form-label'>Электронная почта</label>
							<input
								value={loginData.email}
								onChange={e => handleInput("email", e.target.value)}
								type='email'
								className='form-control'
								placeholder='example@mail.com'
							/>
						</div>

						<div className='mb-4'>
							<label className='form-label'>Пароль</label>
							<input
								value={loginData.password}
								onChange={e => handleInput("password", e.target.value)}
								type='password'
								className='form-control'
							/>
						</div>

						<div className='d-grid mb-3'>
							<button type='submit' className='btn btn-primary'>
								Войти
							</button>
						</div>

						<div className='text-center'>
							<p className='mb-0'>
								Еще нет аккаунта?{" "}
								<Link to='/register' className='text-primary'>
									Зарегистрироваться
								</Link>
							</p>
						</div>
					</form>
				</div>
			</div>
		</>
	)
}

export default Login
