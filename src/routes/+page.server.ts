import type { Actions } from "./$types";
import { compressImage } from "$lib/utils/compression";
import { getFileExtention, getFileMimeType } from "$lib/utils/helpers";
import { redirect } from "@sveltejs/kit";

export const actions: Actions = {
    upload: async ({ request, fetch }) => {
        const formData = await request.formData();

        const encryptionOption = formData.get("encryption") as string;
        const password = encryptionOption === "password" ? formData.get("password") as string : undefined;

        const files = formData.getAll("files") as File[];
        for (const file of files) {
            if (!validateFile(file)) {
                continue;
            }

            // Compress file before uploading
            const buffer = await file.arrayBuffer();
            const compressedBuffer = await compressImage(buffer, getFileExtention(file.name));
            
            // Get file type and mime type
            const fileExtension = getFileExtention(file.name);
            const mimeType = getFileMimeType(fileExtension);

            // Upload file
            const formData = await handleFormData(compressedBuffer, mimeType);
            formData.append('name', file.name);
            const response = await fetch("/api/upload-image", {
                method: "POST",
                body: formData,
            })

            if (response.ok) {
                console.log("File uploaded successfully");
                throw redirect(303, '/');
            } else {
                console.log("File upload failed");
                return {
                    error: "File upload failed",
                }
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

const validateFile = async (file: File) => {
    // Validate file type
    const allowedExtentions = ['jpeg', 'jpg', 'png', 'gif'];
    const fileExtention = getFileExtention(file.name);
    if (!allowedExtentions.includes(fileExtention)) {
        console.log(`Invalid file type: ${file.name}`);
        return false;
    }

    // Validate file size
    const maxFileSize = 5 * 1024 * 1024; // 5MB
    if (file.size > maxFileSize) {
        console.log(`File size exceeds the limit: ${file.name}`);
        return false;
    }

    return true;
}