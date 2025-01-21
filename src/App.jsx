import React, { useState } from "react";
import { Route, Routes } from "react-router-dom"; // เปลี่ยนจาก Redirect เป็น Navigate
import AppPrep from "./component/Prep/AppPrep"; // import AppPrep เข้ามา
import AppSup from "./component/Supervisor/AppSup";
import Login from "./component/User/Login"; // import หน้า login
import { createTheme, ThemeProvider } from "@mui/material/styles"; // นำเข้า createTheme และ ThemeProvider

const theme = createTheme({
    typography: {
        fontFamily: "'Prompt', sans-serif", // ใช้ฟอนต์ Prompt
    },
});

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const handleLogin = (status) => {
        setIsLoggedIn(status);
    };

    return (
        <ThemeProvider theme={theme}> {/* ใช้ ThemeProvider เพื่อใช้ธีม */}
            <Routes>
                {/* หน้า login */}
                <Route path="/login" element={<Login onLogin={handleLogin} />} />
                {/* เมื่อผู้ใช้ล็อกอินแล้ว ให้เข้าไปที่หน้า Dashboard */}
                <Route path="/prep/*" element={<AppPrep />} />
                <Route path="/sup/*" element={<AppSup />} />
            </Routes>
        </ThemeProvider>
    );
}

export default App;
