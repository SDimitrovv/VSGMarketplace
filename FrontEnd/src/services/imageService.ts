import { baseApi } from "../utils/baseApi";

const CreateImage = "createImage";
const EditImage = "editImage";
const DeleteImage = "deleteImage";

// const GetImagesTag = "getImagesTag";

const ImageServices = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        [CreateImage]: builder.mutation<string, { id: number, imageForm: FormData }>({
            query: ({ id, imageForm }) => ({
                method: "POST",
                url: '/Picture?productId=' + id,
                body: imageForm,
                responseHandler: (response) => response.text()
            }),
        }),
        [EditImage]: builder.mutation<string, { id: number, imageForm: FormData }>({
            query: ({ id, imageForm }) => ({
                method: "PUT",
                url: "/Picture/" + id,
                body: imageForm,
                responseHandler: (response) => response.text()
            }),
        }),
        [DeleteImage]: builder.mutation<void, number>({
            query: (id) => ({
                method: "DELETE",
                url: "/Picture/" + id,
            }),
        }),
    }),
});

export const {
    useCreateImageMutation,
    useEditImageMutation,
    useDeleteImageMutation
} = ImageServices;
