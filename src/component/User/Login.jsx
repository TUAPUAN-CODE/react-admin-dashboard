import React, { useState } from "react";
import {
  Container,
  TextField,
  Button,
  Typography,
  Paper,
  Box,
  IconButton,
  InputAdornment,
  CssBaseline,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useNavigate } from "react-router-dom"; // นำเข้า useNavigate

// ✅ Schema ตรวจสอบข้อมูล
const schema = yup.object().shape({
  User_id: yup.string().required("กรุณากรอกรหัสพนักงาน"),
  password: yup
    .string()
    .min(5, "กรุณากรอกรหัสผ่าน")
    .required("Password is required"),
});

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate(); // สร้าง navigate สำหรับการนำทางไปหน้า /dashboard
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  // ฟังก์ชันที่ใช้ส่งข้อมูลเมื่อกดเข้าสู่ระบบ
  const onSubmit = (data) => {
    // ตรวจสอบข้อมูลการล็อกอินที่ได้รับ (ในตัวอย่างนี้จะสมมุติว่าเป็นการล็อกอินสำเร็จ)
    // หลังจากล็อกอินสำเร็จให้ไปที่หน้า /dashboard
    console.log("Logged in with: ", data);
    navigate("/prep"); // นำทางไปยัง /dashboard
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        minWidth: "100vw",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#1770b8",
        backgroundImage: "url('/')",
      }}
    >
      <CssBaseline />
      <Container maxWidth="lg">
        <Paper
          elevation={6}
          sx={{
            display: "flex",
            overflow: "hidden",
            borderRadius: 3,
          }}
        >
          {/* ✅ พื้นที่รูปภาพ */}
          <Box
            sx={{
              width: "50%",
              backgroundImage: "url('/Cat.jpg')",
              backgroundSize: "80vh",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
              display: { xs: "none", md: "block" },
            }}
          />

          {/* ✅ ฟอร์ม Login */}
          <Box
            sx={{
              width: { xs: "100%", md: "50%" },
              paddingTop: 20,
              paddingBottom: 20,
              paddingLeft: 10,
              paddingRight: 10,
              textAlign: "center",
            }}
          >
            <Typography
              variant="h4"
              gutterBottom
              sx={{ fontWeight: "bold", color: "#1e3c72" }}
            >
              ยินดีต้อนรับ
            </Typography>
            <Typography
              variant="body2"
              color="textSecondary"
              sx={{ marginBottom: 2 }}
            >
              กรุณาเข้าสู่ระบบเพื่อดำเนินการต่อ
            </Typography>
            <form onSubmit={handleSubmit(onSubmit)}> {/* เพิ่ม onSubmit */}
              <TextField
                fullWidth
                label="รหัสพนักงาน"
                variant="outlined"
                margin="normal"
                {...register("User_id")}
                error={!!errors.User_id}
                helperText={errors.User_id?.message}
              />
              <TextField
                fullWidth
                label="รหัสผ่าน"
                variant="outlined"
                margin="normal"
                type={showPassword ? "text" : "password"}
                {...register("password")}
                error={!!errors.password}
                helperText={errors.password?.message}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setShowPassword(!showPassword)}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              <Box mt={2}>
                <Button
                  fullWidth
                  variant="contained"
                  color="primary"
                  sx={{ padding: 1.2 }}
                  type="submit" // เพิ่ม type="submit"
                >
                  เข้าสู่ระบบ
                </Button>
              </Box>
              <Typography variant="body2" sx={{ marginTop: 2 }}>
                ยังไม่มีบัญชี? <a href="#">ลงทะเบียน</a>
              </Typography>
            </form>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default Login;
