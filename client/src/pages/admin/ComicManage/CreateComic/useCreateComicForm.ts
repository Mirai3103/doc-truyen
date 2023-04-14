import { useForm } from "@mantine/form";
export function useCreateComicForm(
    initialValues = {
        authorId: "",
        categoryId: "",
        genreIds: [],
        avatarBlob: null,
        thumbBlob: null,
        name: "",
        status: "",
        description: "",
        otherNames: [],
    }
) {
    const form = useForm<IFormValues>({
        initialValues,
    });
    return form;
}

interface IFormValues {
    authorId: string;
    categoryId: string;
    genreIds: string[];
    avatarBlob: Blob | null;
    thumbBlob: Blob | null;
    name: string;
    status: string;
    description: string;
    artistId?: string;
    officeUrl?: string;
    otherNames: string[];
}
