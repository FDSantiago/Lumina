import { db } from '$lib/server/db';
import { report, userProfile, userNotification, activityLog, user } from '$lib/server/db/schema';
import { eq, desc, and, sql } from 'drizzle-orm';
import { auth } from '$lib/server/auth';

export async function generateReportNumber(): Promise<string> {
	const count = await db.select({ count: sql<number>`count(*)` }).from(report);
	const nextNum = (count[0]?.count ?? 0) + 1;
	return `REP-${String(nextNum).padStart(6, '0')}`;
}

export async function createReport(data: {
	userId: string | null;
	category: string;
	description: string;
	severity: 'critical' | 'major' | 'moderate' | 'minor' | 'low' | 'info';
	isAnonymous: boolean;
	incidentDate: Date | null;
	incidentTime: string | null;
	witnessInfo: string | null;
}) {
	console.log(data)
	const reportNumber = await generateReportNumber();
	const [newReport] = await db
		.insert(report)
		.values({
			reportNumber,
			userId: data.userId,
			category: data.category,
			description: data.description,
			severity: data.severity,
			isAnonymous: data.isAnonymous,
			incidentDate: data.incidentDate,
			incidentTime: data.incidentTime,
			witnessInfo: data.witnessInfo
		})
		.returning();
	return newReport;
}

export async function getReportsByUser(userId: string) {
	return db
		.select({
			id: report.id,
			reportNumber: report.reportNumber,
			category: report.category,
			description: report.description,
			severity: report.severity,
			status: report.status,
			isAnonymous: report.isAnonymous,
			incidentDate: report.incidentDate,
			incidentTime: report.incidentTime,
			createdAt: report.createdAt
		})
		.from(report)
		.where(eq(report.userId, userId))
		.orderBy(desc(report.createdAt));
}

export async function getAllReports() {
	return db.select().from(report).orderBy(desc(report.createdAt));
}

export async function getReportById(id: string) {
	const [result] = await db.select().from(report).where(eq(report.id, id));
	return result;
}

export async function updateReportStatus(
	id: string,
	status: 'new' | 'under_review' | 'resolved' | 'escalated' | 'closed',
	resolutionNotes?: string
) {
	await db
		.update(report)
		.set({ status, resolutionNotes, updatedAt: new Date() })
		.where(eq(report.id, id));
}

export async function getUserProfile(userId: string) {
	const [profile] = await db.select().from(userProfile).where(eq(userProfile.userId, userId));
	return profile;
}

export async function createOrUpdateUserProfile(
	userId: string,
	data: {
		employeeId?: string;
		department?: string;
		role?: 'employee' | 'admin';
		phone?: string;
	}
) {
	const existing = await getUserProfile(userId);
	if (existing) {
		await db
			.update(userProfile)
			.set({ ...data, updatedAt: new Date() })
			.where(eq(userProfile.userId, userId));
		return db.select().from(userProfile).where(eq(userProfile.userId, userId));
	}
	return db
		.insert(userProfile)
		.values({ userId, ...data })
		.returning();
}

export async function getUserNotifications(userId: string) {
	return db.select().from(userNotification).where(eq(userNotification.userId, userId));
}

export async function updateNotificationSettings(
	userId: string,
	type: string,
	settings: {
		emailEnabled?: boolean;
		pushEnabled?: boolean;
	}
) {
	const existing = await db
		.select()
		.from(userNotification)
		.where(and(eq(userNotification.userId, userId), eq(userNotification.type, type)));

	if (existing.length > 0) {
		await db
			.update(userNotification)
			.set({ ...settings, updatedAt: new Date() })
			.where(and(eq(userNotification.userId, userId), eq(userNotification.type, type)));
	} else {
		await db.insert(userNotification).values({ userId, type, ...settings });
	}
}

export async function logActivity(userId: string, action: string, ipAddress?: string) {
	return db.insert(activityLog).values({ userId, action, ipAddress }).returning();
}

export async function getActivityLog(userId: string, limit = 10) {
	return db
		.select()
		.from(activityLog)
		.where(eq(activityLog.userId, userId))
		.orderBy(desc(activityLog.createdAt))
		.limit(limit);
}

export async function changeUserPassword(currentPassword: string, newPassword: string) {
	await auth.api.changePassword({
		body: { newPassword, currentPassword }
	});
	return true;
}

export async function getUserById(userId: string) {
	const [record] = await db.select().from(user).where(eq(user.id, userId));
	return record;
}

export async function getUserWithProfile(userId: string) {
	const userRecord = await getUserById(userId);
	if (!userRecord) return null;
	const profile = await getUserProfile(userId);
	return { ...userRecord, profile };
}
