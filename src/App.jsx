import { BrowserRouter as Router } from "react-router-dom";
import AppRoutes from "./routes/AppRoutes";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { DataProvider } from "./context/DataContext";
import ScrollToTop from "./hooks/ScrollToTop";

function App() {
  return (
    <>
      <Router>
        <DataProvider>
          <ScrollToTop>
            <AppRoutes />
          </ScrollToTop>
        </DataProvider>
        <ToastContainer position="top-right" autoClose={3000} theme="colored" />
      </Router>
    </>
  );
}

export default App;
