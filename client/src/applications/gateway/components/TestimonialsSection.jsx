import testimonials from "../data/testimonials";

import {
	PageSection,
	SectionHeader,
	FeatureGrid,
} from "../../../shared/layout";

import { Card, Heading, Text } from "../../../shared/ui";

export default function TestimonialsSection() {
	return (
		<PageSection>
			<SectionHeader
				title="Trusted by Communities"
				description="Early feedback from the people this platform is being built for."
			/>

			<FeatureGrid columns={3}>
				{testimonials.map((testimonial) => (
					<Card key={testimonial.name}>
						<Card.Body>
							<div className="flex items-center gap-4 mb-5">
								<div className="w-12 h-12 rounded-full bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center text-white font-bold">
									{testimonial.avatar}
								</div>

								<div>
									<Heading level={4}>
										{testimonial.name}
									</Heading>

									<p className="text-sm text-gray-500">
										{testimonial.role}
									</p>
								</div>
							</div>

							<Text>"{testimonial.content}"</Text>

							<div className="mt-5 text-amber-400">★★★★★</div>
						</Card.Body>
					</Card>
				))}
			</FeatureGrid>
		</PageSection>
	);
}
