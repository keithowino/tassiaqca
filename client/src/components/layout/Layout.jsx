import { Outlet } from "react-router-dom";
import data from "../../lib/data";
import Header from "./Header";
import BottomNav from "./BottomNav";
import CartDrawer from "../orders/CartDrawer";
import Footer from "./Footer";

const Layout = () => {
	return (
		<div className="min-h-screen bg-gray-50">
			<Header />
			<main className="pb-20 md:pb-8">
				<Outlet />
			</main>
			<Footer />
			<BottomNav />
			<CartDrawer />
		</div>
	);
};

export default Layout;
