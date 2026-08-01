export default function Badge({ children, className = "" }) {
	return (
		<span
			className={`inline-flex items-center rounded-full bg-orange-100 text-orange-600 px-3 py-1 text-sm ${className}`}
		>
			{children}
		</span>
	);
}
