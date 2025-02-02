import { relations } from "drizzle-orm/relations";
import { linkmmikUser, linkmmikSession, linkmmikAccount } from "./schema";

export const linkmmikSessionRelations = relations(linkmmikSession, ({one}) => ({
	linkmmikUser: one(linkmmikUser, {
		fields: [linkmmikSession.userId],
		references: [linkmmikUser.id]
	}),
}));

export const linkmmikUserRelations = relations(linkmmikUser, ({many}) => ({
	linkmmikSessions: many(linkmmikSession),
	linkmmikAccounts: many(linkmmikAccount),
}));

export const linkmmikAccountRelations = relations(linkmmikAccount, ({one}) => ({
	linkmmikUser: one(linkmmikUser, {
		fields: [linkmmikAccount.userId],
		references: [linkmmikUser.id]
	}),
}));