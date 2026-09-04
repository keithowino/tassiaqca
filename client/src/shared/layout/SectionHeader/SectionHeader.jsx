import { Heading, Text } from "../../ui";

export default function SectionHeader({
	title,
	description,
	align = "center",
	className = "",
}) {
	return (
		<div
			className={`mb-12 ${
				align === "center" ? "text-center" : "text-left"
			} ${className}`}
		>
			<Heading level={3}>{title}</Heading>

			{description && <Text className="mt-3">{description}</Text>}
		</div>
	);
}
