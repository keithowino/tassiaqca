import { Card, Heading, Text } from "../../../shared/ui";

export default function TableWidget({ widget }) {
	return (
		<Card>
			<Card.Body>
				<Heading level={4}>{widget.title}</Heading>

				<Text className="mt-4 text-gray-500">
					Table rendering will appear here.
				</Text>
			</Card.Body>
		</Card>
	);
}
