import axios from "axios";
import api from "./axios";

const SERVER_URL = "/api";
export const getImageUrl = (name: string) => {
    //check if name is a url
    if (name.startsWith("http")) {
        return name;
    }
    return `${SERVER_URL}/file/image/${name}`;
};

export const uploadImage = async (blob: Blob) => {
    if (!blob) {
        return "";
    }
    const formData = new FormData();
    formData.append("file", blob);
    const response = await api.post(`/file/upload`, formData, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });
    return response.data.url;
};

export const getBlob = async (url: string) => {
    //image/jpeg
    const response = await axios.get(url, {
        responseType: "arraybuffer",
    });
    const blob = new Blob([response.data], {
        type: response.headers["content-type"] || "image/jpeg",
    });
    return blob;
};

export const uploadImages = async (files: File[]) => {
    const formData = new FormData();
    files.forEach((file) => {
        formData.append("files", file);
    });
    const response = await api.post(`/file/uploads`, formData, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });
    return response.data as {
        url: string;
    }[];
};

export function blobToBase64(blob: Blob): Promise<string> {
    return new Promise((resolve, _) => {
        const reader = new FileReader();
        reader.onloadend = () => {
            resolve(reader.result as any);
        };
        reader.readAsDataURL(blob);
    });
}
