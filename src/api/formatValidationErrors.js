export const formatValidationErrors = error => {
	const errors = {}
	const keys = Object.keys(error["errors"])
	const values = Object.values(error["errors"])
	for (let k of keys) {
		for (let value of values) {
			for (let v of value) {
				errors[k] = v
			}
		}
	}
	return errors
}
