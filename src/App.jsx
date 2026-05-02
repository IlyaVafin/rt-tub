import { Route, Routes } from "react-router"
import Home from "./pages/Home"
import Login from "./pages/Login"
import Channel from "./pages/Channel"
import Profile from "./pages/Profile"
import "bootstrap/dist/css/bootstrap.min.css"
import "./assets/css/styles.css"
import Register from "./pages/Register"
import AuthGuard from "./AuthGuard"
const App = () => {
	return (
		<>
			<Routes>
				<Route element={<AuthGuard auth={false} />}>
					<Route path='/' element={<Home />} />
					<Route path='/channel/:id' element={<Channel />} />
					<Route path='/profile/:id' element={<Profile />} />
					<Route path='/login' element={<Login />} />
					<Route path='/register' element={<Register />} />
				</Route>
			</Routes>
		</>
	)
}

export default App
