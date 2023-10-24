import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useStateContext } from "./Contexts/ContextProvider";
import DefaultLayout from "./Components/DefaultLayout";
import GuestLayout from "./Components/GuestLayout";
import Login from "./Views/login";
import Signup from "./Views/signup";
import Profile from "./Views/profile";

const AppRouter = () => {
  const { userToken } = useStateContext();

  return (
    <Router>
      <Routes>
        {userToken ? (
          <Route path="/" element={<DefaultLayout />}>
            <Route path="profile" element={<Profile />} />
            {/* Add more authenticated routes here */}
          </Route>
        ) : (
          <Route path="/" element={<GuestLayout />}>
            <Route path="login" element={<Login />} />
            <Route path="signup" element={<Signup />} />
            {/* Add more unauthenticated routes here */}
          </Route>
        )}
      </Routes>
    </Router>
  );
};

export default AppRouter;
