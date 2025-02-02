import { pgTable, varchar, timestamp, index, foreignKey, serial, integer, primaryKey, text } from "drizzle-orm/pg-core"
  import { sql } from "drizzle-orm"




export const linkmmikUser = pgTable("linkmmik_user", {
	id: varchar("id", { length: 255 }).primaryKey().notNull(),
	name: varchar("name", { length: 255 }),
	email: varchar("email", { length: 255 }).notNull(),
	emailVerified: timestamp("email_verified", { withTimezone: true, mode: 'string' }).default(sql`CURRENT_TIMESTAMP`),
	image: varchar("image", { length: 255 }),
});

export const linkmmikSession = pgTable("linkmmik_session", {
	sessionToken: varchar("session_token", { length: 255 }).primaryKey().notNull(),
	userId: varchar("user_id", { length: 255 }).notNull(),
	expires: timestamp("expires", { withTimezone: true, mode: 'string' }).notNull(),
},
(table) => {
	return {
		sessionUserIdIdx: index("session_user_id_idx").using("btree", table.userId.asc().nullsLast()),
		linkmmikSessionUserIdLinkmmikUserIdFk: foreignKey({
			columns: [table.userId],
			foreignColumns: [linkmmikUser.id],
			name: "linkmmik_session_user_id_linkmmik_user_id_fk"
		}),
	}
});

export const linkmmikCategories = pgTable("linkmmik_categories", {
	id: serial("id").primaryKey().notNull(),
	userId: varchar("userId", { length: 255 }),
	name: varchar("name", { length: 100 }),
	color: integer("color"),
});

export const linkmmikTags = pgTable("linkmmik_tags", {
	id: serial("id").notNull(),
	linkId: integer("linkId"),
	tagId: integer("tagId"),
	userId: varchar("userId", { length: 255 }),
});

export const linkmmikGroupMembers = pgTable("linkmmik_groupMembers", {
	id: serial("id").notNull(),
	groupId: integer("groupId"),
	memberId: varchar("memberId", { length: 255 }),
	createdAt: timestamp("created_at", { withTimezone: true, mode: 'string' }).default(sql`CURRENT_TIMESTAMP`),
});

export const linkmmikGroups = pgTable("linkmmik_groups", {
	id: serial("id").notNull(),
	name: varchar("name", { length: 255 }),
	description: varchar("description", { length: 255 }),
	creatorId: varchar("creatorId", { length: 255 }),
	memberCount: integer("memberCount"),
	createdAt: timestamp("created_at", { withTimezone: true, mode: 'string' }).default(sql`CURRENT_TIMESTAMP`),
	joinCode: varchar("joinCode", { length: 20 }),
});

export const linkmmikLinks = pgTable("linkmmik_links", {
	id: serial("id").notNull(),
	userId: varchar("userId", { length: 255 }),
	shortUrl: varchar("shortUrl", { length: 255 }),
	longUrl: varchar("longUrl", { length: 255 }),
	title: varchar("title", { length: 255 }),
	description: varchar("description", { length: 1000 }),
	imageUrl: varchar("imageUrl", { length: 255 }),
	favicon: varchar("favicon", { length: 255 }),
	createdAt: timestamp("created_at", { withTimezone: true, mode: 'string' }).default(sql`CURRENT_TIMESTAMP`),
	groupId: integer("groupId"),
});

export const linkmmikVerificationToken = pgTable("linkmmik_verification_token", {
	identifier: varchar("identifier", { length: 255 }).notNull(),
	token: varchar("token", { length: 255 }).notNull(),
	expires: timestamp("expires", { withTimezone: true, mode: 'string' }).notNull(),
},
(table) => {
	return {
		linkmmikVerificationTokenIdentifierTokenPk: primaryKey({ columns: [table.identifier, table.token], name: "linkmmik_verification_token_identifier_token_pk"}),
	}
});

export const linkmmikAccount = pgTable("linkmmik_account", {
	userId: varchar("user_id", { length: 255 }).notNull(),
	type: varchar("type", { length: 255 }).notNull(),
	provider: varchar("provider", { length: 255 }).notNull(),
	providerAccountId: varchar("provider_account_id", { length: 255 }).notNull(),
	refreshToken: text("refresh_token"),
	accessToken: text("access_token"),
	expiresAt: integer("expires_at"),
	tokenType: varchar("token_type", { length: 255 }),
	scope: varchar("scope", { length: 255 }),
	idToken: text("id_token"),
	sessionState: varchar("session_state", { length: 255 }),
},
(table) => {
	return {
		accountUserIdIdx: index("account_user_id_idx").using("btree", table.userId.asc().nullsLast()),
		linkmmikAccountUserIdLinkmmikUserIdFk: foreignKey({
			columns: [table.userId],
			foreignColumns: [linkmmikUser.id],
			name: "linkmmik_account_user_id_linkmmik_user_id_fk"
		}),
		linkmmikAccountProviderProviderAccountIdPk: primaryKey({ columns: [table.provider, table.providerAccountId], name: "linkmmik_account_provider_provider_account_id_pk"}),
	}
});