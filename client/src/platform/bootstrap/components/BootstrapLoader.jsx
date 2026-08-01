import useBootstrap from "../hooks/useBootstrap";

export default function BootstrapLoader() {
	const { status } = useBootstrap();

	return (
		<div className="flex min-h-screen items-center justify-center bg-slate-50">
			<div className="w-full max-w-md rounded-xl bg-white p-8 shadow">
				<h1 className="text-xl font-semibold">
					Provisioning Workspace
				</h1>

				<p className="mt-4 text-slate-600">
					{status.message || "Starting..."}
				</p>

				<div className="mt-8 h-2 overflow-hidden rounded bg-slate-200">
					<div className="h-full w-1/2 animate-pulse rounded bg-orange-500" />
				</div>

				{status.error && (
					<p className="mt-4 text-sm text-red-600">
						Unable to initialize workspace.
					</p>
				)}
			</div>
		</div>
	);
}
