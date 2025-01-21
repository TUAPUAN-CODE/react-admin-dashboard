import { motion } from "framer-motion";

import Header from "../../Layout/Header";

import { CreditCard, DollarSign, ShoppingCart, TrendingUp } from "lucide-react";


const salesStats = {
	totalRevenue: "$1,234,567",
	averageOrderValue: "$78.90",
	conversionRate: "3.45%",
	salesGrowth: "12.3%",
};

const SalesPage = () => {
	return (
		<div style={{ backgroundColor: "#f9f9f9" }} className="flex-1 overflow-auto relative z-10">
			<Header title='วัตถุดิบถูกส่งไปฝากห้องเย็น' />

			<main className='max-w-7xl mx-auto py-6 px-4 lg:px-8 mt-[4rem]'>
			
				
			</main>
		</div>
	);
};
export default SalesPage;
