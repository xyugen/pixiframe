import { json } from "@sveltejs/kit";
import type { RequestHandler } from "./$types";

export const POST: RequestHandler = async ({ request, locals: { supabase } }) => {
    try {
        const { image } = await request.json();
        if (!image) {
            return json({
                status: 400,
                body: { error: 'Missing image data' }
            });
        }

        const { data: storageUrl, error: storageError } = await supabase
            .from('images')
            .select('storage_key')
            .eq('url', image);
        if (storageError) {
            return json({
                status: 500,
                body: { error: 'Image not found' }
            });
        }

        const { error } = await supabase
            .from('images')
            .delete()
            .eq('url', image);
        if (error) {
            return json({
                status: 500,
                body: { error: 'Image not found' }
            });
        }

        const { data: imageFile, error: fileError } = await supabase
            .storage
            .from('images')
            .list(`uploads/${storageUrl[0].storage_key}`);
        if (fileError) {
            throw json({
                status: 500,
                body: { error: 'Image not found' }
            });
        }

        const { error: deleteError } = await supabase
            .storage
            .from('images')
            .remove([`uploads/${storageUrl[0].storage_key}/${imageFile[0].name}`]);
        if (deleteError) {
            throw json({
                status: 500,
                body: { error: 'Image not found' }
            });
        }

        return json({
            status: 200,
            body: { success: 'Image has been deleted' }
        });
    } catch (error) {
        console.log(error);
        return json({
            status: 500,
            body: { error: 'An error occurred' }
        });
    }
};
