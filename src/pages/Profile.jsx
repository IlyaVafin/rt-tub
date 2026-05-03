import { useEffect, useState } from "react"
import { Link, useParams } from "react-router"
import { $fetch } from "../api/api"

const Profile = () => {
	const params = useParams()
	const nickname = params.nickname
	const [profile, setProfile] = useState()
	useEffect(() => {
		async function getProfile() {
			const result = await $fetch("me")
			if (result.success) setProfile(result.data.data)
		}
		getProfile()
	}, [nickname])

	function sortDonations(donations) {
		return [...donations].sort((a, b) => b.sum - a.sum)
	}

	return (
		<div id='my-channel-page' className='page'>
			<div className='container py-4'>
				{profile && (
					<>
						<div className='channel-header'>
							<div className='row align-items-center'>
								<div className='col-md-3 text-center text-md-start'>
									<img
										src='#'
										className='channel-avatar mb-3 mb-md-0'
										alt='Мой аватар'
									/>
								</div>
								<div className='col-md-9'>
									<h2 className='fw-bold mb-2'>{profile.profile.nickname}</h2>
									<p className='text-muted mb-3'>Ваш канал</p>

									<div className='channel-stats'>
										<div className='stat-item'>
											<div className='stat-value'>
												{profile.profile.count_videos}
											</div>
											<div className='stat-label'>Видео</div>
										</div>
										<div className='stat-item'>
											<div className='stat-value'>
												{profile.profile.count_views}
											</div>
											<div className='stat-label'>Просмотров</div>
										</div>
										<div className='stat-item'>
											<div className='stat-value'>
												₽{profile.profile.balance}
											</div>
											<div className='stat-label'>Баланс</div>
										</div>
									</div>

									<div className='mt-3'>
										<Link to='/create_video' className='btn btn-primary me-2'>
											<i className='bi bi-upload me-1'></i> Загрузить видео
										</Link>
									</div>
								</div>
							</div>
						</div>

						<div className='row'>
							<div className='col-lg-8'>
								<h4 className='fw-bold mb-3'>Мои видео</h4>

								<div className='row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4'>
									{profile.videos.map(v => (
										<div key={v.id} className='col'>
											<div className='video-card'>
												<a href='video.html'>
													<img
														src={v.preview}
														className='video-thumbnail'
														alt='Превью видео'
													/>
												</a>
												<div className='video-info'>
													<h6 className='video-title'>{v.name}</h6>
													<div className='video-meta mb-3'>
														<span>
															{v.views} просмотров • {v.updated_at}
														</span>{" "}
														<br />
														<span>
															Статус •{" "}
															{v.status === "approved"
																? "подтверждено"
																: "на модерации"}
														</span>
													</div>
													<div className='d-flex justify-content-between'>
														<a
															href='update_video.html'
															className='btn btn-outline-primary btn-sm'
														>
															<i className='bi bi-pencil'></i>
														</a>
														<button className='btn btn-outline-danger btn-sm'>
															<i className='bi bi-trash'></i>
														</button>
													</div>
												</div>
											</div>
										</div>
									))}
								</div>
							</div>

							<div className='col-lg-4'>
								<h4 className='fw-bold mb-3'>Топ донатеров</h4>
								{profile.donations.length > 0 ? (
									sortDonations(profile.donations).map(v => {
										return (
											<div
												key={v.id}
												className='donator-card d-flex justify-content-between align-items-center'
											>
												<div className='text-muted'>1 место - WebFan88</div>
												<div className='donator-amount'>₽50.00</div>
											</div>
										)
									})
								) : (
									<p>Топ донатеров нет :(</p>
								)}

								<h4 className='fw-bold mb-3'>Все донаты</h4>
								{profile.donations > 0 ? (
									profile.donations.map(d => (
										<div
											key={d.id}
											className='donator-card d-flex justify-content-between align-items-center'
										>
											<div className='text-muted'>WebFan88</div>
											<div className='donator-amount'>₽50.00</div>
										</div>
									))
								) : (
									<p>Донатов нет :(</p>
								)}
							</div>
						</div>
					</>
				)}
			</div>
		</div>
	)
}

export default Profile
