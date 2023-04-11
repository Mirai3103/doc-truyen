import { useForm } from "@mantine/form";
export function useCreateComicForm() {
    const form = useForm<IFormValues>({
        initialValues: {
            authorId: "",
            categoryId: "",
            genreIds: [],
            avatarBlob: null,
            thumbBlob: null,
            name: "",
            status: "",
            description: "",
            otherNames: [],
        },
        validate: {
            avatarBlob: (value) => value === null && "Avatar không được để trống",
            thumbBlob: (value) => value === null && "Ảnh bìa không được để trống",
        },
    });
    return form;
}

interface IFormValues {
    authorId: string;
    categoryId?: string;
    genreIds: string[];
    avatarBlob: Blob | null;
    thumbBlob: Blob | null;
    name: string;
    status: string;
    description: string;
    artist?: string;
    officeUrl?: string;
    otherNames: string[];
}
