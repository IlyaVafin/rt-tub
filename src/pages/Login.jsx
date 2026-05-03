import { useState } from "react"
import { Link, useNavigate } from "react-router"
import { $fetch } from "../api/api"
import Header from "../components/Header"
import { useUserContext } from "../context/UserContextProvider"
import { formatValidationErrors } from "../api/formatValidationErrors"

const Login = () => {
	const [loginData, setLoginData] = useState({ email: "", password: "" })
	const [errors, setErrors] = useState()
	const { toggleUser } = useUserContext()
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
			const userInfo = await $fetch("me")
			toggleUser({ auth: true, user: userInfo.data.data.profile })
			navigate("/")
		} else {
			const err = formatValidationErrors(result.data)
			setErrors(err)
		}
	}
	const hasPasswordError = errors?.password || undefined
	const hasEmailError = errors?.email || undefined
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
								className={`form-control ${hasEmailError ? "is-invalid" : ""}`}
								placeholder='example@mail.com'
							/>
							{hasEmailError && (
								<span className='invalid-feedback'>{errors.email}</span>
							)}
						</div>

						<div className='mb-4'>
							<label className='form-label'>Пароль</label>
							<input
								value={loginData.password}
								onChange={e => handleInput("password", e.target.value)}
								type='password'
								className={`form-control ${hasPasswordError ? "is-invalid" : ""}`}
							/>
							{hasPasswordError && (
								<span className='invalid-feedback'>{errors.password}</span>
							)}
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
