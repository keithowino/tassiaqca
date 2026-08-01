export default function FormLabel({ children, htmlFor, required = false }) {
	return (
		<label
			htmlFor={htmlFor}
			className="block text-sm font-medium text-gray-700"
		>
			{children}

			{required && <span className="text-red-500 ml-1">*</span>}
		</label>
	);
}
