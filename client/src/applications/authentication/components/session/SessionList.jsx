import { PageSection, SectionHeader } from "../../../../shared/index.js";
import SessionCard from "./SessionCard";

export default function SessionList({ sessions }) {
	const currentSession = sessions.find((session) => session.current);
	const otherSessions = sessions.filter((session) => !session.current);

	return (
		<div>
			{currentSession && (
				<PageSection>
					<SectionHeader
						title="Current session"
						description="This is the device you are currently using."
						align="left"
					/>

					<SessionCard session={currentSession} />
				</PageSection>
			)}

			<PageSection>
				<SectionHeader
					title="Other sessions"
					description="These are other devices where your account is currently
						signed in."
					align="left"
				/>

				{otherSessions.length > 0 ? (
					<div className="space-y-4">
						{otherSessions.map((session) => (
							<SessionCard key={session.id} session={session} />
						))}
					</div>
				) : (
					<div className="rounded-lg border border-dashed border-gray-300 bg-gray-50 p-6 text-sm text-gray-600">
						No other active sessions were found.
					</div>
				)}
			</PageSection>
		</div>
	);
}
