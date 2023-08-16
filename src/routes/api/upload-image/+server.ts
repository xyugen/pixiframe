import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { generateRandomString, getFileExtention } from '$lib/utils/helpers';

export const POST: RequestHandler = async ({ request, locals: { supabase } }) => {
    try {
        const formData = await request.formData();
        const file = formData.get('file');
        const fileName = formData.get('name');

        if (!(file instanceof File) || fileName === null) {
            return new Response();
        }

        // Generate a random filename to avoid collisions
        const randomDirectory: string = generateRandomString(6);

        const { data, error } = await supabase.storage.from(`images/uploads/${randomDirectory}/`).upload(fileName.toString(), file);

        if (error) {
            return json({
                status: 500,
                body: json({ error: 'Image upload failed' })
            });
        }

        return json({
            status: 200,
            body: json({
                data: data,
                message: 'Image uploaded successfully!'
            })
        });
    } catch (error) {
        return json({
            status: 500,
            body: json({ error: 'An error occurred' })
        });
    }
};
