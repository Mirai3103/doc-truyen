import { useFilePreviewUrl } from "@/hook/useFilePreviewUrl";
import { Flex, Group, Text, UnstyledButton, rem, useMantineTheme } from "@mantine/core";
import { Dropzone, IMAGE_MIME_TYPE } from "@mantine/dropzone";
import { notifications } from "@mantine/notifications";
import { IconPhoto, IconSquareX, IconUpload, IconX } from "@tabler/icons-react";
import React from "react";
import { PixelCrop } from "react-image-crop";
import { canvasPreview } from "./CanvasPreview";
import CropImageModal from "./CropImageModal";
interface DragDropFileProps {
    title: string;
    description: string;
    w?: string;
    h?: string;
    withCrop?: boolean;
    aspect?: number;
    onChange?: (blob: Blob | null) => void;
}

export default function DragDropImage({
    title,
    description,
    w = "200px",
    h = "300px",
    aspect = 2 / 3,
    withCrop = false,
    onChange,
}: DragDropFileProps) {
    const theme = useMantineTheme();
    const [isOpenedCroper, setIsOpenedCroper] = React.useState(false);
    const [rawImageUrl, setFile] = useFilePreviewUrl();
    const [croppedImage, setCroppedImage] = React.useState<PixelCrop | null>(null);

    const imgRef = React.useRef<HTMLImageElement>(null);
    const onCrop = (croppedAreaPixels: PixelCrop | null) => {
        setCroppedImage(croppedAreaPixels);
        console.log(croppedAreaPixels);
    };
    const onClose = () => {
        setIsOpenedCroper(false);
    };
    const onCancel = () => {
        setIsOpenedCroper(false);
        setFile(null);
        setCroppedImage(null);
    };
    React.useEffect(() => {
        if (croppedImage && rawImageUrl !== "") {
            canvasPreview(rawImageUrl, croppedImage, 1, 0).then((blob) => {
                const reader = new FileReader();
                reader.readAsDataURL(blob!);
                reader.onloadend = () => {
                    const base64data = reader.result;
                    imgRef.current!.src = base64data as string;
                };

                onChange && onChange(blob);
            });
        }
    }, [croppedImage, rawImageUrl, onChange]);

    return (
        <>
            {withCrop && (
                <CropImageModal
                    aspect={aspect}
                    src={rawImageUrl}
                    opened={isOpenedCroper && !!rawImageUrl}
                    onCancel={onCancel}
                    onClose={onClose}
                    onCrop={onCrop}
                />
            )}
            {!croppedImage ? (
                <Dropzone
                    onDrop={(files) => {
                        setFile(files[0]);
                        setIsOpenedCroper(true);
                    }}
                    onReject={() => {
                        notifications.show({
                            title: "Lỗi",
                            message: "Ảnh không hợp lệ",
                            color: "red",
                        });
                    }}
                    w={w}
                    h={h}
                    accept={IMAGE_MIME_TYPE}
                >
                    <Group position="center" spacing="xl" style={{ minHeight: rem(220), pointerEvents: "none" }}>
                        <Dropzone.Accept>
                            <IconUpload
                                size="3.2rem"
                                stroke={1.5}
                                color={theme.colors[theme.primaryColor][theme.colorScheme === "dark" ? 4 : 6]}
                            />
                        </Dropzone.Accept>
                        <Dropzone.Reject>
                            <IconX
                                size="3.2rem"
                                stroke={1.5}
                                color={theme.colors.red[theme.colorScheme === "dark" ? 4 : 6]}
                            />
                        </Dropzone.Reject>
                        <Dropzone.Idle>
                            <IconPhoto size="3.2rem" stroke={1.5} />
                        </Dropzone.Idle>

                        <div>
                            <Text align="center" size="xl" inline>
                                {title}
                            </Text>
                            <Text align="center" size="sm" color="dimmed" inline mt={7}>
                                {description}
                            </Text>
                        </div>
                    </Group>
                </Dropzone>
            ) : (
                <Flex
                    w={w}
                    h={h}
                    justify="center"
                    align="center"
                    className={`border-dashed relative border-[1px] ${
                        theme.colorScheme === "light" ? "border-gray-600" : "border-gray-100"
                    }`}
                >
                    <img ref={imgRef} src={""} alt="preview" className="w-full h-full object-cover" />
                    <UnstyledButton
                        className="absolute bg-transparent cursor-pointer -top-3 -right-3 "
                        onClick={onCancel}
                    >
                        <IconSquareX color={theme.colors.red[theme.colorScheme === "dark" ? 4 : 6]} size="1.5rem" />
                    </UnstyledButton>
                </Flex>
            )}
        </>
    );
}