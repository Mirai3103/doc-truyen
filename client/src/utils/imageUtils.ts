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
    const response = await axios.get(url, {
        responseType: "blob",
    });
    return response.data;
};
