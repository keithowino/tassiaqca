import { Link } from "react-router-dom";

export default function HeadBack({ to, children }) {
	return (
		<Link
			to={to}
			className="text-sm font-medium text-gray-900 hover:text-blue-600"
		>
			← Back to {children}
		</Link>
	);
}
