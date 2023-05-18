export const uploadImage = (e: React.ChangeEvent) => {
    const files = (e.currentTarget as HTMLInputElement).files as FileList;
    const imageUrl = URL.createObjectURL(files[0] as File);
    return imageUrl;
}