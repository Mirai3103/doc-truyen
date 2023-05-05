import axios from "axios";
import api from "./axios";

const SERVER_URL = process.env.VITE_SERVER_URL || "http://localhost:3000";
export const getImageUrl = (name: string) => {
    //check if name is a url
    if (name.startsWith("http")) {
        return name;
    }
    return `${SERVER_URL}/file/image/${name}`;
};

export const uploadImage = async (blob: Blob) => {
    const formData = new FormData();
    formData.append("file", blob);
    const response = await api.post(`${SERVER_URL}/file/upload`, formData, {
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
