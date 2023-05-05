import FallBackLoader from "@/components/FallbackLoader";
import AdminLayout from "@/components/layouts/AdminLayout";
import ReadingLayout from "@/components/layouts/ReadingLayout";
import Logout from "@/pages/Logout";
import Test from "@/pages/Test";
import ComicManage from "@/pages/admin/ComicManage";
import ChapterManage from "@/pages/admin/ComicManage/ChapterManage";
import EditComicPage from "@/pages/admin/ComicManage/EditComic";
import LoginPage from "@/pages/auth";
import Callback from "@/pages/auth/callback";
import ChapterPage from "@/pages/chapter";
import ComicDetail from "@/pages/comicDetail";
import Home from "@/pages/home";
import TrendingPage from "@/pages/trending";
import React, { Suspense, useLayoutEffect } from "react";
import { NavigationType, Outlet, createBrowserRouter, useLocation, useNavigationType } from "react-router-dom";
import MainLayout from "../components/layouts/MainLayout";
import ErrorPage from "../pages/error";
import NotFoundPage from "../pages/error/404";
import CreateChapter from "@/pages/admin/ComicManage/ChapterManage/Create";
const CreateComicPage = React.lazy(() => import("@/pages/admin/ComicManage/CreateComic"));
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
                {
                    path: "test",
                    element: <Test />,
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
                    <Suspense fallback={<FallBackLoader />}>
                        <AdminLayout />
                    </Suspense>
                </ScrollToTopWrapper>
            ),
            children: [
                {
                    path: "comic-manage",
                    element: <Outlet />,
                    children: [
                        {
                            path: "create",
                            element: <CreateComicPage />,
                        },
                        {
                            path: "",
                            element: <ComicManage />,
                        },
                        {
                            path: "edit/:comicId",
                            element: (
                                <Suspense fallback={<FallBackLoader />}>
                                    <EditComicPage />
                                </Suspense>
                            ),
                        },
                        {
                            path: "edit/chapters/:comicId",
                            element: (
                                <Suspense fallback={<FallBackLoader />}>
                                    <ChapterManage />
                                </Suspense>
                            ),
                        },
                    ],
                },
                {
                    path: "chapter-manage",
                    element: <Outlet />,
                    children: [
                        {
                            path: "create/:comicId",
                            element: <CreateChapter />,
                        },
                    ],
                },
            ],
        },
        {
            path: "logout",
            element: <Logout />,
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
