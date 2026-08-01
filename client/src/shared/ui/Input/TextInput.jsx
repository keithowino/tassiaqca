export default function TextInput({ className = "", ...props }) {
	return (
		<input
			className={`w-full rounded-2xl border border-gray-300 px-4 py-3 outline-none focus:ring-2 focus:ring-orange-500 ${className}`}
			{...props}
		/>
	);
}
