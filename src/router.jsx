import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useStateContext } from "./Contexts/ContextProvider";
import DefaultLayout from "./Components/DefaultLayout";
import GuestLayout from "./Components/GuestLayout";
import Login from "./Views/login";
import Signup from "./Views/signup";
import Profile from "./Views/profile";
import Games from "./Views/games";
import SideBar from "./Components/SideBar";

const AppRouter = () => {
  const { userToken } = useStateContext();

  return (
    <Router>
      <Routes>
        {userToken ? (
          <Route path="/" element={<SideBar />}>
            <Route index element={<DefaultLayout />} />
            <Route path="profile" element={<Profile />} />
            <Route path="games" element={<Games />} />
          </Route>
        ) : (
          <Route path="/" element={<GuestLayout />}>
            <Route path="login" element={<Login />} />
            <Route path="signup" element={<Signup />} />
          </Route>
        )}
      </Routes>
    </Router>
  );
};

export default AppRouter;
