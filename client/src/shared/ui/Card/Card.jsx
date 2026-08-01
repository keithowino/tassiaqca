export default function Card({ children, className = "" }) {
	return (
		<div
			className={`bg-white rounded-2xl border border-gray-100 shadow-sm ${className}`}
		>
			{children}
		</div>
	);
}

Card.Header = function Header({ children, className = "" }) {
	return <div className={`p-6 border-b ${className}`}>{children}</div>;
};

Card.Body = function Body({ children, className = "" }) {
	return <div className={`p-6 ${className}`}>{children}</div>;
};

Card.Footer = function Footer({ children, className = "" }) {
	return <div className={`p-6 border-t ${className}`}>{children}</div>;
};
