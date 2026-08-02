import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import bootstrapSession from "../../workspace/services/bootstrapSession";
import provisioningService from "../../workspace/services/provisioning.service";

import useWorkspace from "../../workspace/hooks/useWorkspace";

import useBootstrap from "../hooks/useBootstrap";

export default function BootstrapEngine() {
	const navigate = useNavigate();

	const { initialize } = useWorkspace();

	const { setStatus } = useBootstrap();

	useEffect(() => {
		const run = async () => {
			try {
				const session = bootstrapSession.get();

				if (!session?.businessId) {
					navigate("/business/hub", {
						replace: true,
					});

					return;
				}

				setStatus({
					stage: "identity",
					message: "Loading identity...",
				});

				const workspace = await provisioningService.provisionWorkspace(
					session.businessId,
				);

				setStatus({
					stage: "initializing",
					message: "Preparing workspace...",
				});

				initialize(workspace);

				bootstrapSession.clear();

				navigate("/business", {
					replace: true,
				});
			} catch (error) {
				setStatus({
					stage: "error",
					message: "Unable to initialize workspace.",
					error,
				});
			}
		};

		run();
	}, [initialize, navigate, setStatus]);

	return null;
}
