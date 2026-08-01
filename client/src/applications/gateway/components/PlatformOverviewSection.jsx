import overview from "../data/platformOverview";

import {
	PageSection,
	FeatureGrid,
	SectionHeader,
} from "../../../shared/layout";

import { Card, Heading, Text } from "../../../shared/ui";

export default function PlatformOverviewSection() {
	return (
		<PageSection className="bg-gray-50">
			<SectionHeader
				title="One Platform. Three Applications."
				description="The platform is organised into distinct applications that share one architecture."
			/>

			<FeatureGrid columns={3}>
				{overview.map((item) => (
					<Card key={item.id}>
						<Card.Body>
							<Heading level={3}>{item.title}</Heading>

							<Text className="mt-4">{item.description}</Text>
						</Card.Body>
					</Card>
				))}
			</FeatureGrid>
		</PageSection>
	);
}
