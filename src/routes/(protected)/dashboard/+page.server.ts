import type { PageServerLoad, Actions } from './$types';
import { getReportsByUser, createReport, logActivity } from '$lib/server/db/helpers';
import { redirect } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ locals }) => {
	if (!locals.user) {
		throw redirect(302, '/login');
	}

	const reports = await getReportsByUser(locals.user.id);
	const userProfile = locals.user;

	return {
		user: userProfile,
		reports
	};
};

export const actions: Actions = {
	submitReport: async ({ request, locals, cookies }) => {
		if (!locals.user) {
			throw redirect(302, '/login');
		}

		const formData = await request.formData();
		const category = formData.get('category') as string;
		const description = formData.get('description') as string;
		const severity = formData.get('severity') as
			| 'critical'
			| 'major'
			| 'moderate'
			| 'minor'
			| 'low'
			| 'info';
		const isAnonymous = formData.get('isAnonymous') === 'true';
		const incidentDateStr = formData.get('incidentDate') as string;
		const incidentTime = formData.get('incidentTime') as string;
		const witnessInfo = formData.get('witnessInfo') as string;

		if (!category || !description || !severity) {
			return { success: false, message: 'Missing required fields' };
		}

		const incidentDate = incidentDateStr ? new Date(incidentDateStr) : null;

		const newReport = await createReport({
			userId: isAnonymous ? null : locals.user.id,
			category,
			description,
			severity,
			isAnonymous,
			incidentDate,
			incidentTime: incidentTime || null,
			witnessInfo: witnessInfo || null
		});

		await logActivity(
			locals.user.id,
			`Submitted report #${newReport.reportNumber}`,
			cookies.get('ip')
		);

		return { success: true, report: newReport };
	}
};
