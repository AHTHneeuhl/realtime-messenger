import { Route, Routes } from "react-router-dom";
import { SignIn, SignUp } from "../pages/auth";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/signin" element={<SignIn />} />
      <Route path="/signup" element={<SignUp />} />
    </Routes>
  );
}

export default AppRoutes;
