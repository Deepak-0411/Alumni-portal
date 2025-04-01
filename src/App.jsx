import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Layout from "./Components/Page/Layout";
import Register from "./User/Pages/Register";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/alumni/home" />} />
        
        {/* Alumni routes with Layout */}
        <Route path="/alumni" element={<Layout />}>
          <Route path="home" element={<Register />} />
          <Route path="register" element={<Register />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
