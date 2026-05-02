import Header from "../components/Header"

const Video = () => {
	return (
		<>
			<Header />

			<div id='video-page' className='page'>
				<div className='container py-4'>
					<div className='row'>
						<div className='video-player-container'>
							<video className='video-player' poster='#' controls>
								<source src='#' type='video/mp4' />
							</video>
						</div>

						<div className='mb-4'>
							<h2 className='fw-bold mb-2'>
								Как создать SPA приложение на Vue 3
							</h2>
							<div className='d-flex justify-content-between align-items-center mb-3'>
								<div className='text-muted'>
									<span>15K просмотров • Опубликовано 2 дня назад</span>
								</div>
							</div>
							<p>
								В этом видео мы рассмотрим создание Single Page Application с
								использованием Vue 3, Vue Router и Composition API.
							</p>
						</div>

						<div className='d-flex align-items-center mb-4 pb-3'>
							<div className='flex-grow-1'>
								<h6 className='fw-bold mb-0'>WebMasterPro</h6>
							</div>
							<a href='other_channel.html' className='btn btn-primary'>
								Перейти на канал
							</a>
						</div>
					</div>
				</div>
			</div>
		</>
	)
}

export default Video
