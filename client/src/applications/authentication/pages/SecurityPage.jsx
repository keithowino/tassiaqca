import {
	LoadEmptyResponse,
	LoadError,
	LoadingScreen,
	PageSection,
	SeedHeader,
} from "../../../shared/index.js";
import { SessionList } from "../components/index.js";
import { useSessions } from "../hooks/index.js";

export default function SecurityPage() {
	const { sessions, loading, error, reload } = useSessions();

	return (
		<main>
			<SeedHeader
				badgeText="Sessions Settings"
				description="Review the devices and sessions currently signed in to your
					TassiaQCA account."
				headBack={true}
				to="/"
				title="Security"
			>
				Gateway
			</SeedHeader>

			{loading && (
				<LoadingScreen message="Loading your active sessions..." />
			)}

			{!loading && error && (
				/**
				 * #### One small architectural note
				 *
				 * The action taken in the following component is only the retry action. It does not perform a security mutation.
				 * That's appropriate for this stage.
				 * The eventual revoke actions will call the existing Identity service:
				 * - SecurityPage -> useSessions -> identity.service -> /auth/sessions/:sessionId
				 */
				<LoadError
					error={error}
					message="Unable to load sessions"
					action={{ action: reload, label: "Try again" }}
				/>
			)}

			{!loading && !error && sessions.length === 0 && (
				<PageSection>
					<LoadEmptyResponse
						message="No active sessions"
						description="There are currently no active sessions associated with your account."
					/>
				</PageSection>
			)}

			{!loading && !error && sessions.length > 0 && (
				<PageSection>
					<SessionList sessions={sessions} />
				</PageSection>
			)}
		</main>
	);
}
