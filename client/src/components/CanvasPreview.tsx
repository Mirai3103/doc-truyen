import { PixelCrop } from "react-image-crop";

const TO_RADIANS = Math.PI / 180;
function createHiddenImage(src: string) {
    return new Promise<HTMLImageElement>((resolve, reject) => {
        const image = new Image();
        image.src = src;
        image.style.display = "none";
        image.onload = () => resolve(image);
        image.onerror = reject;
    });
}
function createHiddenCanvas() {
    const canvas = document.createElement("canvas");
    canvas.style.display = "none";
    return canvas;
}
export async function canvasPreview(imageSrc: string, crop: PixelCrop, scale = 1, rotate = 0) {
    const image = await createHiddenImage(imageSrc);
    const canvas = createHiddenCanvas();
    document.body.appendChild(image);
    document.body.appendChild(canvas);
    const ctx = canvas.getContext("2d");

    if (!ctx) {
        throw new Error("No 2d context");
    }

    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;

    const pixelRatio = window.devicePixelRatio;

    canvas.width = Math.floor(crop.width * scaleX * pixelRatio);
    canvas.height = Math.floor(crop.height * scaleY * pixelRatio);

    ctx.scale(pixelRatio, pixelRatio);
    ctx.imageSmoothingQuality = "high";

    const cropX = crop.x * scaleX;
    const cropY = crop.y * scaleY;

    const rotateRads = rotate * TO_RADIANS;
    const centerX = image.naturalWidth / 2;
    const centerY = image.naturalHeight / 2;
    ctx.save();
    ctx.translate(-cropX, -cropY);
    ctx.translate(centerX, centerY);
    ctx.rotate(rotateRads);
    ctx.scale(scale, scale);
    ctx.translate(-centerX, -centerY);
    ctx.drawImage(image, 0, 0, image.naturalWidth, image.naturalHeight, 0, 0, image.naturalWidth, image.naturalHeight);
    ctx.restore();
    // get blob from canvas
    const blob = await new Promise<Blob | null>((resolve) => {
        canvas.toBlob((blob) => {
            resolve(blob);
        });
    });
    return blob;
}
