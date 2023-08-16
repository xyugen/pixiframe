import type { Actions } from "./$types";
import fs from 'fs';
import { compressImage } from "$lib/utils/compression";
import { getFileExtention, getFileMimeType } from "$lib/utils/helpers";

export const actions: Actions = {
    upload: async ({ request, fetch }) => {
        const formData = await request.formData();

        const encryptionOption = formData.get("encryption") as string;
        const password = encryptionOption === "password" ? formData.get("password") as string : undefined;

        const files = formData.getAll("files") as File[];
        for (const file of files) {
            const buffer = await file.arrayBuffer();
            const compressedBuffer = await compressImage(buffer, getFileExtention(file.name));
            
            const fileExtension = getFileExtention(file.name);
            const mimeType = getFileMimeType(fileExtension);

            const formData = await handleFormData(compressedBuffer, mimeType);
            formData.append('name', file.name);
            const response = await fetch("/api/upload-image", {
                method: "POST",
                body: formData,
            })

            if (response.ok) {
                console.log("File uploaded successfully");
            } else {
                console.log("File upload failed");
            }
        }
    }
};

const handleFormData = async (fileBuffer: Buffer, mimeType?: string) => {
    const compressedBlob = new Blob([fileBuffer], { type: mimeType });

    const formData = new FormData();
    formData.append('file', compressedBlob);

    return formData;
}