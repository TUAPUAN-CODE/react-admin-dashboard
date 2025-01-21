import { Route, Routes } from "react-router-dom";

import Sidebar from "./SidebarSup";

import MainSup from "./Main/MainPage";
import TablePDRawmatSup from "./TablePDRawmat/TablePDRawmatPage";
import TableRawmatSup from "./TableRawmat/TableRawmatPage";
import TableTranfromSup from "./TableTranfrom/TableTranfromPage";
import TableTypeSup from "./TableType/TableTypePage";
import TableHisOutputSup from "./TableHisOutput/TableHisOutputPage";
import TableWorkPlaceSup from "./TableWorkPlace/TableWorkPlacePage";
import TableUserSup from "./TableUser/TableUserPage";
import TableTimeMatEditSup from "./TableTimeMatEdit/TableTimeMatEditPage";
import TableTimeMatSup from "./TableTimeMat/TableTimeMatPage";
import TableRoleSup from "./TableRole/TableRolePage";
import TablePDSup from "./TablePD/TablePDPage";
import TableHisInputSup from "./TableHisInput/TableHisInputPage";
import TableActivitySup from "./TableActivity/TableActivityPage";
import RoomClodStorageSup from "./RoomClodStorage/RoomClodStoragePage";

function AppSup() {
	return (
		<div className='flex h-screen bg-gray-900 text-gray-100 overflow-hidden'>
			{/* BG */}
			<div className='fixed inset-0 z-0'>
				<div className='absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 opacity-80' />
				<div className='absolute inset-0 backdrop-blur-sm' />
			</div>

			<Sidebar />
			<Routes>
				<Route path='/' element={<MainSup />} />
				<Route path='/TablePDRawmatPage' element={<TablePDRawmatSup />} />
				<Route path='/TableRawmatPage' element={<TableRawmatSup />} />
				<Route path='/TableTranfromPage' element={<TableTranfromSup />} />
				<Route path='/TableTypePage' element={<TableTypeSup />} />
				<Route path='/TableHisOutputPage' element={<TableHisOutputSup />} />
				<Route path='/TableWorkPlacePage' element={<TableWorkPlaceSup />} />
				<Route path='/TableUserPage' element={<TableUserSup />} />
				<Route path='/TableTimeMatEditPage' element={<TableTimeMatEditSup />} />
				<Route path='/TableTimeMatPage' element={<TableTimeMatSup />} />
				<Route path='/TableRolePage' element={<TableRoleSup />} />
				<Route path='/TablePDPage' element={<TablePDSup />} />
				<Route path='/TableHisInputPage' element={<TableHisInputSup />} />
				<Route path='/TableActivityPage' element={<TableActivitySup />} />
				<Route path='/RoomClodStoragePage' element={<RoomClodStorageSup />} />
			</Routes>
		</div>
	);
}

export default AppSup;
