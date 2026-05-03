import { useEffect, useState } from "react"
import { useParams } from "react-router"
import { $fetch } from "../api/api"
import Header from "../components/Header"
import { createPortal } from "react-dom"

const Channel = () => {
	const params = useParams()
	const nickname = params.nickname
	const [profile, setProfile] = useState()
	const [currentPage, setCurrentPage] = useState(1)
	const [showModal, setShowModal] = useState(false)

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
										onClick={() => setShowModal(true)}
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
			{showModal &&
				createPortal(
					<Modal
						profile={profile.data}
						showModal={showModal}
						closeModal={() => setShowModal(false)}
					/>,
					document.body,
				)}
		</>
	)
}

function Modal({ showModal, closeModal, profile }) {
	const [sum, setSum] = useState("")

	async function submitDonate(e) {
		e.preventDefault()
		const result = await $fetch(
			`channels/${profile.profile.nickname}`,
			"POST",
			JSON.stringify({ sum: Number(sum) }),
		)
	}
	return (
		<div
			style={{
				display: showModal ? "block" : "",
				opacity: showModal ? "1" : "0",
				background: "rgba(0,0,0, 0.5)",
			}}
			className='modal fade'
			id='donateModal'
			tabIndex='-1'
		>
			<div
				style={{
					height: "100%",
					display: "flex",
					justifyContent: "center",
					alignItems: "center",
				}}
				className='modal-dialog'
			>
				<div className='modal-content'>
					<div className='modal-header'>
						<h5 className='modal-title fw-bold'>Поддержать канал</h5>
						<button
							onClick={closeModal}
							type='button'
							className='btn-close'
							data-bs-dismiss='modal'
						></button>
					</div>
					<div className='modal-body'>
						<p className='mb-3'>
							Введите сумму для канала{" "}
							<strong>{profile.profile.nickname}</strong>
						</p>

						<form onSubmit={submitDonate} id='donate-form'>
							<div className='mb-3'>
								<label className='form-label'>Сумма (RUB)</label>
								<input
									value={sum}
									onChange={e => setSum(e.target.value)}
									type='number'
									className='form-control'
									min='1'
									max='1000'
									step='0.01'
									placeholder='10.00'
									required
								/>
							</div>

							<div id='payment-link' className='alert alert-light d-none'>
								<h6 className='fw-bold'>Ссылка для оплаты:</h6>
								<a href='#' className='text-break'>
									https://payment.example.com/pay/abc123xyz
								</a>
							</div>

							<div className='d-grid'>
								<button type='submit' className='btn btn-primary'>
									Отправить
								</button>
							</div>

							<div>
								Ссылка на оплату:{" "}
								<a href='' target='_blank'>
									link
								</a>
							</div>
						</form>
					</div>
				</div>
			</div>
		</div>
	)
}

export default Channel
