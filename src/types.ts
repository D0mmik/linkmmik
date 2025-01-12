export interface Link {
  id?: number;
  userId?: string | null;
  description?: string | null;
  shortUrl?: string | null;
  longUrl?: string | null;
  title?: string | null;
  imageUrl?: string | null;
  favicon?: string | null;
  categories?: Category[];
  groupId?: number | null;
}

export interface Category {
  name: string | null;
  id?: number;
  userId: string | null;
  color: number | null;
}

export interface Tag {
  id?: number;
  linkId: number;
  tagId: number;
  userId: string;
}

export interface Group {
  id?: number;
  name: string | null;
  description: string | null;
  creatorId?: string | null;
  memberCount?: number;
  joinCode?: string | null;
}
