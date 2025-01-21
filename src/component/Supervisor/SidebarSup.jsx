import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import { BarChart2, DollarSign, Menu, ShoppingBag, TrendingUp, Users } from "lucide-react";

const SIDEBAR_ITEMS = [
	{ name: "หน้าหลัก", icon: BarChart2, href: "/sup" },
	{ name: "จัดการวัตถุดิบ", icon: ShoppingBag, href: "#", submenu: [
		{ name: "ตารางวัตถุดิบ", href: "/sup/TableRawmatPage" },
		{ name: "ตารางการผลิต", href: "/sup/TablePDRawmatPage" },
		{ name: "ตารางประเภทวัตถุดิบ", href: "/sup/TableTypePage" },
		{ name: "ตารางการแปรรูป", href: "/sup/TableTranfromPage" }
	] },
	{ name: "จัดการการทำงาน", icon: ShoppingBag, href: "#", submenu: [
		{ name: "ตารางสถานที่ทำงาน", href: "/sup/TableWorkPlacePage" },
		{ name: "ตารางตำแหน่ง", href: "/sup/TableRolePage" },
		{ name: "ตารางประเภทกิจกรรม", href: "/sup/TableActivityPage" },
		{ name: "ตารางการผลิต", href: "/sup/TablePDPage" }
	] },
	{ name: "ประวัติการทำรายการ", icon: ShoppingBag, href: "#", submenu: [
		{ name: "ตารางเวลาวัตถุดิบ", href: "/sup/TableTimeMatPage" },
		{ name: "ตารางเวลาวัตถุดิบแก้ไข", href: "/sup/TableTimeMatEditPage" },
		{ name: "ตารางรถเข็นเข้าห้องเย็น", href: "/sup/TableHisInputPage" },
		{ name: "ตารางรถเข็นออกห้องเย็น", href: "/sup/TableHisOutputPage" }
	] },
	{ name: "การจัดการพนักงาน", icon: BarChart2, href: "/sup/TableUserPage" },
	{ name: "ห้องเย็น", icon: ShoppingBag, href: "#", submenu: [
		{ name: "CSR 3", href: "/sup" },
		{ name: "Chill 2", href: "/sup" },
		{ name: "Chill 4", href: "/sup" },
		{ name: "Chill 5", href: "/sup" },
		{ name: "Chill 6", href: "/sup" },
		{ name: "4C", href: "/sup" },
		{ name: "Ante", href: "/sup" },
	] },
	{ name: "ออกจากระบบ", icon: BarChart2, href: "/login" },
];

const Sidebar = () => {
	const [isSidebarOpen, setIsSidebarOpen] = useState(true);
	const [openSubmenus, setOpenSubmenus] = useState({}); // สร้างสถานะการเปิด/ปิดสำหรับแต่ละเมนู
	const location = useLocation();
	const activeItem = location.pathname;

	// ฟังก์ชันสำหรับ toggle เมนูย่อย
	const toggleSubmenu = (menuName) => {
		setOpenSubmenus(prevState => ({
			...prevState,
			[menuName]: !prevState[menuName],
		}));
	};

	return (
		<motion.div
			className={`relative z-10 transition-all duration-300 ease-in-out flex-shrink-0 ${isSidebarOpen ? "w-64" : "w-20"}`}
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
						<div key={item.href}>
							{/* ถ้าเป็น "จัดการวัตถุดิบ" หรืออื่นๆ ที่มี submenu */}
							<Link to={item.href}>
								<motion.div
									className={`flex items-center p-4 text-sm font-medium rounded-lg transition-colors mb-2 ${
										activeItem === item.href
											? "bg-white text-[#4aaaec]"
											: "hover:bg-white hover:text-[#4aaaec]"
									}`}
									onClick={() => item.submenu && toggleSubmenu(item.name)} // เรียกฟังก์ชัน toggle ของเมนูที่มี submenu
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
							{/* เมนูย่อย */}
							{item.submenu && openSubmenus[item.name] && (
								<AnimatePresence>
									<motion.div
										className="pl-8"
										initial={{ opacity: 0 }}
										animate={{ opacity: 1 }}
										exit={{ opacity: 0 }}
										transition={{ duration: 0.3 }}
									>
										{item.submenu.map((submenuItem) => (
											<Link key={submenuItem.href} to={submenuItem.href}>
												<motion.div
													className={`flex items-center p-4 text-sm font-medium rounded-lg transition-colors mb-2 ${
														activeItem === submenuItem.href
															? "bg-white text-[#4aaaec]"
															: "hover:bg-white hover:text-[#4aaaec]"
													}`}
												>
													{/* สไตล์ของรายการเมนูย่อย */}
													<span className="ml-4">{submenuItem.name}</span>
												</motion.div>
											</Link>
										))}
									</motion.div>
								</AnimatePresence>
							)}
						</div>
					))}
				</nav>
			</div>
		</motion.div>
	);
};

export default Sidebar;
