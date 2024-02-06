import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useStateContext } from "./Contexts/ContextProvider";
import DefaultLayout from "./Components/DefaultLayout";
import GuestLayout from "./Components/GuestLayout";
import Login from "./Views/login";
import Signup from "./Views/signup";
import Profile from "./Views/profile";
import Games from "./Views/games";
import SideBar from "./Components/SideBar";
import EditProfile from "./Views/EditProfile";
import ForgotPassword from "./Views/ForgotPassword";
import ResetPassword from "./Views/ResetPassword";
import VerifyEmail from "./Views/VerifyEmail";

const AppRouter = () => {
  const { userToken } = useStateContext();

  return (
    <Router>
      <Routes>
        {userToken ? (
          <Route path="/" element={<SideBar />}>
            <Route index element={<DefaultLayout />} />
            <Route path="profile/" element={<Profile key={userToken} />} />
            <Route
              path="profile/edit"
              element={<EditProfile key={userToken} />}
            />
            <Route path="games" element={<Games />} />
          </Route>
        ) : (
          <Route path="/" element={<GuestLayout />}>
            <Route path="*" element={<Login />} />
            <Route path="signup" element={<Signup />} />
            <Route path="email/verify" element={<VerifyEmail />} />
            <Route path="login" element={<Login />} />
            <Route path="forgot-password" element={<ForgotPassword />} />
            <Route path="reset-password/:token" element={<ResetPassword />} />
          </Route>
        )}
      </Routes>
    </Router>
  );
};

export default AppRouter;
