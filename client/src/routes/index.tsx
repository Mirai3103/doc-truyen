import FallBackLoader from "@/components/FallbackLoader";
import AdminLayout from "@/components/layouts/AdminLayout";
import ReadingLayout from "@/components/layouts/ReadingLayout";
import LoginPage from "@/pages/auth";
import Callback from "@/pages/auth/callback";
import ChapterPage from "@/pages/chapter";
import ComicDetail from "@/pages/comicDetail";
import Home from "@/pages/home";
import TrendingPage from "@/pages/trending";
import React, { Suspense, useLayoutEffect } from "react";
import { NavigationType, createBrowserRouter, useLocation, useNavigationType } from "react-router-dom";
import MainLayout from "../components/layouts/MainLayout";
import ErrorPage from "../pages/error";
import NotFoundPage from "../pages/error/404";
const CreateComicPage = React.lazy(() => import("@/pages/admin/CreateComic"));
const ScrollToTopWrapper = ({ children }: { children: JSX.Element }) => {
    const location = useLocation();
    const navigationType = useNavigationType();
    useLayoutEffect(() => {
        console.log("ScrollToTopWrapper", location.pathname, navigationType, document.getElementById("top"));

        if (navigationType === NavigationType.Push || navigationType === NavigationType.Replace) {
            document.getElementById("top")?.scrollIntoView();
        }
    }, [location, navigationType]);
    return children;
};
const routes = createBrowserRouter(
    [
        {
            path: "/",
            element: (
                <ScrollToTopWrapper>
                    <MainLayout />
                </ScrollToTopWrapper>
            ),
            children: [
                {
                    path: "/",
                    element: <Home />,
                },
                {
                    path: "/comic/:slug",
                    element: <ComicDetail />,
                },
                {
                    path: "/login",
                    element: <LoginPage authType="đăng nhập" />,
                    children: [
                        {
                            path: "callback",
                            element: <Callback />,
                        },
                    ],
                },
                {
                    path: "/register",
                    element: <LoginPage authType="đăng ký" />,
                },
                {
                    path: "/trending",
                    element: <TrendingPage />,
                },
            ],
        },
        {
            path: "/chapter/:chapterId",
            element: (
                <ScrollToTopWrapper>
                    <ReadingLayout />
                </ScrollToTopWrapper>
            ),
            children: [
                {
                    path: "",
                    element: <ChapterPage />,
                },
            ],
        },
        {
            path: "/admin",
            element: (
                <ScrollToTopWrapper>
                    <AdminLayout />
                </ScrollToTopWrapper>
            ),
            children: [
                {
                    path: "upload-comic",
                    element: (
                        <Suspense fallback={<FallBackLoader />}>
                            <CreateComicPage />
                        </Suspense>
                    ),
                },
            ],
        },
        {
            path: "*",
            element: <NotFoundPage />,
            errorElement: <ErrorPage />,
        },
    ],
    {}
);
export default routes;

export const appNavigate = (path: string) => {
    routes.navigate(path);
};
