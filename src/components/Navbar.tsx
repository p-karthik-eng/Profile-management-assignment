import React from "react";
import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import type { RootState } from "../store";

const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const profile = useSelector((state: RootState) => state.profile.data);

  // Extract first name and last name from full name
  const getFirstAndLastName = (fullName: string) => {
    const nameParts = fullName.trim().split(/\s+/);
    const firstName = nameParts[0] || "";
    const lastName = nameParts.length > 1 ? nameParts[nameParts.length - 1] : "";
    return { firstName, lastName };
  };

  const { firstName, lastName } = profile?.name 
    ? getFirstAndLastName(profile.name) 
    : { firstName: "", lastName: "" };

  return (
    <AppBar position="static">
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography
          variant="h6"
          sx={{ cursor: "pointer" }}
          onClick={() => navigate("/")}
        >
          Profile Management
        </Typography>
        {profile?.name ? (
          <Typography variant="subtitle1">
            Welcome, {firstName} {lastName}
          </Typography>
        ) : (
          <Button color="inherit" onClick={() => navigate("/profile-form")}>
            Login
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
