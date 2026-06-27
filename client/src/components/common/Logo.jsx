import { Link } from "react-router-dom";

export const MainLogo = ({ iconPD, iconD, text, bg }) => {
	return (
		<Link to="/" className="flex items-center gap-2 shrink-0">
			<div
				className={`w-${iconPD} h-${iconPD} flex items-center justify-center`}
			>
				<img
					src="/favicon.svg"
					alt="TassiaQCA"
					className={`w-${iconD} h-${iconD}`}
				/>
			</div>
			<span
				className={`font-bold ${text.size} ${bg === "dark" ? "text-white" : text.color}  tracking-tight`}
			>
				Tassia<span className="text-orange-500">QCA</span>
			</span>
		</Link>
	);
};
