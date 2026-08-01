import { Outlet } from "react-router-dom";

import useWorkspace from "../../../platform/workspace/hooks/useWorkspace";

import SidebarNavigation from "../components/SidebarNavigation";

export default function BusinessLayout() {
	const { workspace } = useWorkspace();

	if (!workspace.ready) {
		return null;
	}

	return (
		<div className="min-h-screen bg-slate-100">
			<div className="flex">
				<aside className="w-72 border-r bg-white">
					<div className="border-b p-6">
						<h1 className="text-lg font-semibold">
							{workspace.business.name}
						</h1>

						<p className="mt-1 text-sm text-slate-500">
							{workspace.business.businessType}
						</p>
					</div>

					<div className="p-4">
						<SidebarNavigation navigation={workspace.navigation} />
					</div>
				</aside>

				<main className="flex-1 p-8">
					<Outlet />
				</main>
			</div>
		</div>
	);
}
