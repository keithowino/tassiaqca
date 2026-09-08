function formatDate(value) {
	if (!value) {
		return "Unknown";
	}

	const date = new Date(value);

	if (Number.isNaN(date.getTime())) {
		return "Unknown";
	}

	return new Intl.DateTimeFormat(undefined, {
		dateStyle: "medium",
		timeStyle: "short",
	}).format(date);
}

function SessionDetail({ label, value }) {
	return (
		<div>
			<dt className="text-sm text-gray-500">{label}</dt>
			<dd className="mt-1 text-sm text-gray-900">{value || "Unknown"}</dd>
		</div>
	);
}

export default function SessionCard({ session }) {
	const {
		deviceName,
		browser,
		operatingSystem,
		ipAddress,
		lastActivityAt,
		expiresAt,
		current,
	} = session;

	return (
		<article className="rounded-lg border border-gray-200 bg-white p-5 shadow-sm">
			<div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
				<div>
					<div className="flex items-center gap-2">
						<h3 className="text-base font-semibold text-gray-900">
							{deviceName || "Unknown device"}
						</h3>

						{current && (
							<span className="rounded-full bg-green-100 px-2 py-1 text-xs font-medium text-green-700">
								Current session
							</span>
						)}
					</div>

					<p className="mt-1 text-sm text-gray-500">
						{browser || "Unknown browser"}
						{" · "}
						{operatingSystem || "Unknown operating system"}
					</p>
				</div>
			</div>

			<dl className="mt-5 grid gap-4 sm:grid-cols-2">
				<SessionDetail label="IP address" value={ipAddress} />

				<SessionDetail
					label="Last activity"
					value={formatDate(lastActivityAt)}
				/>

				<SessionDetail
					label="Session created"
					value={formatDate(session.createdAt)}
				/>

				<SessionDetail label="Expires" value={formatDate(expiresAt)} />
			</dl>
		</article>
	);
}
