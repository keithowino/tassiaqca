export default function FeatureGrid({ children, columns = 3 }) {
	const layouts = {
		2: "md:grid-cols-2",

		3: "md:grid-cols-3",

		4: "md:grid-cols-2 xl:grid-cols-4",
	};

	return <div className={`grid gap-8 ${layouts[columns]}`}>{children}</div>;
}
