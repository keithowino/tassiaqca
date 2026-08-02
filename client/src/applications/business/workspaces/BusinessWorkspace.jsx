import useWorkspace from "../../../platform/workspace/hooks/useWorkspace";
import WidgetRenderingEngine from "../../../platform/widgets/engine/WidgetRenderingEngine";

export default function BusinessWorkspace({ module }) {
	const {
		workspace: { dashboard },
	} = useWorkspace();

	if (!module) {
		return null;
	}

	return <WidgetRenderingEngine widgets={dashboard.widgets} />;
}
