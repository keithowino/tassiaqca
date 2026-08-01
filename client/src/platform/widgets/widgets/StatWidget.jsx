import { Card, Heading, Text } from "../../../shared/ui";

export default function StatWidget({ widget }) {
	return (
		<Card>
			<Card.Body>
				<Text className="text-sm text-gray-500">
					{widget.moduleName}
				</Text>

				<Heading level={4} className="mt-2">
					{widget.title}
				</Heading>

				<Text className="text-3xl font-bold mt-5">--</Text>

				<Text className="text-sm text-gray-500 mt-3">
					Awaiting live data
				</Text>
			</Card.Body>
		</Card>
	);
}
