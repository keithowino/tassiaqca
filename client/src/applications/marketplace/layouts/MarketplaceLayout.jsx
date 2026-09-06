import { Outlet } from "react-router-dom";
import { AppShell } from "../../../shared/index.js";
import { MarketplaceFooter, MarketplaceHeader } from "../components/index.js";

export default function MarketplaceLayout() {
	return (
		<AppShell
			className="bg-slate-50 text-slate-900"
			mainClassName="min-h-0"
			header={<MarketplaceHeader />}
			footer={<MarketplaceFooter />}
		>
			<Outlet />
		</AppShell>
	);
}
