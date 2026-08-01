import AuthCard from "../components/AuthCard";
import AuthHeader from "../components/AuthHeader";
import AuthFooter from "../components/AuthFooter";
import LoginForm from "../components/LoginForm";

export default function LoginPage() {
	return (
		<AuthCard>
			<AuthHeader
				title="Welcome Back"
				description="Sign in to continue to your workspace."
			/>

			<LoginForm />

			<AuthFooter
				label="Don't have an account?"
				link="/register"
				linkLabel="Create one"
			/>
		</AuthCard>
	);
}
