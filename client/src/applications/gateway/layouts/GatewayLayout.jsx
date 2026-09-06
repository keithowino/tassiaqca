import { Outlet } from "react-router-dom";
import { AppShell } from "../../../shared/index.js";
import { GatewayFooter, GatewayHeader } from "../components/index.js";

export default function GatewayLayout() {
	return (
		<AppShell
			className="bg-slate-50 text-slate-900"
			mainClassName="min-h-0"
			header={<GatewayHeader />}
			footer={<GatewayFooter />}
		>
			<Outlet />
		</AppShell>
	);
}
