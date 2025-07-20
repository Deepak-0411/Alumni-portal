import { BrowserRouter as Router } from "react-router-dom";
import AppRoutes from "./routes/AppRoutes";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { DataProvider } from "./context/DataContext";

function App() {
  return (
    <>
      <Router>
          <DataProvider>
            <AppRoutes />
          </DataProvider>
        <ToastContainer position="top-right" autoClose={3000} theme="colored" />
      </Router>
    </>
  );
}

export default App;
