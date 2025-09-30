import React, { useState } from "react";
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
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../store";
import { deleteProfileAsync } from "../store/profileSlice";
import { useNavigate } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";


const ProfilePage: React.FC = () => {
  const profile = useSelector((state: RootState) => state.profile.data);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [success, setSuccess] = useState<string | null>(null);
  const [deleting, setDeleting] = useState(false);

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
      const result = await dispatch(deleteProfileAsync(profile.id));
      
      if (result.success) {
        setSuccess("Profile deleted successfully ✅");
      } else {
        setErrorMessage((result as any).error || "Failed to delete profile");
      }
    } catch (err) {
      console.error(err);
      setErrorMessage("Failed to delete profile");
    } finally {
      setDeleting(false);
    }
  };

  if (!profile) {
    return (
      <Box
        sx={{ minHeight: "80vh" }}
        width={1}
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
      >
        <Typography variant="h5">No profile found </Typography>
        <Typography sx={{ mb: 2, mt: 1 }}>
          You can create user by clicking the login button.
        </Typography>
        <Button variant="contained" onClick={() => navigate("/profile-form")}>
          Login
        </Button>
      </Box>
    );
  }

  return (
    <Card sx={{ maxWidth: 500, margin: "2rem auto", boxShadow: 3 }}>
      <CardContent>
        <Typography variant="h5" gutterBottom>
          Profile Details
        </Typography>

        <Typography sx={{ mt: 1 }}>Name: {profile.name}</Typography>
        <Typography>Email: {profile.email}</Typography>
        <Typography sx={{ mb: 2 }}>
          Age: {profile.age || "Not Provided"}
        </Typography>

        <Box sx={{ display: "flex", gap: 2 }}>
          <Button
            variant="outlined"
            size="small"
            startIcon={<EditIcon />}
            onClick={() => navigate("/profile-form")}
          >
            Edit
          </Button>
          <Button
            variant="contained"
            color="error"
            size="small"
            startIcon={<DeleteIcon />}
            onClick={handleDelete}
          >
            Delete
          </Button>
         
        </Box>
      </CardContent>

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
      >
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <Box sx={{ minWidth: 250 }}>
            Are you sure you want to delete your profile? 
          </Box>
        </DialogContent>
        <DialogActions sx={{ mb: 1, mr: 1 }}>
          <Button
            onClick={() => setDeleteDialogOpen(false)}
            color="primary"
            size="small"
          >
            Cancel
          </Button>
          <Button onClick={confirmDelete} color="error" size="small" autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      {/* Error Snackbar */}
      <Snackbar
        open={!!errorMessage}
        autoHideDuration={4000}
        onClose={() => setErrorMessage("")}
      >
        <Alert severity="error" onClose={() => setErrorMessage("")}>
          {errorMessage}
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

      {/* Loading Overlay */}
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
