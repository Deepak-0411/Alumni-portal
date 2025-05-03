import { BrowserRouter as Router } from "react-router-dom";
import AppRoutes from "./routes/AppRoutes";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';


function App() {
  return (
    <>
    <Router>
      <AppRoutes />
      <ToastContainer position="top-right" autoClose={3000} theme="colored" />
    </Router>
    </>
  );
}

export default App;
