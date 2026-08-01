import { Outlet } from "react-router-dom";

export default function GatewayLayout() {
	return (
		<div className="min-h-screen bg-slate-50">
			<Outlet />
		</div>
	);
}
