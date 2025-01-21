import { Route, Routes } from "react-router-dom";

import Sidebar from "./SidebarPrep";

import OverviewPage from "./Main/MainPage";
import ProductsPage from "./ScanSAP/ScanSAPPage";
import UsersPage from "./MatImport/MatImportPage";
import SalesPage from "./MatCold/MatColdPage";
import OrdersPage from "./MatRework/MatReworkPage";
import HistoryBakingPrep from "./HistoryBaking/HistoryBakingPage";

function AppPrep() {
	return (
		<div className='flex h-screen bg-gray-900 text-gray-100 overflow-hidden'>
			{/* BG */}
			<div className='fixed inset-0 z-0'>
				<div className='absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 opacity-80' />
				<div className='absolute inset-0 backdrop-blur-sm' />
			</div>

			<Sidebar />
			<Routes>
				<Route path='/' element={<OverviewPage />} />
				<Route path='/products' element={<ProductsPage />} />
				<Route path='/users' element={<UsersPage />} />
				<Route path='/sales' element={<SalesPage />} />
				<Route path='/orders' element={<OrdersPage />} />
				<Route path='/analytics' element={<HistoryBakingPrep />} />
			</Routes>
		</div>
	);
}

export default AppPrep;
