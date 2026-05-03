import { useNavigate } from "react-router"
import { $fetch } from "../api/api"
import Header from "../components/Header"

const CreateVideo = () => {
	const navigate = useNavigate()

	async function submitVideo(e) {
		e.preventDefault()
		const data = new FormData(e.target)
		const result = await $fetch("videos", "POST", data, false)
		if (result.success) navigate("/")
	}
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
											className='form-control'
											placeholder='Введите название видео'
										/>
									</div>

									<div className='mb-3'>
										<label className='form-label'>Описание</label>
										<textarea
											name='description'
											className='form-control'
											rows='4'
											placeholder='Опишите содержание вашего видео'
											required
										></textarea>
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
												className='form-control'
												accept='video/*'
											/>
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
