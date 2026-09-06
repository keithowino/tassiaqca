import { Link } from "react-router-dom";

export const MainLogo = ({ iconPD, iconD, text, bg, ref }) => {
	return (
		<Link to={ref} className="flex items-center gap-2 shrink-0">
			<div
				className={`w-${iconPD} h-${iconPD} flex items-center justify-center`}
			>
				<img
					src={`${bg === "dark" ? "/favicon.svg" : "/favicon-32x32.png"}`}
					alt="TassiaQCA"
					className={`w-${iconD} h-${iconD} ${bg === "light" ? "bg-black" : ""} rounded-full`}
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
