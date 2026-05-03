import { useEffect, useState } from "react"
import { Navigate, Outlet, useLocation } from "react-router"
import { $fetch } from "./api/api"
import { useUserContext } from "./context/UserContextProvider"

const AuthGuard = ({ children, redirect }) => {
	const { user, toggleUser } = useUserContext()
	const location = useLocation()
	const [loading, setLoading] = useState(true)
	useEffect(() => {
		async function getUser() {
			if (!localStorage.getItem("token")) {
				toggleUser({ auth: false, user: null })
				setLoading(false)
				return
			}
			try {
				setLoading(true)
				const result = await $fetch("me")
				if (!result.success) {
					toggleUser({ auth: false, user: null })
				} else {
					toggleUser({ auth: true, user: result.data.data.profile })
				}
			} finally {
				setLoading(false)
			}
		}
		getUser()
	}, [toggleUser])
	if (loading) return <p>loading...</p>
	if (
		user.auth &&
		(location.pathname === "/login" || location.pathname === "/register")
	) {
		return <Navigate to='/' replace />
	} else if (
		!user.auth &&
		location.pathname !== "/login" &&
		location.pathname !== "/register"
	)
		if (redirect) {
			return <Navigate to='/login' replace />
		}

	return children ? children : <Outlet />
}

export default AuthGuard
