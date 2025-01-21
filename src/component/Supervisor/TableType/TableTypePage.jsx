import { CheckCircle, Clock, DollarSign, ShoppingBag } from "lucide-react";
import { motion } from "framer-motion";

import Header from "../../Layout/Header";

const orderStats = {
	totalOrders: "1,234",
	pendingOrders: "56",
	completedOrders: "1,178",
	totalRevenue: "$98,765",
};

const TableTypeSup = () => {
	return (
		
			<div style={{ backgroundColor: "#f9f9f9" }} className="flex-1 overflow-auto relative z-10">
			<Header title={"ตารางประเภทวัตถุดิบ"} />

			<main className='max-w-7xl mx-auto py-6 px-4 lg:px-8  mt-[4rem]'>
				
			</main>
		</div>
	);
};
export default TableTypeSup;
