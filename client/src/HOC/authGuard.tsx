import FallBackLoader from "@/components/FallbackLoader";
import { useAppSelector } from "@/redux/hook";
import { Role, selectIsTriedToLogin, selectRole } from "@/redux/userSplice";
import { notifications } from "@mantine/notifications";
import { Navigate } from "react-router-dom";

export function withAuth<T extends JSX.IntrinsicAttributes>(Component: React.FC<T>, role: Role = Role.USER) {
    return (props: T) => {
        const userRole = useAppSelector(selectRole);
        const isTriedToLogin = useAppSelector(selectIsTriedToLogin);
        if (!isTriedToLogin) {
            return <FallBackLoader />;
        }
        if (!userRole) {
            notifications.show({
                title: "Error",
                message: "Vui lòng đăng nhập để tiếp tục",
                color: "red",
            });
            return <Navigate to="/" replace />;
        }
        if (userRole < role) {
            notifications.show({
                title: "Error",
                message: "Bạn không có quyền truy cập",
                color: "red",
            });
            return <Navigate to="/" replace />;
        }
        return <Component {...props} />;
    };
}
