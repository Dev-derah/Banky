import { Route, Routes } from "react-router-dom";
import ProtectedRoute from "../utils/ProtectedRoute";
import "./App.css";
import { useSelector } from "react-redux";
import { Dashboard, Home, Login, PageNotFound, Register, Transactions } from "./pages";



function App() {
  const {token} = useSelector((state) => state.auth);
  return (
    <main className=" dark:bg-gray-700 dark:text-gray-400">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute isAuthenticated={token ? true : false}>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/transactions"
          element={
            <ProtectedRoute isAuthenticated={token ? true : false}>
              <Transactions />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </main>
  );
}

export default App;
