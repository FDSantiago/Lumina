import type { PageServerLoad, Actions } from './$types';
import {
	getUserWithProfile,
	getActivityLog,
	updateNotificationSettings,
	changeUserPassword,
	logActivity,
	createOrUpdateUserProfile
} from '$lib/server/db/helpers';
import { redirect } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ locals }) => {
	if (!locals.user) {
		throw redirect(302, '/login');
	}

	const userWithProfile = await getUserWithProfile(locals.user.id);
	const activities = await getActivityLog(locals.user.id);

	return {
		user: userWithProfile,
		activities
	};
};

export const actions: Actions = {
	updateProfile: async ({ request, locals }) => {
		if (!locals.user) {
			throw redirect(302, '/login');
		}

		const formData = await request.formData();
		const employeeId = formData.get('employeeId') as string;
		const department = formData.get('department') as string;
		const phone = formData.get('phone') as string;

		await createOrUpdateUserProfile(locals.user.id, {
			employeeId,
			department,
			phone
		});

		await logActivity(locals.user.id, 'Updated profile information');
		return { success: true, message: 'Profile updated successfully' };
	},

	updatePassword: async ({ request, locals }) => {
		if (!locals.user) {
			throw redirect(302, '/login');
		}

		const formData = await request.formData();
		const currentPassword = formData.get('currentPassword') as string;
		const newPassword = formData.get('newPassword') as string;
		const confirmPassword = formData.get('confirmPassword') as string;

		if (!newPassword || newPassword !== confirmPassword) {
			return { success: false, message: 'Passwords do not match' };
		}

		if (newPassword.length < 8) {
			return { success: false, message: 'Password must be at least 8 characters' };
		}

		await changeUserPassword(currentPassword, newPassword);
		await logActivity(locals.user.id, 'Changed password');
		return { success: true, message: 'Password updated successfully' };
	},

	updateNotifications: async ({ request, locals }) => {
		if (!locals.user) {
			throw redirect(302, '/login');
		}

		const formData = await request.formData();
		const type = formData.get('type') as string;
		const emailEnabled = formData.get('emailEnabled') === 'true';
		const pushEnabled = formData.get('pushEnabled') === 'true';

		await updateNotificationSettings(locals.user.id, type, { emailEnabled, pushEnabled });
		return { success: true };
	}
};
