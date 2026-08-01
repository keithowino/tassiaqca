export default function Section({ children, className = "" }) {
	return <section className={`py-16 ${className}`}>{children}</section>;
}
