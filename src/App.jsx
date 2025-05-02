import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import PageNotFound from "./Auth/PageNotFound";
import Layout from "./Components/Page/Layout";
import Register from "./User/Pages/Register";
import Login from "./User/Pages/Login";
import Home from "./User/Pages/Home";
import Events from "./User/Pages/Events";
import ContactUs from "./User/Pages/ContactUs";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/alumni" />} />

        {/* Main Layout wrapper */}
        <Route path="/alumni" element={<Layout />}>
          {/* First level inside Layout */}
          <Route index element={<Navigate to="home" />} />
          <Route path="home" element={<Home />} />
          <Route path="register" element={<Register />} />
          <Route path="login" element={<Login />} />

          {/* Nested route for user content wrapped in Navbar */}
          <Route path="user" element={<Events />}>// navigation from layout Component
            <Route index element={<Navigate to="events" />} />
            <Route path="events" element={<Events />} />
            <Route path="contactUs" element={<ContactUs />} />
          </Route>
        </Route>

        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
