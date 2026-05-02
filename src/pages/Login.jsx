import { useState } from "react"
import { Link, useNavigate } from "react-router"
import { $fetch } from "../api/api"
import Header from "../components/Header"

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
			<Header />

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
