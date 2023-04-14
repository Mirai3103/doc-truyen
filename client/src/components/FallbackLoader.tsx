import { LoadingOverlay } from "@mantine/core";

export default function FallBackLoader() {
    return (
        <div className="w-screen h-screen">
            <LoadingOverlay visible={true} overlayBlur={2} />
        </div>
    );
}
