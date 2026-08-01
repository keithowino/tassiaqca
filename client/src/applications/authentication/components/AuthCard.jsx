import { Card } from "../../../shared/ui";

export default function AuthCard({ children }) {
	return (
		<Card className="w-full max-w-md shadow-xl">
			<Card.Body className="p-8">{children}</Card.Body>
		</Card>
	);
}
