export default function Text({ children, className = "" }) {
	return (
		<p className={`text-gray-600 leading-relaxed ${className}`}>
			{children}
		</p>
	);
}
