import { Button, Card, Heading, Text } from "../../../../shared/ui";

export default function BusinessCard({ business, onOpen }) {
	return (
		<Card>
			<Card.Body>
				<Heading level={3}>{business.name}</Heading>

				<Text className="mt-2">{business.businessType}</Text>

				<Text className="mt-4">{business.description}</Text>

				<div className="mt-8">
					<Button onClick={() => onOpen(business)}>
						Open Workspace
					</Button>
				</div>
			</Card.Body>
		</Card>
	);
}
