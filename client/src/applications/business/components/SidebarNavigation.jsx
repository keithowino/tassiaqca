import { NavLink } from "react-router-dom";

export default function SidebarNavigation({ navigation }) {
	if (!navigation?.sections?.length) {
		return null;
	}

	return (
		<nav className="space-y-8">
			{navigation.sections.map((section) => (
				<div key={section.id}>
					<h3 className="mb-3 px-3 text-xs font-semibold uppercase tracking-wide text-slate-500">
						{section.label}
					</h3>

					<div className="space-y-1">
						{section.items.map((item) => (
							<NavLink
								key={item.id}
								to={`/business${item.path}`}
								end={item.path === "/"}
								className={({ isActive }) =>
									[
										"block rounded-lg px-3 py-2 transition",
										isActive
											? "bg-orange-500 text-white"
											: "text-slate-700 hover:bg-slate-100",
									].join(" ")
								}
							>
								{item.label}
							</NavLink>
						))}
					</div>
				</div>
			))}
		</nav>
	);
}
