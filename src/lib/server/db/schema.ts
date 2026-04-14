import {
	pgTable,
	serial,
	integer,
	text,
	boolean,
	timestamp,
	uuid,
	pgEnum,
	index
} from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';
import { user, session, account, verification } from './auth.schema';
import { user as authUser, session as authSession, account as authAccount } from './auth.schema';

export { user, session, account, verification };

export const task = pgTable('task', {
	id: serial('id').primaryKey(),
	title: text('title').notNull(),
	priority: integer('priority').notNull().default(1)
});

export const userRoleEnum = pgEnum('user_role', ['employee', 'admin']);
export const reportStatusEnum = pgEnum('report_status', [
	'new',
	'under_review',
	'resolved',
	'escalated',
	'closed'
]);
export const severityEnum = pgEnum('severity', [
	'critical',
	'major',
	'moderate',
	'minor',
	'low',
	'info'
]);

export const userProfile = pgTable(
	'user_profile',
	{
		id: uuid('id').primaryKey().defaultRandom(),
		userId: text('user_id')
			.notNull()
			.references(() => authUser.id, { onDelete: 'cascade' }),
		employeeId: text('employee_id').unique(),
		department: text('department'),
		role: userRoleEnum('role').default('employee').notNull(),
		phone: text('phone'),
		createdAt: timestamp('created_at').defaultNow().notNull(),
		updatedAt: timestamp('updated_at').defaultNow().notNull()
	},
	(table) => [
		index('user_profile_user_id_idx').on(table.userId),
		index('user_profile_employee_id_idx').on(table.employeeId)
	]
);

export const report = pgTable(
	'report',
	{
		id: uuid('id').primaryKey().defaultRandom(),
		reportNumber: text('report_number').unique().notNull(),
		userId: text('user_id').references(() => authUser.id, { onDelete: 'set null' }),
		category: text('category').notNull(),
		description: text('description').notNull(),
		severity: severityEnum('severity').default('moderate').notNull(),
		status: reportStatusEnum('status').default('new').notNull(),
		isAnonymous: boolean('is_anonymous').default(false).notNull(),
		incidentDate: timestamp('incident_date'),
		incidentTime: text('incident_time'),
		witnessInfo: text('witness_info'),
		assignedTo: text('assigned_to').references(() => authUser.id, { onDelete: 'set null' }),
		resolutionNotes: text('resolution_notes'),
		createdAt: timestamp('created_at').defaultNow().notNull(),
		updatedAt: timestamp('updated_at').defaultNow().notNull()
	},
	(table) => [
		index('report_user_id_idx').on(table.userId),
		index('report_status_idx').on(table.status),
		index('report_severity_idx').on(table.severity),
		index('report_created_at_idx').on(table.createdAt)
	]
);

export const reportComment = pgTable(
	'report_comment',
	{
		id: uuid('id').primaryKey().defaultRandom(),
		reportId: uuid('report_id')
			.notNull()
			.references(() => report.id, { onDelete: 'cascade' }),
		userId: text('user_id')
			.notNull()
			.references(() => authUser.id, { onDelete: 'cascade' }),
		content: text('content').notNull(),
		createdAt: timestamp('created_at').defaultNow().notNull()
	},
	(table) => [index('report_comment_report_id_idx').on(table.reportId)]
);

export const userNotification = pgTable(
	'user_notification',
	{
		id: uuid('id').primaryKey().defaultRandom(),
		userId: text('user_id')
			.notNull()
			.references(() => authUser.id, { onDelete: 'cascade' }),
		type: text('type').notNull(),
		emailEnabled: boolean('email_enabled').default(true).notNull(),
		pushEnabled: boolean('push_enabled').default(true).notNull(),
		createdAt: timestamp('created_at').defaultNow().notNull(),
		updatedAt: timestamp('updated_at').defaultNow().notNull()
	},
	(table) => [index('user_notification_user_id_idx').on(table.userId)]
);

export const activityLog = pgTable(
	'activity_log',
	{
		id: uuid('id').primaryKey().defaultRandom(),
		userId: text('user_id')
			.notNull()
			.references(() => authUser.id, { onDelete: 'cascade' }),
		action: text('action'),
		ipAddress: text('ip_address'),
		createdAt: timestamp('created_at').defaultNow().notNull()
	},
	(table) => [index('activity_log_user_id_idx').on(table.userId)]
);

export const userRelations = relations(authUser, ({ many, one }) => ({
	sessions: many(authSession),
	accounts: many(authAccount),
	profile: one(userProfile, {
		fields: [authUser.id],
		references: [userProfile.userId]
	}),
	reports: many(report),
	notifications: many(userNotification),
	activities: many(activityLog)
}));

export const sessionRelations = relations(authSession, ({ one }) => ({
	user: one(authUser, { fields: [authSession.userId], references: [authUser.id] })
}));

export const accountRelations = relations(authAccount, ({ one }) => ({
	user: one(authUser, { fields: [authAccount.userId], references: [authUser.id] })
}));

export const reportRelations = relations(report, ({ one, many }) => ({
	user: one(authUser, { fields: [report.userId], references: [authUser.id] }),
	assignedToUser: one(authUser, { fields: [report.assignedTo], references: [authUser.id] }),
	comments: many(reportComment)
}));

export const reportCommentRelations = relations(reportComment, ({ one }) => ({
	report: one(report, { fields: [reportComment.reportId], references: [report.id] }),
	user: one(authUser, { fields: [reportComment.userId], references: [authUser.id] })
}));
