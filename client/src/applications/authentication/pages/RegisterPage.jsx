import AuthCard from "../components/AuthCard";
import AuthHeader from "../components/AuthHeader";
import AuthFooter from "../components/AuthFooter";
import RegisterForm from "../components/RegisterForm";

export default function RegisterPage() {
	return (
		<AuthCard>
			<AuthHeader
				title="Create Your Account"
				description="Join TassiaQCA and start exploring your community."
			/>

			<RegisterForm />

			<AuthFooter
				label="Already have an account?"
				link="/login"
				linkLabel="Sign in"
			/>
		</AuthCard>
	);
}
