import { Heading, Text } from "../../../shared/ui";

export default function AuthHeader({ title, description }) {
	return (
		<header className="text-center mb-8">
			<Heading level={2}>{title}</Heading>

			<Text className="mt-3">{description}</Text>
		</header>
	);
}
