const STATUS_STYLES = {
	// Business statuses
	approved: "bg-emerald-50 text-emerald-700 border-emerald-200",
	verified: "bg-emerald-50 text-emerald-700 border-emerald-200",
	active: "bg-blue-50 text-blue-700 border-blue-200",
	pending: "bg-amber-50 text-amber-700 border-amber-200",
	rejected: "bg-red-50 text-red-700 border-red-200",
	suspended: "bg-red-50 text-red-700 border-red-200",
	unverified: "bg-amber-50 text-amber-700 border-amber-200",

	// Order statuses
	confirmed: "bg-blue-50 text-blue-700 border-blue-200",
	preparing: "bg-violet-50 text-violet-700 border-violet-200",
	ready: "bg-cyan-50 text-cyan-700 border-cyan-200",
	delivered: "bg-emerald-50 text-emerald-700 border-emerald-200",
	cancelled: "bg-red-50 text-red-700 border-red-200",
	completed: "bg-gray-50 text-gray-700 border-gray-200",

	// Payment statuses
	paid: "bg-emerald-50 text-emerald-700 border-emerald-200",
	failed: "bg-red-50 text-red-700 border-red-200",
	refunded: "bg-gray-50 text-gray-700 border-gray-200",

	// Generic
	true: "bg-emerald-50 text-emerald-700 border-emerald-200",
	false: "bg-red-50 text-red-700 border-red-200",

	// Roles
	admin: "bg-purple-50 text-purple-700 border-purple-200",
	business_owner: "bg-orange-50 text-orange-700 border-orange-200",
	user: "bg-gray-50 text-gray-700 border-gray-200",
};

export default function StatusBadge({ status, className = "" }) {
	const key = String(status).toLowerCase();
	const style =
		STATUS_STYLES[key] || "bg-gray-50 text-gray-700 border-gray-200";
	const label = String(status).replace(/_/g, " ");

	return (
		<span
			className={`inline-flex items-center px-2 py-0.5 rounded-md text-[11px] font-semibold capitalize border ${style} ${className}`}
		>
			{label}
		</span>
	);
}
