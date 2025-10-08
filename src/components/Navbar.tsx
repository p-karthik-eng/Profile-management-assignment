import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Button,
  Container,
  IconButton,
  Menu,
  MenuItem,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import {
  Person as PersonIcon,
  AccountCircle as AccountCircleIcon,
  Edit as EditIcon,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "../Redux/store";
import { clearProfile } from "../Redux/profileSlice";

const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const profile = useSelector((state: RootState) => state.profile.data);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMenuClose = () => setAnchorEl(null);
  const handleLogout = () => {
    dispatch(clearProfile());
    handleMenuClose();
    navigate("/profile-form");
  };

  return (
    <Box
      sx={{
        background: "linear-gradient(135deg, #1976D2 0%, #42A5F5 100%)",
        boxShadow: "0 4px 20px rgba(25, 118, 210, 0.2)",
        borderRadius: "0 0 24px 24px",
        mx: isMobile ? 0 : 2,
        mt: isMobile ? 0 : 2,
      }}
    >
      <AppBar
        position="static"
        elevation={0}
        sx={{
          backgroundColor: "transparent",
          boxShadow: "none",
          borderRadius: "0 0 24px 24px",
        }}
      >
        <Container maxWidth="xl">
          <Toolbar
            sx={{
              py: isMobile ? 1 : 2,
              display: "flex",
              flexDirection: isMobile ? "column" : "row",
              justifyContent: "space-between",
              alignItems: isMobile ? "flex-start" : "center",
              gap: isMobile ? 1 : 0,
            }}
          >
            {/* Logo */}
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                cursor: "pointer",
                p: 1.5,
                borderRadius: 4,
                transition: "all 0.3s ease",
                "&:hover": {
                  backgroundColor: "rgba(255,255,255,0.15)",
                  transform: "translateY(-2px)",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
                },
              }}
              onClick={() => navigate("/")}
            >
              <Box
                sx={{
                  width: isMobile ? 36 : 48,
                  height: isMobile ? 36 : 48,
                  borderRadius: "50%",
                  backgroundColor: "rgba(255,255,255,0.25)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  mr: 2,
                  boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
                  border: "2px solid rgba(255,255,255,0.3)",
                }}
              >
                <PersonIcon sx={{ color: "white", fontSize: isMobile ? 20 : 26 }} />
              </Box>
              <Box>
                <Typography
                  variant={isMobile ? "subtitle1" : "h6"}
                  sx={{ fontWeight: 700, fontSize: isMobile ? "1rem" : "1.25rem" }}
                >
                  Profile Management
                </Typography>
                {!isMobile && (
                  <Typography
                    variant="caption"
                    sx={{ opacity: 0.9, fontSize: "0.75rem", textTransform: "uppercase" }}
                  >
                    Dashboard
                  </Typography>
                )}
              </Box>
            </Box>

            {/* Right Section */}
            {profile?.name ? (
              <>
                <Box
                  sx={{
                    mt: isMobile ? 1 : 0,
                    display: "flex",
                    alignItems: "center",
                    gap: 1.5,
                    p: 1.5,
                    borderRadius: 6,
                    backgroundColor: "rgba(255,255,255,0.15)",
                    border: "2px solid rgba(255,255,255,0.3)",
                    transition: "all 0.3s ease",
                    "&:hover": {
                      backgroundColor: "rgba(255,255,255,0.2)",
                      transform: "translateY(-1px)",
                    },
                  }}
                >
                  <Typography
                    variant="body2"
                    sx={{ color: "white", fontWeight: 700 }}
                  >
                    {profile.name}
                  </Typography>

                  <IconButton
                    size="small"
                    onClick={handleProfileMenuOpen}
                    sx={{
                      color: "white",
                      backgroundColor: "rgba(255,255,255,0.15)",
                      borderRadius: "50%",
                      width: isMobile ? 28 : 32,
                      height: isMobile ? 28 : 32,
                      border: "2px solid rgba(255,255,255,0.3)",
                      "&:hover": {
                        backgroundColor: "rgba(255,255,255,0.25)",
                        transform: "scale(1.05)",
                      },
                    }}
                  >
                    <AccountCircleIcon fontSize="small" />
                  </IconButton>
                </Box>

                <Menu
                  anchorEl={anchorEl}
                  open={Boolean(anchorEl)}
                  onClose={handleMenuClose}
                  PaperProps={{
                    sx: {
                      mt: 1,
                      minWidth: 220,
                      borderRadius: 2,
                      boxShadow: "0 8px 32px rgba(25,118,210,0.2)",
                    },
                  }}
                  transformOrigin={{ horizontal: "right", vertical: "top" }}
                  anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
                >
                  <Box sx={{ px: 2, py: 1.5, borderBottom: "1px solid rgba(0,0,0,0.1)" }}>
                    <Typography
                      variant="subtitle2"
                      sx={{ fontWeight: 600, color: "primary.main" }}
                    >
                      {profile.name}
                    </Typography>
                    <Typography variant="caption" sx={{ color: "text.secondary" }}>
                      {profile.email}
                    </Typography>
                  </Box>
                  <MenuItem
                    onClick={() => {
                      handleMenuClose();
                      navigate("/profile-form");
                    }}
                  >
                    <EditIcon sx={{ mr: 1, fontSize: 20 }} /> Edit Profile
                  </MenuItem>
                  <MenuItem onClick={handleLogout} sx={{ color: "error.main" }}>
                    <AccountCircleIcon sx={{ mr: 1, fontSize: 20 }} /> Logout
                  </MenuItem>
                </Menu>
              </>
            ) : (
              <Button
                color="inherit"
                onClick={() => navigate("/profile-form")}
                sx={{
                  mt: isMobile ? 1 : 0,
                  backgroundColor: "rgba(255,255,255,0.15)",
                  "&:hover": {
                    backgroundColor: "rgba(255,255,255,0.25)",
                    transform: "translateY(-2px)",
                  },
                  borderRadius: 6,
                  px: 3,
                  py: 1.5,
                  fontWeight: 600,
                  fontSize: isMobile ? "0.75rem" : "0.875rem",
                  border: "2px solid rgba(255,255,255,0.3)",
                }}
              >
                Login
              </Button>
            )}
          </Toolbar>
        </Container>
      </AppBar>
    </Box>
  );
};

export default Navbar;
