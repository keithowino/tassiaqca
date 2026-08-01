import HubHeader from "../components/HubHeader";
import BusinessList from "../components/BusinessList";
import QuickActions from "../components/QuickActions";

import useBusinessHub from "../hooks/useBusinessHub";
import { PageSection } from "../../../../shared/layout";

export default function BusinessHubPage() {
	const { businesses, loading, openWorkspace, createBusiness } =
		useBusinessHub();

	return (
		<>
			<HubHeader />

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
