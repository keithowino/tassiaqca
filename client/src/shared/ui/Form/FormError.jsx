export default function FormError({ children }) {
	if (!children) {
		return null;
	}

	return (
		<p className="rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700">
			{children}
		</p>
	);
}
