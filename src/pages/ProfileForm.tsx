// ProfileForm.tsx (unchanged, as features are already implemented; for completeness)
import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  Snackbar,
  Card,
  CardContent,
  Alert,
  Avatar,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { saveProfileAsync } from "../redux/profileSlice";
import { useNavigate } from "react-router-dom";
import type { RootState, AppDispatch } from "../redux/store";
import PersonIcon from "@mui/icons-material/Person";

const ProfileForm: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const existingProfile = useSelector((state: RootState) => state.profile.data);

  const [form, setForm] = useState({ name: "", email: "", age: "" });
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  useEffect(() => {
    if (existingProfile) {
      setForm({
        name: existingProfile.name,
        email: existingProfile.email,
        age: existingProfile.age?.toString() || "",
      });
    }
  }, [existingProfile]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const validate = () => {
    if (!form.name || form.name.trim().length < 3) return "Name must be at least 3 characters";
    if (form.name.trim().length > 50) return "Name must not exceed 50 characters";
    if (!/^[A-Za-z\s'-]+$/.test(form.name)) return "Name can only contain letters, spaces, hyphens, and apostrophes";

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!form.email || !emailRegex.test(form.email)) return "Please enter a valid email address";
    if (form.email.length > 254) return "Email address is too long";

    if (form.age) {
      const ageNum = Number(form.age);
      if (isNaN(ageNum) || !Number.isInteger(ageNum)) return "Age must be a whole number";
      if (ageNum < 18) return "Age must be greater than 18";
      if (ageNum > 120) return "Please enter a valid age";
      if (ageNum < 0) return "Age cannot be negative";
    }

    return "";
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const err = validate();
    if (err) {
      setError(err);
      setLoading(false);
      return;
    }

    const payload = {
      name: form.name.trim(),
      email: form.email.trim(),
      age: form.age ? Number(form.age) : undefined,
    };

    try {
      const result: any = await dispatch(saveProfileAsync(form.name.trim(), payload) as any);

      if (result.success) {
        setSuccess(
          existingProfile
            ? "Profile updated successfully 🎉"
            : "Profile created successfully 🎉"
        );
        setTimeout(() => navigate("/profile"), 1000);
      } else {
        setError(result.error || "Failed to save profile");
      }
    } catch (err) {
      console.log(err);
      setError("Failed to save profile");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      minHeight="80vh"
      display="flex"
      alignItems="center"
      justifyContent="center"
      px={2}
    >
      <Card
        sx={{
          width: isMobile ? "100%" : 500,
          borderRadius: "24px",
          boxShadow: "0 8px 32px rgba(25,118,210,0.2)",
          overflow: "hidden",
        }}
      >
        
        <Box
          sx={{
            background: "linear-gradient(135deg, #1976D2 0%, #42A5F5 100%)",
            color: "white",
            py: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar
            sx={{
              width: isMobile ? 60 : 80,
              height: isMobile ? 60 : 80,
              mb: 2,
              bgcolor: "white",
              color: "#1976D2",
            }}
          >
            <PersonIcon sx={{ fontSize: isMobile ? 30 : 40 }} />
          </Avatar>
          <Typography variant={isMobile ? "h6" : "h5"} fontWeight={700}>
            {existingProfile ? "Edit Profile" : "Create Profile"}
          </Typography>
        </Box>

        <CardContent sx={{ p: isMobile ? 3 : 4 }}>
          <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{ display: "grid", gap: isMobile ? 1.5 : 2 }}
          >
            <TextField
              label="Name"
              name="name"
              fullWidth
              value={form.name}
              onChange={handleChange}
              required
            />
            <TextField
              label="Email"
              name="email"
              type="email"
              fullWidth
              value={form.email}
              onChange={handleChange}
              required
            />
            <TextField
              label="Age"
              name="age"
              type="number"
              fullWidth
              value={form.age}
              onChange={handleChange}
            />

            
            <Box display="flex" flexDirection={isMobile ? "column" : "row"} gap={2} mt={1}>
              <Button
                type="submit"
                disabled={loading}
                variant="contained"
                sx={{
                  flex: 1,
                  backgroundColor: "#1976D2",
                  "&:hover": { backgroundColor: "#1565C0" },
                }}
              >
                {existingProfile
                  ? loading
                    ? "Updating..."
                    : "Update Profile"
                  : loading
                  ? "Saving..."
                  : "Create Profile"}
              </Button>

              <Button
                type="button"
                variant="outlined"
                sx={{
                  flex: 1,
                  borderColor: "#1976D2",
                  color: "#1976D2",
                  "&:hover": { backgroundColor: "rgba(25,118,210,0.1)" },
                }}
                onClick={() => setForm({ name: "", email: "", age: "" })}
              >
                Clear
              </Button>
            </Box>
          </Box>
        </CardContent>
      </Card>

      
      <Snackbar
        open={!!error}
        autoHideDuration={4000}
        onClose={() => setError(null)}
      >
        <Alert severity="error" onClose={() => setError(null)}>
          {error}
        </Alert>
      </Snackbar>

     
      <Snackbar
        open={!!success}
        autoHideDuration={3000}
        onClose={() => setSuccess(null)}
      >
        <Alert severity="success" onClose={() => setSuccess(null)}>
          {success}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default ProfileForm;