import { supabaseKey, supabaseUrl } from '$lib/utils/constants.js'
import { createSupabaseServerClient } from '@supabase/auth-helpers-sveltekit'

export const handle = async ({ event, resolve}) => {
    event.locals.supabase = createSupabaseServerClient({
        supabaseKey: supabaseKey,
        supabaseUrl: supabaseUrl,
        event,
    })

    event.locals.getSession =async () => {
        const {
            data: { session },
        } = await event.locals.supabase.auth.getSession();
        return session;
    }

    return resolve(event, {
        filterSerializedResponseHeaders(name) {
            return name === 'content-range'
        }
    })
}