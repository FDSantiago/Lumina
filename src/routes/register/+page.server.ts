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
		const name = formData.get('name') as string;
		const email = formData.get('email') as string;
		const password = formData.get('password') as string;
		const confirmPassword = formData.get('confirmPassword') as string;

		if (!name || !email || !password) {
			setFlash({ type: 'error', message: 'All fields are required' }, cookies);
			return { success: false };
		}

		if (password !== confirmPassword) {
			setFlash({ type: 'error', message: 'Passwords do not match' }, cookies);
			return { success: false };
		}

		if (password.length < 8) {
			setFlash({ type: 'error', message: 'Password must be at least 8 characters' }, cookies);
			return { success: false };
		}

		try {
			await auth.api.signUpEmail({
				body: { email, password, name }
			});
			setFlash(
				{ type: 'success', message: 'Account created successfully! Please sign in.' },
				cookies
			);
			throw redirect(302, '/login');
		} catch (e) {
			if (e instanceof Response) throw e;
			setFlash(
				{ type: 'error', message: 'Failed to create account. Email may already be in use.' },
				cookies
			);
			return { success: false };
		}
	}
};
