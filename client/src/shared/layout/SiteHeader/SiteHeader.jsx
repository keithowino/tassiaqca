import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { MainLogo } from "../../components/index.js";

function getNavLinkClassName({ isActive }) {
	return [
		"text-sm font-medium transition-colors",
		isActive ? "text-slate-950" : "text-slate-600 hover:text-slate-950",
	].join(" ");
}

export default function SiteHeader({
	brand = "TassiaQCA",
	brandHref = "/",
	links = [],
	actions = null,
	className = "",
}) {
	const [mobileOpen, setMobileOpen] = useState(false);

	return (
		<header
			className={[
				"sticky top-0 z-40 border-b border-slate-200 bg-white/95 backdrop-blur",
				className,
			].join(" ")}
		>
			<div className="mx-auto flex min-h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
				{/**
				 * #### Think of how to add > onClick={() => setMobileOpen(false)}
				 */}
				<MainLogo
					iconPD="9"
					iconD="8"
					text={{ size: "text-xl", color: "text-gray-900" }}
					bg="light"
					ref={brandHref}
				/>

				<nav className="hidden items-center gap-6 md:flex">
					{links.map((link) => (
						<NavLink
							key={link.to}
							to={link.to}
							end={link.end}
							className={getNavLinkClassName}
						>
							{link.label}
						</NavLink>
					))}
				</nav>

				<div className="hidden items-center gap-3 md:flex">
					{actions}
				</div>

				<button
					type="button"
					className="inline-flex items-center justify-center rounded-lg border border-slate-200 px-3 py-2 text-sm font-medium text-slate-700 md:hidden"
					aria-expanded={mobileOpen}
					aria-label={
						mobileOpen ? "Close navigation" : "Open navigation"
					}
					onClick={() => setMobileOpen((current) => !current)}
				>
					{mobileOpen ? "Close" : "Menu"}
				</button>
			</div>

			{mobileOpen && (
				<div className="border-t border-slate-200 md:hidden">
					<nav className="mx-auto flex max-w-7xl flex-col px-4 py-4 sm:px-6 lg:px-8">
						{links.map((link) => (
							<NavLink
								key={link.to}
								to={link.to}
								end={link.end}
								className={({ isActive }) =>
									[
										"rounded-lg px-3 py-3 text-sm font-medium",
										isActive
											? "bg-slate-100 text-slate-950"
											: "text-slate-600 hover:bg-slate-50 hover:text-slate-950",
									].join(" ")
								}
								onClick={() => setMobileOpen(false)}
							>
								{link.label}
							</NavLink>
						))}

						{actions && (
							<div className="mt-3 border-t border-slate-200 pt-3">
								{actions}
							</div>
						)}
					</nav>
				</div>
			)}
		</header>
	);
}
