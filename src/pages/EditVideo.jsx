import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router"
import { $fetch } from "../api/api"

const EditVideo = () => {
	const [video, setVideo] = useState()
	const [loading, setLoading] = useState(true)
	const navigate = useNavigate()
	const params = useParams()
	useEffect(() => {
		async function getVideo() {
			try {
				const result = await $fetch(`videos/${params.videoId}`)
				if (result.success) {
					setVideo(result.data.data.video)
				}
			} finally {
				setLoading(false)
			}
		}
		getVideo()
	}, [params])

	async function updateVideo(e) {
		e.preventDefault()
		const data = new FormData(e.target)
		const result = await $fetch(`videos/${video.id}`, "PATCH", data, false)
		if (result.success) alert("success")
	}
	if (loading) return <p>Loading...</p>

	return (
		<div id='edit-video-page' className='page'>
			<div className='container py-4'>
				{!video && (
					<div>
						<h1>Видео находиться на модерации или не найдено</h1>
						<button onClick={() => navigate(-1)}>Вернуться назад</button>
					</div>
				)}
				{video && (
					<div className='row justify-content-center'>
						<div className='col-lg-8'>
							<div className='auth-form'>
								<h2 className='fw-bold text-center mb-4'>
									Редактировать видео
								</h2>

								<form onSubmit={updateVideo} id='edit-video-form'>
									<div className='mb-3'>
										<label className='form-label'>Название видео</label>
										<input
											name='name'
											type='text'
											className='form-control'
											defaultValue={video.name}
										/>
									</div>

									<div className='mb-3'>
										<label className='form-label'>Описание</label>
										<textarea
											name='description'
											className='form-control'
											rows='4'
											defaultValue={video.description ?? ""}
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
											<i className='bi bi-check-circle me-2'></i> Сохранить
										</button>
									</div>
								</form>
							</div>
						</div>
					</div>
				)}
			</div>
		</div>
	)
}

export default EditVideo
