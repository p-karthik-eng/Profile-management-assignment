// src/pages/ProfilePage.tsx (updated with shouldLoad flag to prevent re-loading after delete)
import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Card,
  CardContent,
  Snackbar,
  Alert,
  CircularProgress,
  Avatar,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "../redux/store";
import { deleteProfileAsync, loadProfileAsync } from "../redux/profileSlice";  // Fixed import: loadProfileAsync instead of fetchProfileAsync
import { useNavigate } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const ProfilePage: React.FC = () => {
  const profile = useSelector((state: RootState) => state.profile.data);
  const loading = useSelector((state: RootState) => state.profile.loading);
  const error = useSelector((state: RootState) => state.profile.error);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [success, setSuccess] = useState<string | null>(null);
  const [deleting, setDeleting] = useState(false);
  const [shouldLoad, setShouldLoad] = useState(true);  // New flag to control auto-loading

  // Load profile from API if no local data on mount
  useEffect(() => {
    if (shouldLoad && !profile && !loading) {
      dispatch(loadProfileAsync());
    }
  }, [dispatch, profile, loading, shouldLoad]);

  const handleDelete = () => {
    if (!profile || !profile.id) {
      setErrorMessage("No user ID found to delete.");
      return;
    }
    setDeleteDialogOpen(true);
  };

  const confirmDelete = async () => {
    if (!profile?.id) return;

    setDeleting(true);
    setDeleteDialogOpen(false);

    try {
      const result = await dispatch(deleteProfileAsync(profile.id));  // Removed 'as any' and .unwrap()

      if (result.success) {
        setSuccess("Profile deleted successfully ✅");
        setShouldLoad(false);  // Prevent re-loading after delete
        // Optional: Immediately navigate to avoid any flash
        // navigate("/profile-form");  // Or wherever your login/create flow starts
      } else {
        setErrorMessage(result.error || "Failed to delete profile");
      }
    } catch (err) {
      console.error(err);
      setErrorMessage("Failed to delete profile");
    } finally {
      setDeleting(false);
    }
  };

  // Show loading spinner while fetching
  if (loading && !profile) {
    return (
      <Box
        sx={{
          minHeight: "80vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <CircularProgress />
        <Typography sx={{ mt: 2 }}>Loading profile...</Typography>
      </Box>
    );
  }

  if (!profile) {
    return (
      <Box
        sx={{
          minHeight: "80vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
          px: 2,
        }}
      >
        <Typography variant={isMobile ? "h5" : "h4"} sx={{ mb: 1, fontWeight: 700 }}>
          No Profile Found
        </Typography>
        <Typography sx={{ mb: 3, color: "gray" }}>
          You can create a user by clicking the login button below.
        </Typography>
        <Button
          variant="contained"
          onClick={() => navigate("/profile-form")}
          sx={{
            background: "linear-gradient(135deg, #42A5F5, #1976D2)",
            px: isMobile ? 3 : 4,
            py: isMobile ? 1 : 1.5,
            fontWeight: 600,
            fontSize: isMobile ? "0.85rem" : "1rem",
            "&:hover": { background: "linear-gradient(135deg, #1976D2, #1565C0)" },
          }}
        >
          Login
        </Button>
      </Box>
    );
  }

  return (
    <Card
      sx={{
        maxWidth: isMobile ? "90%" : 450,
        mx: "auto",
        mt: isMobile ? 4 : 6,
        borderRadius: 3,
        boxShadow: "0 10px 30px rgba(0,0,0,0.15)",
        overflow: "hidden",
      }}
    >
      {/* Header with Avatar */}
      <Box
        sx={{
          background: "linear-gradient(135deg, #42A5F5, #1976D2)",
          color: "white",
          py: isMobile ? 3 : 4,
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
            fontSize: isMobile ? 24 : 32,
          }}
        >
          {profile.name.charAt(0).toUpperCase()}
        </Avatar>
        <Typography variant={isMobile ? "h6" : "h5"} sx={{ fontWeight: 700 }}>
          {profile.name}
        </Typography>
      </Box>

      {/* Details Section */}
      <CardContent sx={{ p: isMobile ? 2 : 3 }}>
        <Box sx={{ mb: 3 }}>
          <Typography variant="subtitle1" sx={{ mb: 1, fontWeight: 600 }}>
            Profile Details:
          </Typography>
          <Typography sx={{ color: "gray", fontSize: isMobile ? "0.85rem" : "0.95rem" }}>
            <strong>Email:</strong> {profile.email}
          </Typography>
          <Typography sx={{ color: "gray", fontSize: isMobile ? "0.85rem" : "0.95rem" }}>
            <strong>Age:</strong> {profile.age || "Not Provided"}
          </Typography>
        </Box>

        <Box
          sx={{
            display: "flex",
            flexDirection: isMobile ? "column" : "row",
            gap: 2,
          }}
        >
          <Button
            variant="outlined"
            startIcon={<EditIcon />}
            onClick={() => navigate("/profile-form")}
            sx={{
              borderRadius: 2,
              borderColor: "#1976D2",
              color: "#1976D2",
              fontWeight: 600,
              flex: 1,
              "&:hover": {
                backgroundColor: "rgba(25,118,210,0.1)",
                transform: "translateY(-2px)",
              },
            }}
          >
            Edit
          </Button>
          <Button
            variant="contained"
            color="error"
            startIcon={<DeleteIcon />}
            onClick={handleDelete}
            sx={{
              borderRadius: 2,
              fontWeight: 600,
              flex: 1,
              "&:hover": { transform: "translateY(-2px)" },
            }}
          >
            Delete
          </Button>
        </Box>
      </CardContent>

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteDialogOpen} onClose={() => setDeleteDialogOpen(false)}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>Are you sure you want to delete your profile?</DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialogOpen(false)}>Cancel</Button>
          <Button onClick={confirmDelete} color="error" autoFocus disabled={deleting}>
            {deleting ? <CircularProgress size={20} /> : "Delete"}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Error Snackbar (now also shows Redux errors) */}
      <Snackbar
        open={!!errorMessage || !!error}
        autoHideDuration={4000}
        onClose={() => { setErrorMessage(""); /* Clear Redux error if needed */ }}
      >
        <Alert severity="error" onClose={() => setErrorMessage("")}>
          {errorMessage || error}
        </Alert>
      </Snackbar>

      {/* Success Snackbar */}
      <Snackbar
        open={!!success}
        autoHideDuration={3000}
        onClose={() => setSuccess(null)}
      >
        <Alert severity="success" onClose={() => setSuccess(null)}>
          {success}
        </Alert>
      </Snackbar>

      {/* Loading Overlay for delete */}
      {deleting && (
        <Box
          sx={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            bgcolor: "rgba(0, 0, 0, 0.5)",
            zIndex: 9999,
          }}
        >
          <CircularProgress />
        </Box>
      )}
    </Card>
  );
};

export default ProfilePage;