import { useEffect, useState } from "react"
import { useParams } from "react-router"
import { $fetch } from "../api/api"
import Header from "../components/Header"

const Channel = () => {
	const params = useParams()
	const nickname = params.nickname
	const [profile, setProfile] = useState()
	const [currentPage, setCurrentPage] = useState(1)
	useEffect(() => {
		async function getProfile() {
			const result = await $fetch(`channels/${nickname}?page=${currentPage}`)
			if (result.success) setProfile(result.data)
		}
		getProfile()
	}, [nickname, currentPage])
	return (
		<>
			<Header />
			<div id='channel-page' className='page'>
				<div className='container py-4'>
					{profile && (
						<div className='channel-header'>
							<div className='row align-items-center'>
								<div className='col-md-3 text-center text-md-start'>
									<img
										src={profile.data.profile.avatar ?? ""}
										className='channel-avatar mb-3 mb-md-0'
										alt='Аватар канала'
									/>
								</div>
								<div className='col-md-9'>
									<h2 className='fw-bold mb-2'>
										{profile.data.profile.nickname}
									</h2>
									<p className='text-muted mb-3'>
										Канал о веб-разработке, фронтенд технологиях и создании
										современных приложений.
									</p>

									<div className='channel-stats'>
										<div className='stat-item'>
											<div className='stat-value'>
												{profile.data.profile.count_videos}
											</div>
											<div className='stat-label'>Видео</div>
										</div>
										<div className='stat-item'>
											<div className='stat-value'>
												{profile.data.profile.count_views}
											</div>
											<div className='stat-label'>Просмотров</div>
										</div>
									</div>

									<button
										className='btn btn-primary mt-3'
										data-bs-toggle='modal'
										data-bs-target='#donateModal'
									>
										<i className='bi bi-heart me-1'></i> Задонатить
									</button>
								</div>
							</div>
						</div>
					)}

					<h4 className='fw-bold mb-3'>Видео канала</h4>

					<div className='row row-cols-1 row-cols-md-2 row-cols-lg-3 row-cols-xl-4 g-4'>
						{profile &&
							profile.data.videos.map(v => (
								<div key={v.id} className='col'>
									<div className='video-card'>
										<a href={`/video/${v.id}`}>
											<img
												src={v.preview}
												className='video-thumbnail'
												alt='Превью видео'
											/>
										</a>
										<div className='video-info'>
											<h6 className='video-title'>{v.name}</h6>
											<div className='video-meta'>
												<span>
													{v.views} • {v.updated_at}
												</span>
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
							{profile &&
								Array.from({ length: profile.data.last_page }).map((_, i) => (
									<li
										key={i}
										className={`page-item ${currentPage === i + 1 ? "active" : ""} `}
									>
										<button
											onClick={() => setCurrentPage(i + 1)}
											className='page-link'
										>
											{i + 1}
										</button>
									</li>
								))}
						</ul>
					</nav>
				</div>
			</div>
		</>
	)
}

export default Channel
