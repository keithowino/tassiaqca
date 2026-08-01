import useWorkspace from "../../../platform/workspace/hooks/useWorkspace";
import WidgetRenderingEngine from "../../../platform/widgets/engine/WidgetRenderingEngine";

export default function BusinessWorkspace({ module }) {
	const {
		workspace: { dashboard },
	} = useWorkspace();

	// if (!module) {
	// 	return null;
	// }

	// const widgets =
	// 	dashboard?.widgets?.filter((widget) => widget.module === module.id) ??
	// 	[];

	// return (
	// 	<div className="space-y-6">
	// 		<h1 className="text-3xl font-bold">{module.label}</h1>

	// 		<p className="text-slate-500">{module.description}</p>

	// 		<div className="grid gap-6">
	// 			{widgets.map((widget) => (
	// 				<div
	// 					key={widget.id}
	// 					className="rounded-xl border bg-white p-6"
	// 				>
	// 					<h3>{widget.title}</h3>
	// 				</div>
	// 			))}
	// 		</div>
	// 	</div>
	// );

	return <WidgetRenderingEngine widgets={dashboard.widgets} />;
}
