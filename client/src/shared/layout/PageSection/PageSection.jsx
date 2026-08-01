import { Section, Container } from "../../ui";

export default function PageSection({
	children,
	className = "",
	containerClassName = "",
}) {
	return (
		<Section className={className}>
			<Container className={containerClassName}>{children}</Container>
		</Section>
	);
}
