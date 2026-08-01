import useBusinessOnboarding from "../hooks/useBusinessOnboarding";
import BusinessTypeSelector from "./BusinessTypeSelector";
import {
	Button,
	Form,
	FormActions,
	FormError,
	FormField,
	FormInput,
	FormLabel,
} from "../../../../shared/ui";

export default function BusinessInformationForm() {
	const { values, updateField, nextStep, error } = useBusinessOnboarding();

	return (
		<Form
			onSubmit={(event) => {
				event.preventDefault();
				nextStep();
			}}
			className="space-y-8 rounded-2xl bg-white p-8 shadow-sm"
		>
			<FormField>
				<FormLabel htmlFor="businessName" required>
					Business Name
				</FormLabel>

				<FormInput
					id="businessName"
					type="text"
					value={values.name}
					onChange={(event) =>
						updateField("name", event.target.value)
					}
				/>
			</FormField>

			<FormField>
				<FormLabel htmlFor="businessDescription" required>
					Description
				</FormLabel>

				<textarea
					id="businessDescription"
					className="w-full rounded-lg border px-4 py-3"
					rows={4}
					value={values.description}
					onChange={(event) =>
						updateField("description", event.target.value)
					}
				/>
			</FormField>

			<FormField>
				<BusinessTypeSelector
					value={values.businessType}
					onChange={(businessTypeId) =>
						updateField("businessType", businessTypeId)
					}
				/>
			</FormField>

			<div className="grid gap-6 md:grid-cols-2">
				<FormField>
					<FormLabel htmlFor="businessPhone" required>
						Phone
					</FormLabel>

					<FormInput
						id="businessPhone"
						type="tel"
						value={values.phone}
						onChange={(event) =>
							updateField("phone", event.target.value)
						}
					/>
				</FormField>

				<FormField>
					<FormLabel htmlFor="email" required>
						Email
					</FormLabel>

					<FormInput
						id="email"
						type="email"
						value={values.email}
						onChange={(event) =>
							updateField("email", event.target.value)
						}
						autoComplete="email"
					/>
				</FormField>
			</div>

			{error && <FormError>{error}</FormError>}

			<FormActions>
				{/* <Button type="submit" disabled={loading}> */}
				<Button type="submit">
					{/* {loading ? "Creating Business..." : "Create Business"} */}
					Continue
				</Button>
			</FormActions>
		</Form>
	);
}
