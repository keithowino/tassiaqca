import BootstrapProvider from "../context/BootstrapProvider";

import BootstrapEngine from "../components/BootstrapEngine";
import BootstrapLoader from "../components/BootstrapLoader";

export default function BootstrapPage() {
	return (
		<BootstrapProvider>
			<BootstrapEngine />

			<BootstrapLoader />
		</BootstrapProvider>
	);
}
