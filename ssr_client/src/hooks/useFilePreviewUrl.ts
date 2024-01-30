import { useEffect, useState } from "react";

export const useFilePreviewUrl = () => {
    const [previewUrl, setPreviewUrl] = useState<string>("");
    const [file, setFile] = useState<File | null>(null);

    useEffect(() => {
        if (!file) {
            setPreviewUrl("");
            return;
        }

        const objectUrl = URL.createObjectURL(file);
        setPreviewUrl(objectUrl);

        return () => URL.revokeObjectURL(objectUrl);
    }, [file]);

    return [previewUrl, setFile] as const;
};
