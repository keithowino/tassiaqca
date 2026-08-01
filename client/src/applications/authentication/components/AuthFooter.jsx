import { Link } from "react-router-dom";

export default function AuthFooter({ label, link, linkLabel }) {
	return (
		<footer className="mt-8 text-center text-sm text-gray-600">
			<span>{label} </span>

			<Link
				to={link}
				className="font-medium text-orange-600 hover:text-orange-700"
			>
				{linkLabel}
			</Link>
		</footer>
	);
}
