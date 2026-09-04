import {
	PageSection,
	SectionHeader,
	FeatureGrid,
} from "../../../shared/layout";

import {
	Button,
	Card,
	Heading,
	journeys,
	Text,
} from "../../../shared/index.js";
import { JourneyLink } from "../../../platform/index.js";

export default function JourneySection() {
	return (
		<PageSection>
			<SectionHeader
				title="Choose Your Journey"
				description="TassiaQCA serves customers, businesses, teams and communities through one unified platform."
			/>

			<FeatureGrid columns={4}>
				{journeys.map((journey) => (
					<Card key={journey.id}>
						<Card.Body>
							<Heading level={3}>{journey.title}</Heading>

							<Text className="mt-3 mb-6">
								{journey.description}
							</Text>

							<Button as={JourneyLink} intent={journey.intent}>
								{journey.action}
							</Button>
						</Card.Body>
					</Card>
				))}
			</FeatureGrid>
		</PageSection>
	);
}
