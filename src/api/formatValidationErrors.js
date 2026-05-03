export const formatValidationErrors = error => {
	const errors = error.errors
	for (let key in errors) errors[key] = errors[key][0]

	return errors
}
