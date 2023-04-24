import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import { Dashboard, Home, Login, PageNotFound, Register } from "./pages";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/dashboard/:id",
      element: <Dashboard />,
    },

    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/register",
      element: <Register />,
    },
    {
      path: "*",
      element: <PageNotFound/>,
    },
  ]);

  return (
    <main>
      <RouterProvider router={router}></RouterProvider>
    </main>
  );
}

export default App;
