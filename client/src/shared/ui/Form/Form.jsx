export default function Form({ children, className = "", onSubmit }) {
	return (
		<form onSubmit={onSubmit} className={`space-y-6 ${className}`}>
			{children}
		</form>
	);
}
