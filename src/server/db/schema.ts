import { relations, sql } from "drizzle-orm";
import {
  index,
  integer,
  pgTableCreator,
  primaryKey,
  serial,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";
import { type AdapterAccount } from "next-auth/adapters";

export const createTable = pgTableCreator((name) => `linkmmik_${name}`);

export const users = createTable("user", {
  id: varchar("id", { length: 255 })
    .notNull()
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  name: varchar("name", { length: 255 }),
  email: varchar("email", { length: 255 }).notNull(),
  emailVerified: timestamp("email_verified", {
    mode: "date",
    withTimezone: true,
  }).default(sql`CURRENT_TIMESTAMP`),
  image: varchar("image", { length: 255 }),
});

export const accounts = createTable(
  "account",
  {
    userId: varchar("user_id", { length: 255 })
      .notNull()
      .references(() => users.id),
    type: varchar("type", { length: 255 })
      .$type<AdapterAccount["type"]>()
      .notNull(),
    provider: varchar("provider", { length: 255 }).notNull(),
    providerAccountId: varchar("provider_account_id", {
      length: 255,
    }).notNull(),
    refresh_token: text("refresh_token"),
    access_token: text("access_token"),
    expires_at: integer("expires_at"),
    token_type: varchar("token_type", { length: 255 }),
    scope: varchar("scope", { length: 255 }),
    id_token: text("id_token"),
    session_state: varchar("session_state", { length: 255 }),
  },
  (account) => ({
    compoundKey: primaryKey({
      columns: [account.provider, account.providerAccountId],
    }),
    userIdIdx: index("account_user_id_idx").on(account.userId),
  }),
);

export const accountsRelations = relations(accounts, ({ one }) => ({
  user: one(users, { fields: [accounts.userId], references: [users.id] }),
}));

export const sessions = createTable(
  "session",
  {
    sessionToken: varchar("session_token", { length: 255 })
      .notNull()
      .primaryKey(),
    userId: varchar("user_id", { length: 255 })
      .notNull()
      .references(() => users.id),
    expires: timestamp("expires", {
      mode: "date",
      withTimezone: true,
    }).notNull(),
  },
  (session) => ({
    userIdIdx: index("session_user_id_idx").on(session.userId),
  }),
);

export const sessionsRelations = relations(sessions, ({ one }) => ({
  user: one(users, { fields: [sessions.userId], references: [users.id] }),
}));

export const verificationTokens = createTable(
  "verification_token",
  {
    identifier: varchar("identifier", { length: 255 }).notNull(),
    token: varchar("token", { length: 255 }).notNull(),
    expires: timestamp("expires", {
      mode: "date",
      withTimezone: true,
    }).notNull(),
  },
  (vt) => ({
    compoundKey: primaryKey({ columns: [vt.identifier, vt.token] }),
  }),
);

export const links = createTable(
  "links",
  {
    id: serial("id").primaryKey(),
    userId: varchar("userId", { length: 255 }),
    shortUrl: varchar("shortUrl", { length: 255 }),
    longUrl: varchar("longUrl", { length: 255 }),
    title: varchar("title", { length: 255 }),
    description: varchar("description", { length: 1000 }),
    imageUrl: varchar("imageUrl", { length: 255 }),
    favicon: varchar("favicon", { length: 255 }),
    createdAt: timestamp("created_at", {
      mode: "date",
      withTimezone: true,
    }).default(sql`CURRENT_TIMESTAMP`),
    groupId: integer("groupId"),
  },
  (t) => {
    return {
      userIdx: index("userId_idx_links").on(t.userId),
      shortUrlIdx: index("shortUrl_idx_links").on(t.shortUrl)
    }
  }
);

export const categories = createTable("categories", {
  id: serial("id").primaryKey(),
  userId: varchar("userId", { length: 255 }).references(() => users.id),
  name: varchar("name", { length: 100 }),
  color: integer("color"),
},
  (t) => {
    return {
      userIdx: index("userId_idx_categories").on(t.userId)
    }
  }
);

export const tags = createTable("tags", {
  id: serial("id").primaryKey(),
  linkId: integer("linkId"),
  tagId: integer("tagId"),
  userId: varchar("userId", { length: 255 }).references(() => users.id),
},
  (t) => {
    return {
      userIdx: index("userId_idx_tags").on(t.userId)
    }
  }
);

export const groups = createTable("groups", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }),
  description: varchar("description", { length: 255 }),
  creatorId: varchar("creatorId", { length: 255 }).references(() => users.id),
  memberCount: integer("memberCount"),
  joinCode: varchar("joinCode", { length: 20 }),
  createdAt: timestamp("created_at", {
    mode: "date",
    withTimezone: true,
  }).default(sql`CURRENT_TIMESTAMP`),
});

export const groupMembers = createTable("groupMembers", {
  id: serial("id").primaryKey(),
  groupId: integer("groupId").references(() => groups.id),
  memberId: varchar("memberId", { length: 255 }).references(() => users.id),
  createdAt: timestamp("created_at", {
    mode: "date",
    withTimezone: true,
  }).default(sql`CURRENT_TIMESTAMP`),
});
