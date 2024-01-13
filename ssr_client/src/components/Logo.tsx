import Image from "next/image";

export default function Logo() {
    return <Image priority src="/logo.png" alt="Logo" width={730} height={100} />;
}
