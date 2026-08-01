import {
	PageSection,
	SectionHeader,
	FeatureGrid,
} from "../../../shared/layout";
import { Card, Heading, Text } from "../../../shared/ui";

import howItWorks from "../data/howItWorks";

export default function HowItWorksSection() {
	return (
		<PageSection className="bg-gray-50">
			<SectionHeader
				title="How TASSIAQCA Works"
				description="A single platform connecting communities, customers and businesses."
			/>

			<FeatureGrid columns={3}>
				{howItWorks.map((item) => (
					<Card key={item.step}>
						<Card.Body className="text-center">
							<div className="w-12 h-12 mx-auto rounded-2xl bg-orange-100 text-orange-600 flex items-center justify-center text-xl font-bold mb-5">
								{item.step}
							</div>

							<Heading level={3}>{item.title}</Heading>

							<Text className="mt-3">{item.description}</Text>
						</Card.Body>
					</Card>
				))}
			</FeatureGrid>
		</PageSection>
	);
}
