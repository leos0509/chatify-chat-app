import { Routes, Route, Navigate } from "react-router-dom";
import NavBar from "./components/NavBar";
import Loading from "./components/Loading";
import { useAuthStore } from "./store/useAuthStore";
import { useThemeStore } from "./store/useThemeStore";
import { Toaster } from "react-hot-toast";

import HomePage from "./pages/HomePage";
import SignUpPage from "./pages/SignUpPage";
import SignInPage from "./pages/SignInPage";
import SettingPage from "./pages/SettingPage";
import ProfilePage from "./pages/ProfilePage";
import { useEffect } from "react";

function App() {
  const { authUser, isLoading, checkAuth, onlineUsers } = useAuthStore();
  const { theme } = useThemeStore();

  console.log(onlineUsers);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (isLoading && !authUser) return <Loading />;

  return (
    <div data-theme={theme} className="flex flex-col items-center" >
        <NavBar />
        <Routes>
          <Route path="/" element={authUser ? <HomePage /> : <Navigate to="/signin"/>}/>
          <Route path="/signup" element={!authUser ? <SignUpPage /> : <Navigate to="/"/>} />
          <Route path="/signin" element={!authUser ? <SignInPage /> : <Navigate to="/"/>} />
          <Route path="/settings" element={<SettingPage />}/>
          <Route path="/profile" element={authUser ? <ProfilePage /> : <Navigate to="/signin"/>}/>
        </Routes>

        <Toaster />
      </div>
  );
}

export default App;
