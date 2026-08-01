import { Card, Heading, Text } from "../../../shared/ui";

export default function CalendarWidget({ widget }) {
	return (
		<Card>
			<Card.Body>
				<Heading level={4}>{widget.title}</Heading>

				<Text className="mt-4">Coming Soon</Text>
			</Card.Body>
		</Card>
	);
}
