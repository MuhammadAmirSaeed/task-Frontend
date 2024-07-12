import  { useState } from "react";
// import { AuthContext } from "../AuthContext";
import {  useNavigate } from "react-router-dom";
import { Box, Button, CircularProgress, Container, IconButton, TextField, Typography } from "@mui/material";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import useSnackbar from "../../utils/swalConfig";
import axiosInstance from "../../utils/axiosConfig";
import { setCookie } from '../../utils/cookiesConfig.js';
const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { showSnackbar, SnackbarComponent } = useSnackbar();
  const navigate = useNavigate();
 

  const [loading, setIsloading] = useState(false);
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState({
    email: "",
    password: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const SubmitForm = async (e) => {
    e.preventDefault();
    setIsloading(true);
    setError({ email: "", password: "" });
    
    // Check if the user has entered fields correctly
    if (form.email === "") {
      setError((prevErrors) => ({
        ...prevErrors,
        email: "Please enter your email",
      }));
      setIsloading(false);
      return;
    }

    if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(form.email)) {
      setError((prevErrors) => ({
        ...prevErrors,
        email: "Please enter a valid email",
      }));
      setIsloading(false);
      return;
    }

    if (form.password === "") {
      setError((prevErrors) => ({
        ...prevErrors,
        password: "Please enter a password",
      }));
      setIsloading(false);
      return;
    }

    try {
      setIsloading(true);
     const response= await axiosInstance.post("api/v1/users/login", {
        email: form.email,
        password: form.password
      });
      console.log('>>>>response', response.data);
      console.log('>>>>response', response.data.data.accessToken);

      navigate("/add-products");
      setIsloading(false);
      showSnackbar("success", "login successfully");
     
        setCookie('token',  response.data.data.accessToken, 1); 
      
    } catch (error) {
      console.error("Login error:", error.message);
      setIsloading(false);
      showSnackbar("error", ` ${error.message}`);
    }
    setIsloading(false);
  };

  const handleIcon = () => {
    setShowPassword(!showPassword);
  };

  return (

    <Container maxWidth="xs" sx={{padding:"10px", borderRadius:"10px",}}>
      <Box display="flex" flexDirection="column" alignItems="center" mt={5}>
        <Typography variant="h4" component="h1" gutterBottom>
          Login
        </Typography>
        <form onSubmit={SubmitForm} style={{ width: '100%' }}>
          <Box mb={2}>
            <TextField
              label="Email"
              variant="outlined"
              fullWidth
              name="email"
              value={form.email}
              onChange={handleInputChange}
              error={!!error.email}
              helperText={error.email}
            />
          </Box>
          <Box mb={2}>
            <TextField
              label="Password"
              variant="outlined"
              fullWidth
              type={showPassword ? "text" : "password"}
              name="password"
              value={form.password}
              onChange={handleInputChange}
              error={!!error.password}
              helperText={error.password}
              InputProps={{
                endAdornment: (
                  <IconButton onClick={handleIcon}>
                    {showPassword ? <VisibilityOutlinedIcon /> : <VisibilityOffOutlinedIcon />}
                  </IconButton>
                ),
              }}
            />
          </Box>
         
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            disabled={loading}
            startIcon={loading && <CircularProgress size={20} />}
          >
            Submit
          </Button>
        </form>
      </Box>
      {SnackbarComponent}
    </Container>
   
  );
};

export default Login;
