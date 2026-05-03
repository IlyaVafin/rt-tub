import { useState } from "react"
import { $fetch } from "../api/api"
import { formatValidationErrors } from "../api/formatValidationErrors"
import Header from "../components/Header"

const CreateVideo = () => {
	const [errors, setErorrs] = useState()
	async function submitVideo(e) {
		e.preventDefault()
		const data = new FormData(e.target)
		const result = await $fetch("videos", "POST", data, false)
		if (!result.success) {
			const err = formatValidationErrors(result.data)
			setErorrs(err)
		}
	}

	const hasNameError = errors?.name || undefined
	const hasDescriptionError = errors?.description || undefined
	const hasVideoError = errors?.video || undefined
	return (
		<>
			<Header />
			<div id='upload-page' className='page'>
				<div className='container py-4'>
					<div className='row justify-content-center'>
						<div className='col-lg-8'>
							<div className='auth-form'>
								<h2 className='fw-bold text-center mb-4'>Загрузить видео</h2>

								<form onSubmit={submitVideo} id='upload-form'>
									<div className='mb-3'>
										<label className='form-label'>Название видео</label>
										<input
											name='name'
											type='text'
											className={`form-control ${hasNameError ? "is-invalid" : ""}`}
											placeholder='Введите название видео'
										/>
										{hasNameError && (
											<span className='invalid-feedback'>{hasNameError}</span>
										)}
									</div>

									<div className='mb-3'>
										<label className='form-label'>Описание</label>
										<textarea
											name='description'
											className={`form-control ${hasDescriptionError ? "is-invalid" : ""}`}
											rows='4'
											placeholder='Опишите содержание вашего видео'
											required
										></textarea>
										{hasDescriptionError && (
											<span className='invalid-feedback'>
												{hasDescriptionError}
											</span>
										)}
									</div>

									<div className='row mb-3'>
										<div>
											<label className='form-label'>Превью (изображение)</label>
											<input
												name='preview'
												type='file'
												className='form-control'
												accept='image/*'
											/>
										</div>
										<div>
											<label className='form-label'>Видеофайл</label>
											<input
												name='video'
												type='file'
												className={`form-control ${hasVideoError ? "is-invalid" : ""}`}
												accept='video/*'
											/>
											{hasVideoError && (
												<span className='invalid-feedback'>
													{hasVideoError}
												</span>
											)}
										</div>
									</div>

									<div className='d-grid'>
										<button type='submit' className='btn btn-primary'>
											<i className='bi bi-upload me-2'></i> Загрузить видео
										</button>
									</div>
								</form>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	)
}

export default CreateVideo
