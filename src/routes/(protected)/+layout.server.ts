import { redirect } from '@sveltejs/kit';
import { getUserWithProfile } from '$lib/server/db/helpers';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ locals, parent }) => {
	const flashData = await parent();

	if (!locals.user) {
		throw redirect(302, '/login');
	}

	const userWithProfile = await getUserWithProfile(locals.user.id);

	return {
		...flashData,
		user: locals.user,
		profile: userWithProfile?.profile ?? null
	};
};
