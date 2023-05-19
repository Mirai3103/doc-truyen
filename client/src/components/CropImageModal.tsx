import { Button, Group, Modal, Stack } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import React, { useState } from "react";
import ReactCrop, { PixelCrop } from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
interface CroperProps {
    aspect: number;
    onCancel: () => void;
    onCrop: (croppedAreaPixels: PixelCrop | null) => void;
    opened: boolean;
    src: string;
    onClose: () => void;
}

export default function CropImageModal({ src, aspect, onClose, onCrop, onCancel, opened }: CroperProps) {
    const [croppedArea, setCroppedArea] = useState<PixelCrop>();

    const onCropClick = () => {
        if (croppedArea === undefined) {
            notifications.show({
                title: "Lỗi",
                message: "Vui chọn vùng cần cắt",
                color: "red",
            });
            return;
        }
        const scaleX = imgRef.current!.naturalWidth / imgRef.current!.width || 1;
        const scaleY = imgRef.current!.naturalHeight / imgRef.current!.height || 1;
        onCrop(
            {
                height: croppedArea!.height * scaleY,
                width: croppedArea!.width * scaleX,
                unit: "px",
                x: croppedArea!.x * scaleX,
                y: croppedArea!.y * scaleY,
            }!
        );
        onClose();
    };
    React.useEffect(() => {
        setCroppedArea(undefined);
    }, [src]);
    const imgRef = React.useRef<HTMLImageElement>(null);
    return (
        <Modal opened={opened} size={"xl"} onClose={onCancel} title="Cắt ảnh" centered>
            <Stack>
                <div className="h-96 mb-16 p-4 flex justify-center items-center">
                    <ReactCrop aspect={aspect} crop={croppedArea} onChange={(c) => setCroppedArea(c)}>
                        <img
                            ref={imgRef}
                            className=""
                            style={{
                                maxHeight: "23rem",
                            }}
                            src={src}
                            alt="raw imgae"
                        />
                    </ReactCrop>
                </div>
                <Group position="right">
                    <Button size="md" variant="outline" color="red" onClick={onCancel}>
                        Huỷ
                    </Button>
                    <Button size="md" miw={"6rem"} color="blue" onClick={onCropClick}>
                        Cắt
                    </Button>
                </Group>
            </Stack>
        </Modal>
    );
}
