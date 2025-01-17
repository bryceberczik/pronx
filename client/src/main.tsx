import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App.tsx";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";

import { AuthGuard, LoggedInAuth } from "./components/AuthGuard.tsx";

import ErrorPage from "./pages/ErrorPage.tsx";
import Home from "./pages/Home.tsx";
import Signup from "./pages/Signup.tsx";
import Login from "./pages/Login.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: (
          <AuthGuard>
            <Home />
          </AuthGuard>
        ),
      },
      {
        path: "/signup",
        element: (
          <LoggedInAuth>
            <Signup />
          </LoggedInAuth>
        ),
      },
      {
        path: "/login",
        element: (
          <LoggedInAuth>
            <Login />
          </LoggedInAuth>
        ),
      },
    ],
  },
]);

const rootElement = document.getElementById("root");
if (rootElement) {
  ReactDOM.createRoot(rootElement).render(<RouterProvider router={router} />);
}
