import { relations } from "drizzle-orm/relations";
import { linkmmikUser, linkmmikSession, linkmmikLinks, linkmmikLinkCategories, linkmmikCategories, linkmmikAccount } from "./schema";

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

export const linkmmikLinkCategoriesRelations = relations(linkmmikLinkCategories, ({one}) => ({
	linkmmikLink: one(linkmmikLinks, {
		fields: [linkmmikLinkCategories.linkId],
		references: [linkmmikLinks.id]
	}),
	linkmmikCategory: one(linkmmikCategories, {
		fields: [linkmmikLinkCategories.categoryId],
		references: [linkmmikCategories.id]
	}),
}));

export const linkmmikLinksRelations = relations(linkmmikLinks, ({many}) => ({
	linkmmikLinkCategories: many(linkmmikLinkCategories),
}));

export const linkmmikCategoriesRelations = relations(linkmmikCategories, ({many}) => ({
	linkmmikLinkCategories: many(linkmmikLinkCategories),
}));

export const linkmmikAccountRelations = relations(linkmmikAccount, ({one}) => ({
	linkmmikUser: one(linkmmikUser, {
		fields: [linkmmikAccount.userId],
		references: [linkmmikUser.id]
	}),
}));