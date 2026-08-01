import { useNavigate } from "react-router-dom";

import { Button, Card, Heading, Text } from "../../../../shared/ui";

export default function QuickActions({ onCreateBusiness }) {
	const navigate = useNavigate();

	return (
		<div className="grid gap-4 mt-12 md:grid-cols-4">
			<Card>
				<Card.Body>
					<Heading level={3}>Create a Business</Heading>

					<Text className="mt-3 mb-6">
						Create a brand new business workspace and begin
						configuring your Business OS.
					</Text>

					<Button onClick={onCreateBusiness}>Create Business</Button>
				</Card.Body>
			</Card>

			<Card>
				<Card.Body>
					<Heading level={3}>Join a Business</Heading>

					<Text className="mt-3 mb-6">
						Accept an invitation to collaborate inside an existing
						workspace.
					</Text>

					<Button variant="outline" disabled>
						Coming Soon
					</Button>
				</Card.Body>
			</Card>

			<Card>
				<Card.Body>
					<Heading level={3}>Marketplace</Heading>

					<Text className="mt-3 mb-6">
						Return to the marketplace and continue exploring
						products, services and businesses.
					</Text>

					<Button
						variant="outline"
						onClick={() => navigate("/marketplace")}
					>
						Go to Marketplace
					</Button>
				</Card.Body>
			</Card>

			<Card>
				<Card.Body>
					<Heading level={3}>Audit Actions</Heading>

					<Text className="mt-3 mb-6">
						Monitor and or verify recent activities
					</Text>

					<Button variant="outline" disabled>
						coming Soon
					</Button>
				</Card.Body>
			</Card>
		</div>
	);
}
