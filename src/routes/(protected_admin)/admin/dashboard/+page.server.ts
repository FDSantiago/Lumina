import type { PageServerLoad, Actions } from './$types';
import { getAllReports, updateReportStatus, getReportById } from '$lib/server/db/helpers';
import { redirect } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ locals }) => {
	if (!locals.user) {
		throw redirect(302, '/login');
	}

	const reports = await getAllReports();

	return {
		reports
	};
};

export const actions: Actions = {
	updateStatus: async ({ request, locals }) => {
		if (!locals.user) {
			throw redirect(302, '/login');
		}

		const formData = await request.formData();
		const reportId = formData.get('reportId') as string;
		const status = formData.get('status') as
			| 'new'
			| 'under_review'
			| 'resolved'
			| 'escalated'
			| 'closed';
		const resolutionNotes = formData.get('resolutionNotes') as string;

		if (!reportId || !status) {
			return { success: false, message: 'Missing required fields' };
		}

		await updateReportStatus(reportId, status, resolutionNotes);
		return { success: true };
	}
};
