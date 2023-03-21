import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../components/layouts/MainLayout";
import ErrorPage from "../pages/error";
import NotFoundPage from "../pages/error/404";
const routes = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout />,
        children: [
            {
                path: "/",
                element: <div>Home</div>,
            },
        ],
    },
    {
        path: "*",
        element: <NotFoundPage />,
        errorElement: <ErrorPage />,
    },
]);
export default routes;
