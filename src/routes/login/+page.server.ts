import type { PageServerLoad, Actions } from './$types';
import { auth } from '$lib/server/auth';
import { redirect } from '@sveltejs/kit';
import { setFlash } from 'sveltekit-flash-message/server';

export const load: PageServerLoad = async ({ locals }) => {
	if (locals.user) {
		throw redirect(302, '/dashboard');
	}
	return {};
};

export const actions: Actions = {
	default: async ({ request, cookies }) => {
		const formData = await request.formData();
		const email = formData.get('email') as string;
		const password = formData.get('password') as string;
		const intent = formData.get('intent') as string;

		if (!email || !password) {
			setFlash({ type: 'error', message: 'Email and password are required' }, cookies);
			return { success: false };
		}

		try {
			if (intent === 'signup') {
				const name = formData.get('name') as string;
				await auth.api.signUpEmail({
					body: { email, password, name }
				});
			} else {
				await auth.api.signInEmail({
					body: { email, password }
				});
			}
			throw redirect(302, '/dashboard');
		} catch (e) {
			if (e instanceof Response) throw e;
			setFlash({ type: 'error', message: 'Invalid credentials' }, cookies);
			return { success: false };
		}
	}
};
