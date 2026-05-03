import { Link, useNavigate } from "react-router"
import { $fetch } from "../api/api"
import { useState } from "react"
import { useUserContext } from "../context/UserContextProvider"
import Header from "../components/Header"
import { formatValidationErrors } from "../api/formatValidationErrors"

const Register = () => {
	const navigate = useNavigate()
	const { toggleUser } = useUserContext()
	const [errors, setErrors] = useState()

	const onSubmit = async e => {
		e.preventDefault()
		const data = new FormData(e.target)

		const result = await $fetch("registration", "POST", data, false)
		console.log(result)

		if (result.success) {
			localStorage.setItem("token", result.data.data.credentials.token)
			toggleUser({
				auth: true,
				user: {
					nickname: result.data.data.user.nickname,
					avatar: result.data.data.user.avatar,
				},
			})
			return navigate("/")
		} else {
			const err = formatValidationErrors(result.data)
			setErrors(err)
		}
	}
	const hasEmailError = errors?.email || undefined
	const hasPasswordError = errors?.password || undefined
	const hasBirthDateError = errors?.birthdate || undefined

	return (
		<>
			<Header />

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
								className={`form-control ${hasEmailError ? "is-invalid" : ""}`}
								placeholder='example@mail.com'
							/>
							{hasEmailError && (
								<span className='invalid-feedback'>{errors.email}</span>
							)}
						</div>

						<div className='mb-3'>
							<label className='form-label'>Пароль</label>
							<input
								name='password'
								type='password'
								className={`form-control ${hasPasswordError ? "is-invalid" : ""}`}
							/>
							{hasPasswordError && (
								<span className='invalid-feedback'>{errors.password}</span>
							)}
						</div>

						<div className='mb-3'>
							<label className='form-label'>Дата рождения</label>
							<input
								name='birthdate'
								type='date'
								className={`form-control ${hasBirthDateError ? "is-invalid" : ""}`}
							/>
							{hasBirthDateError && (
								<span className='invalid-feedback'>{errors.birthdate}</span>
							)}
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
