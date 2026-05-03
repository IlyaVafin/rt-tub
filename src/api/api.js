export const $fetch = async (
	route,
	method = "GET",
	body = undefined,
	contentType = true,
	hasAnswer = true,
) => {
	const url = new URL(`http://localhost:8000/api-rtub/${route}`)

	const requestBody = method === "GET" || !body ? undefined : body

	const headers = {
		Authorization: `Bearer ${localStorage.getItem("token")}`,
	}

	if (contentType) headers["Content-Type"] = "application/json"

	const response = await fetch(url, {
		method,
		headers,
		body: requestBody,
	})

	const payload = hasAnswer ? await response.json() : null
	if (response.ok) {
		return {
			success: true,
			data: payload,
		}
	}
	return {
		success: false,
		data: payload,
	}
}
