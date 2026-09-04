import { Link } from "react-router-dom";

import { PageSection } from "../../../shared/layout";
import { Button, Heading, Text } from "../../../shared/index.js";
import { JourneyLink, PlatformIntents } from "../../../platform/index.js";

export default function CTASection() {
	return (
		<PageSection>
			<div className="rounded-3xl bg-gradient-to-r from-gray-900 to-black text-white p-12 text-center">
				<Heading level={2} className="text-white">
					Ready to Build Something Bigger?
				</Heading>

				<Text className="text-gray-300 mt-5 max-w-2xl mx-auto">
					Whether you're discovering businesses, operating one, or
					managing an entire community, TASSIAQCA grows with you.
				</Text>

				<div className="flex flex-wrap justify-center gap-4 mt-10">
					<Button
						as={JourneyLink}
						intent={PlatformIntents.intent.MARKETPLACE}
						size="lg"
					>
						Explore Marketplace
					</Button>

					<Button
						as={JourneyLink}
						intent={PlatformIntents.intent.START_BUSINESS}
						size="lg"
						variant="outline"
						className="border-white text-white hover:bg-white hover:text-black"
					>
						Start Your Business
					</Button>
				</div>
			</div>
		</PageSection>
	);
}
