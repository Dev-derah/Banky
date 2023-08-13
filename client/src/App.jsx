import { Route, Routes } from "react-router-dom";
import "./App.css";
import { useSelector } from "react-redux";
import {  Home, Login, MainAccountDashboard, PageNotFound, Register, Transactions } from "./pages";
import ProtectedRoute from "./components/ProtectedRoute";



function App() {
  return (
    <main className=" dark:bg-gray-700 dark:text-gray-400">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/main-account"
          element={
            <ProtectedRoute>
              <MainAccountDashboard/>
            </ProtectedRoute>
          }
        />
        <Route
          path="/transactions"
          element={
            <ProtectedRoute >
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
