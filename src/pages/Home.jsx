import { useEffect, useState } from "react"
import { $fetch } from "../api/api"

const Home = () => {
	const [videos, setVideos] = useState()
	const [currentPage, setCurrentPage] = useState(1)
	const [query, setQuery] = useState("")
	const [views, setViews] = useState({ min: "", max: "" })
	const [debouncedQuery, setDebouncedQuery] = useState("")
	const [sort, setSort] = useState("")
	useEffect(() => {
		async function getVideos() {
			const result = await $fetch(
				`videos?page=${currentPage}&query=${debouncedQuery}&min_views=${views.min}&max_views=${views.max}&sort=${sort}`,
			)

			if (result.success) setVideos(result.data.data)
		}
		getVideos()
	}, [currentPage, debouncedQuery, views, sort])

	useEffect(() => {
		const timeout = setTimeout(() => setDebouncedQuery(query), 500)
		return () => clearTimeout(timeout)
	}, [query])

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

			<div id='explore-page' className='page'>
				<div className='container py-4'>
					<div className='card border-0 shadow-sm mb-4'>
						<div className='card-body p-4 d-flex flex-column gap-4'>
							<div className='d-flex flex-column gap-2'>
								<label className='form-label fw-medium'>Поиск</label>
								<input
									value={query}
									onChange={e => setQuery(e.target.value)}
									type='text'
									className='form-control search-input mw-40'
									placeholder='Minecraft гайд'
								/>
							</div>

							<div className='d-flex flex-column gap-2'>
								<label className='form-label fw-medium'>
									Фильтр по просмотрам
								</label>
								<div className='d-flex gap-3'>
									<div className='flex-grow-1'>
										<input
											type='number'
											className='form-control'
											placeholder='От'
											min='0'
											id='min-views'
											value={views.min}
											onChange={e =>
												setViews(prev => ({ ...prev, min: e.target.value }))
											}
										/>
									</div>
									<div className='flex-grow-1'>
										<input
											type='number'
											className='form-control'
											placeholder='До'
											min='0'
											value={views.max}
											onChange={e =>
												setViews(prev => ({ ...prev, max: e.target.value }))
											}
											id='max-views'
										/>
									</div>
								</div>
							</div>

							<div className='d-flex flex-column gap-2'>
								<span className='fw-medium'>Сортировка:</span>
								<select
									value={sort}
									onChange={e => setSort(e.target.value)}
									className='form-select'
								>
									<option>По умолчанию (новые сначала)</option>
									<option value='views_asc'>
										По кол-ву просмотров (по возрастанию)
									</option>
									<option value='views_desc'>
										По кол-ву просмотров (по убыванию)
									</option>
									<option value='date_asc'>По дате (старые сначала)</option>
									<option value='date_desc'>По дате (новые сначала)</option>
								</select>
							</div>

							<button className='mx-auto btn btn-primary' type='button'>
								<i className='bi bi-funnel me-2'></i>Применить
							</button>
						</div>
					</div>

					<div className='row row-cols-1 row-cols-md-2 row-cols-lg-3 row-cols-xl-4 g-4 mb-5'>
						{videos &&
							videos.videos.map(v => (
								<div key={v.id} className='col'>
									<div className='video-card h-100'>
										<div className='position-relative'>
											<a href='video.html'>
												<img
													src={v.preview}
													className='video-thumbnail'
													alt='Превью видео'
												/>
											</a>
										</div>
										<div className='video-info'>
											<div className='d-flex'>
												<div className='flex-grow-1'>
													<h6 className='video-title mb-1'>{v.name}</h6>
													<a href='other_channel.html' className='video-author'>
														{v.author}
													</a>
													<div className='video-meta'>
														<span>
															{v.views} Просмотров • {v.updated_at}
														</span>
													</div>
												</div>
											</div>
										</div>
									</div>
								</div>
							))}
					</div>
					<nav
						aria-label='Навигация по страницам'
						className='d-flex justify-content-center'
					>
						<ul className='pagination'>
							{Array.from({ length: videos?.last_page }).map((_, i) => (
								<li
									key={i}
									onClick={() => setCurrentPage(i + 1)}
									className={`page-item ${i + 1 === currentPage ? "active" : ""}`}
								>
									<button className='page-link'>{i + 1}</button>
								</li>
							))}
						</ul>
					</nav>
				</div>
			</div>
		</>
	)
}

export default Home
