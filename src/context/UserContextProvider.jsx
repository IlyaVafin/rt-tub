import { createContext, useCallback, useContext, useState } from "react"

const UserContext = createContext(null)

export const UserContextProvider = ({ children }) => {
	const [user, setUser] = useState(false)
	const toggleUser = useCallback(val => setUser(val), [])
	return (
		<UserContext.Provider value={{ user, toggleUser }}>
			{children}
		</UserContext.Provider>
	)
}

export const useUserContext = () => {
	const ctx = useContext(UserContext)
	return ctx
}
