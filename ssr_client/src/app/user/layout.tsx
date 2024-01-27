import { getAccessToken } from "@/core/utils/server.util";
import { redirect } from "next/navigation";

export default async function UserLayout({ children }: { children: React.ReactNode }) {
    const token = await getAccessToken();
    if (!token) {
        redirect("/");
    }
    return <>{children}</>;
}
