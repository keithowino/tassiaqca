import { Card, Heading, Text } from "../../../shared/ui";

export default function UnknownWidget({ widget }) {
	return (
		<Card>
			<Card.Body>
				<Heading level={4}>Unsupported Widget</Heading>

				<Text className="mt-2">
					Type: <strong>{widget.type}</strong>
				</Text>

				<Text className="text-sm text-gray-500 mt-2">
					This widget type has not been registered.
				</Text>
			</Card.Body>
		</Card>
	);
}
