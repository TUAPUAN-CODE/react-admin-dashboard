import { BarChart2, DollarSign, Menu, Settings, ShoppingBag, ShoppingCart, TrendingUp, Users } from "lucide-react";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Link, useLocation } from "react-router-dom";

const SIDEBAR_ITEMS = [
	{ name: "หน้าหลัก", icon: BarChart2, href: "/prep" },
	{ name: "Scan SAP", icon: ShoppingBag, href: "/prep/products" },
	{ name: "วัตถุดิบส่งอบต่อ", icon: Users, href: "/prep/users" },
	{ name: "วัตถุดิบฝากห้องเย็น", icon: DollarSign, href: "/prep/sales" },
	{ name: "วัตถุดิบรอแก้ไข", icon: ShoppingCart, href: "/prep/orders" },
	{ name: "ประวัติต้ม/อบเสร็จ", icon: TrendingUp, href: "/prep/analytics" },
	{ name: "ออกจากระบบ", icon: Settings, href: "/login" },
];

const Sidebar = () => {
	const [isSidebarOpen, setIsSidebarOpen] = useState(true);
	const location = useLocation();

	// ตรวจสอบเส้นทางที่กำลังใช้งานอยู่
	const activeItem = location.pathname;

	return (
		<motion.div
			className={`relative z-10 transition-all duration-300 ease-in-out flex-shrink-0 ${
				isSidebarOpen ? "w-64" : "w-20"
			}`}
			animate={{ width: isSidebarOpen ? 256 : 80 }}
		>
			<div
				className="h-full p-4 flex flex-col"
				style={{
					background: "linear-gradient(to right, #4aaaec 0%, #2288d1 100%)",
					color: "#fff",
				}}
			>
				{/* Toggle Button */}
				<motion.button
					whileHover={{ scale: 1.2 }}
					whileTap={{ scale: 0.9 }}
					onClick={() => setIsSidebarOpen(!isSidebarOpen)}
					className="p-2 rounded-full text-white transition-colors max-w-fit"
					style={{ color: "#E0F2FE" }}
				>
					<Menu size={24} />
				</motion.button>

				{/* Navigation Items */}
				<nav className="mt-8 flex-grow">
					{SIDEBAR_ITEMS.map((item) => (
						<Link key={item.href} to={item.href}>
							<motion.div
								className={`flex items-center p-4 text-sm font-medium rounded-lg transition-colors mb-2 ${
									activeItem === item.href
										? "bg-white text-[#4aaaec]"
										: "hover:bg-white hover:text-[#4aaaec]"
								}`}
							>
								<item.icon size={20} style={{ color: activeItem === item.href ? "#4aaaec" : "#fff" }} />
								<AnimatePresence>
									{isSidebarOpen && (
										<motion.span
											className="ml-4 whitespace-nowrap"
											initial={{ opacity: 0, width: 0 }}
											animate={{ opacity: 1, width: "auto" }}
											exit={{ opacity: 0, width: 0 }}
											transition={{ duration: 0.2, delay: 0.3 }}
										>
											{item.name}
										</motion.span>
									)}
								</AnimatePresence>
							</motion.div>
						</Link>
					))}
				</nav>
			</div>
		</motion.div>
	);
};

export default Sidebar;
