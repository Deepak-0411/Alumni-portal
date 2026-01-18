import { BrowserRouter as Router } from "react-router-dom";
import AppRoutes from "./routes/AppRoutes.routes";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import ScrollToTop from "./hooks/ScrollToTop";

function App() {
  return (
    <>
      <Router>
        <ScrollToTop>
          <AppRoutes />
        </ScrollToTop>
        <ToastContainer position="top-right" autoClose={3000} theme="colored" />
      </Router>
    </>
  );
}

export default App;
