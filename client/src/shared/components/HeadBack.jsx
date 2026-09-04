import { Link } from "react-router-dom";

export default function HeadBack({ to, children }) {
	return (
		<Link
			to={to}
			className="text-sm font-medium text-white hover:text-slate-950"
		>
			← Back to {children}
		</Link>
	);
}
