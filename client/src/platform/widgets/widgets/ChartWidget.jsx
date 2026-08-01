import { Card, Heading, Text } from "../../../shared/ui";

export default function ChartWidget({ widget }) {
	return (
		<Card>
			<Card.Body>
				<Heading level={4}>{widget.title}</Heading>

				<div className="h-56 mt-6 rounded-lg border flex items-center justify-center">
					<Text className="text-gray-500">Chart Placeholder</Text>
				</div>
			</Card.Body>
		</Card>
	);
}
