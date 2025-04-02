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

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/alumni" />} />

        {/* Alumni routes with Layout */}
        <Route path="/alumni" element={<Layout />}>
          <Route index element={<Navigate to="home" />} />
          <Route path="home" element={<Home />} />
          <Route path="register" element={<Register />} />
          <Route path="login" element={<Login />} />
        </Route>
        <Route path="/*" element={<PageNotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
