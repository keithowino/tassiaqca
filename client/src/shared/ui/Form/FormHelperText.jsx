export default function FormHelperText({ children }) {
	if (!children) {
		return null;
	}

	return <p className="text-sm text-gray-500">{children}</p>;
}
