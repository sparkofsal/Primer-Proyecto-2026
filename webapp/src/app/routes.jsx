// src/app/routes.jsx
import { createBrowserRouter } from "react-router-dom";
import LoginPage from "../features/auth/LoginPage";
import { RequireAuth } from "../features/auth/RequireAuth";
import AppLayout from "../layouts/AppLayout";
import DashboardPage from "../pages/DashboardPage";
import UsersPage from "../features/users/UsersPage";
import OrdersPage from "../features/roomservice/OrdersPage";
import { APP_CONFIG } from "../config/appConfig";

export const router = createBrowserRouter([
  { path: "/login", element: <LoginPage /> },

  {
    path: "/",
    element: (
      <RequireAuth>
        <AppLayout />
      </RequireAuth>
    ),
    children: [
      { path: "dashboard", element: <DashboardPage /> },

      ...(APP_CONFIG.features.users
        ? [{ path: "users", element: <UsersPage /> }]
        : []),

      ...(APP_CONFIG.features.roomserviceOrders
        ? [{ path: "orders", element: <OrdersPage /> }]
        : []),
    ],
  },
]);
