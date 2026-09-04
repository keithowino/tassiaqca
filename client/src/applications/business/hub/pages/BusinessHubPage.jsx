import BusinessList from "../components/BusinessList";
import QuickActions from "../components/QuickActions";

import useBusinessHub from "../hooks/useBusinessHub";
import { PageSection, SeedHeader } from "../../../../shared/index.js";

export default function BusinessHubPage() {
	const { businesses, loading, openWorkspace, createBusiness } =
		useBusinessHub();

	return (
		<>
			<SeedHeader
				badgeText="Business Operating System"
				description="The Business OS helps you manage your business from one
					unified platform. Whether you sell products, provide
					services, manage bookings, operate a restaurant, or run an
					entire organization, your workspace adapts to your business."
				subDescription="Select a business workspace or create a new one."
				headBack={true}
				to="/"
				title="Welcome to your Business Hub."
			>
				Gateway
			</SeedHeader>

			<PageSection>
				<BusinessList
					loading={loading}
					businesses={businesses}
					onOpen={openWorkspace}
					onCreateBusiness={createBusiness}
				/>

				<QuickActions onCreateBusiness={createBusiness} />
			</PageSection>
		</>
	);
}
