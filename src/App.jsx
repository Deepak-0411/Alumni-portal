import { BrowserRouter as Router } from "react-router-dom";
import AppRoutes from "./routes/AppRoutes";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import { AuthProvider } from "./context/AuthContext";


function App() {
  return (
    <>
    <AuthProvider>
    <Router>
      <AppRoutes />
      <ToastContainer position="top-right" autoClose={3000} theme="colored" />
    </Router>
    </AuthProvider>
    </>
  );
}

export default App;
