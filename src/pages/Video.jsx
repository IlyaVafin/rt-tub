const Video = () => {
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
							<a href='login.html' className='btn btn-outline-primary me-2'>
								Войти
							</a>
							<a href='register.html' className='btn btn-primary'>
								Регистрация
							</a>
						</div>

						<div
							className='d-flex align-items-center'
							id='user-menu'
							style='display: none !important;'
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
