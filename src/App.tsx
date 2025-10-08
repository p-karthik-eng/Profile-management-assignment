import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ProfileForm, ProfilePage, PageNotFound } from "./pages";
import Navbar from "./components/Navbar";
import { useSelector } from "react-redux";
import type { RootState } from "./Redux/store";

function App() {
  const profile = useSelector((state: RootState) => state.profile.data);

  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route 
          path="/" 
          element={
            profile ? <Navigate to="/profile" replace /> : <Navigate to="/profile-form" replace />
          } 
        />
        <Route path="/profile-form" element={<ProfileForm />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/404" element={<PageNotFound />} />
        <Route path="*" element={<Navigate to="/404" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
