import { useEffect, useState } from "react"
import Header from "../components/Header"
import { $fetch } from "../api/api"
import { useParams } from "react-router"

const Video = () => {
	const [video, setVideo] = useState()
	const params = useParams()
	useEffect(() => {
		async function getVideo() {
			const result = await $fetch(`videos/${params.videoId}`)
			if (result.success) {
				setVideo(result.data.data.video)
			}
		}
		getVideo()
	}, [params])

	return (
		<>
			<Header />
			<div id='video-page' className='page'>
				<div className='container py-4'>
					{video && (
						<div className='row'>
							<div className='video-player-container'>
								<video className='video-player' poster='#' controls>
									<source src={video.video} type='video/mp4' />
								</video>
							</div>

							<div className='mb-4'>
								<h2 className='fw-bold mb-2'>{video.name}</h2>
								<div className='d-flex justify-content-between align-items-center mb-3'>
									<div className='text-muted'>
										<span>
											{video.views} просмотров • Опубликовано 2 дня назад
										</span>
									</div>
								</div>
								<p>{video.description ?? "Нет описания"}</p>
							</div>

							<div className='d-flex align-items-center mb-4 pb-3'>
								<div className='flex-grow-1'>
									<h6 className='fw-bold mb-0'>{video.author}</h6>
								</div>
								<a href='other_channel.html' className='btn btn-primary'>
									Перейти на канал
								</a>
							</div>
						</div>
					)}
				</div>
			</div>
		</>
	)
}

export default Video
