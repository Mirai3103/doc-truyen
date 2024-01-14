import Image from "next/image";

export default function Logo() {
    return <Image priority src="/logo.png" alt="Logo" width="0" height="0" sizes="100vw" className="h-full w-auto" />;
}
