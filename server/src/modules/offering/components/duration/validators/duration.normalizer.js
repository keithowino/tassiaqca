export function normalizeDuration(data) {
	return {
		...data,

		unit:
			data.unit !== undefined
				? data.unit.trim().toUpperCase()
				: undefined,
	};
}

export default normalizeDuration;
