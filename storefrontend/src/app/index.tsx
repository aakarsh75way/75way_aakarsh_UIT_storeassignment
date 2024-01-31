import { BrowserRouter, Route, Routes } from "react-router-dom";
import DashboardRoutes from './containers/Dashboard/Containers/routes';
import LoginPage from './containers/Auth/Containers/LoginPage';
import SignUpPage from './containers/Auth/Containers/SignupPage';
import StorePage from "./containers/Store";
import SingleStorePage from "./containers/Store/Components/SingleStorePage";

const App = () => {
  return (
    <BrowserRouter>
        <Routes>
        <Route path="/*" element={<DashboardRoutes />} />
          <Route path="/auth/login" element={<LoginPage />} />
          <Route path="/auth/signup" element={<SignUpPage/>} />
          <Route path="/stores" element={<StorePage/>} />
          <Route path="/store/:id" element={<SingleStorePage/>} />


        </Routes>
  </BrowserRouter>
  )
}

export default App
