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
const App = () => {
	return (
		<>
			<Routes>
				<Route element={<AuthGuard auth={false} />}>
					<Route path='/' element={<Home />} />
					<Route path='/profile/:profileId' element={<Profile />} />
					<Route path='/channel/:nickname' element={<Channel />} />
					<Route path='/login' element={<Login />} />
					<Route path='/register' element={<Register />} />
					<Route path='/create-video' element={<CreateVideo />} />
				</Route>
			</Routes>
		</>
	)
}

export default App
