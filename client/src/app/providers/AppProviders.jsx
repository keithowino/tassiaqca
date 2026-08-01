/**
 * Later this will compose providers such as:
 * - Authentication
 * - API
 * - Theme
 * - Query client
 * - Notifications
 * - Localization
 */
import { IdentityProvider } from "../../platform/identity";
import { WorkspaceProvider } from "../../platform/workspace";
import { PlatformProvider } from "../../platform/context";
import { JourneyProvider } from "../../platform/journey";

import registerWidgets from "../../platform/widgets/registry/registerWidgets";

registerWidgets();

export function AppProviders({ children }) {
	return (
		<IdentityProvider>
			<JourneyProvider>
				<WorkspaceProvider>
					<PlatformProvider>{children}</PlatformProvider>
				</WorkspaceProvider>
			</JourneyProvider>
		</IdentityProvider>
	);
}
