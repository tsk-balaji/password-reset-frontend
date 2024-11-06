// eslint-disable-next-line no-unused-vars
import { React, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import LockResetIcon from "@mui/icons-material/LockReset";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { Card, CardContent } from "@mui/material";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ResetPassword = () => {
  const [searchParams] = useSearchParams();
  let navigate = useNavigate();
  const userId = searchParams.get("id");
  const token = searchParams.get("token");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const newpassword = data.get("newpassword");
    const confirmpassword = data.get("confirmpassword");

    if (newpassword !== confirmpassword) {
      toast.error("New Password and Confirm Password do not match!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      return;
    }

    if (newpassword.length < 8) {
      toast.error("Password must be at least 8 characters long.", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      return;
    }

    try {
      setLoading(true);
      const url = "https://password-reset-ys1m.onrender.com/resetPassword";
      const res = await axios.post(url, {
        password: newpassword,
        token: token,
        userId: userId,
      });

      console.log(res.data); // Inspect response data

      if (res.data.success === false) {
        toast.error(res.data.message, {
          autoClose: 5000,
          position: "top-right",
        });
      } else {
        toast.success("Password updated successfully!", {
          autoClose: 5000,
          position: "top-right",
        });
        toast.success("Redirecting to login...", {
          autoClose: 2000,
          position: "top-right",
        });
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      }
    } catch (error) {
      console.error("Error:", error.response ? error.response.data : error);
      toast.error("An error occurred. Please try again later.", {
        autoClose: 5000,
        position: "top-right",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          marginTop: 10,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Card sx={{ boxShadow: "4" }}>
          <CardContent sx={{ m: 3 }}>
            <Avatar sx={{ m: "auto", bgcolor: "primary.main" }}>
              <LockResetIcon />
            </Avatar>
            <Typography component="h1" variant="h5" sx={{ mt: 1 }}>
              Reset Password
            </Typography>

            <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                type="password"
                name="newpassword"
                id="newpassword"
                label="New Password"
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                type="password"
                name="confirmpassword"
                id="confirmpassword"
                label="Confirm Password"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                disabled={loading}
              >
                {loading ? "Submitting..." : "Submit"}
              </Button>
              <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
              />
            </Box>
          </CardContent>
        </Card>
      </Box>
    </Container>
  );
};

export default ResetPassword;
