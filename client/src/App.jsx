import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import { Dashboard, Home, Login, PageNotFound, Register } from "./pages";
import {CssBaseline,ThemeProvider} from '@mui/material';
import { theme } from "./theme";

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
      <ThemeProvider theme={theme}>
        <CssBaseline/>
        <RouterProvider router={router}></RouterProvider>
      </ThemeProvider>
    </main>
  );
}

export default App;
