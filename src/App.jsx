import { Route, Routes } from "react-router"
import Home from "./pages/Home"
import Login from "./pages/Login"
import "bootstrap/dist/css/bootstrap.min.css"
import "./assets/css/styles.css"
import Register from "./pages/Register"
import AuthGuard from "./AuthGuard"
import CreateVideo from "./pages/CreateVideo"
import Profile from "./pages/Profile"
import Channel from "./pages/Channel"
import Video from "./pages/Video"
import EditVideo from "./pages/EditVideo"
const App = () => {
	return (
		<>
			<Routes>
				<Route element={<AuthGuard redirect={true} />}>
					<Route path='/profile/:nickname' element={<Profile />} />
					<Route path='/login' element={<Login />} />
					<Route path='/register' element={<Register />} />
					<Route path='/create-video' element={<CreateVideo />} />
					<Route path='/update-video/:videoId' element={<EditVideo />} />
				</Route>
				<Route element={<AuthGuard redirect={false} />}>
					<Route path='/channel/:nickname' element={<Channel />} />
					<Route path='/video/:videoId' element={<Video />} />
					<Route path='/' element={<Home />} />
				</Route>
			</Routes>
		</>
	)
}

export default App
