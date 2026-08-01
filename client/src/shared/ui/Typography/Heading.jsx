const levels = {
	1: "text-5xl font-bold",

	2: "text-3xl font-bold",

	3: "text-2xl font-semibold",

	4: "text-xl font-semibold",
};

export default function Heading({ level = 2, className = "", children }) {
	const Component = `h${level}`;

	return (
		<Component className={`${levels[level]} ${className}`}>
			{children}
		</Component>
	);
}
