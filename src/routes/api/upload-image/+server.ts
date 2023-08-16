import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { generateRandomString, removeFileExtension } from '$lib/utils/helpers';
import { hashPasswords } from '$lib/utils/passwordHashing';

export const POST: RequestHandler = async ({ request, locals: { supabase } }) => {
    try {
        const formData = await request.formData();
        const file = formData.get('file');
        const fileName = formData.get('name');
        const password = formData.get('password');
        const hashedPassword = password ? await hashPasswords(password.toString()) : null;

        if (!(file instanceof File) || fileName === null) {
            return new Response();
        }

        // Generate random directory
        const randomDirectory = generateRandomString(6);
        // Upload file
        const { data, error } = await supabase.storage
            .from(`images/uploads/${randomDirectory}/`)
            .upload(fileName.toString(), file);
        if (error) {
            return json({
                status: 500,
                body: json({ error: 'Image upload failed' })
            });
        }
        
        // Get image url
        const imageUrl = supabase.storage
            .from(`images/uploads/${randomDirectory}/`)
            .getPublicUrl(fileName.toString());
        // Generate random url
        const randomUrl = generateRandomString(7);
        // Insert image to database
        const { error: insertError } = await supabase.from('images').insert({
            name: removeFileExtension(fileName.toString()),
            password: hashedPassword,
            url: randomUrl,
            storage_key: randomDirectory,
            storage_url: imageUrl.data.publicUrl,
        });

        if (insertError) {
            return json({
                status: 500,
                body: json({ error: 'Image upload failed' })
            });
        }

        return json({
            status: 200,
            body: {
                data: data,
                message: 'Image uploaded successfully!',
                redirectUrl: `/img/${randomUrl}`,
            }
        });
    } catch (error) {
        return json({
            status: 500,
            body: json({ error: 'An error occurred' })
        });
    }
};
