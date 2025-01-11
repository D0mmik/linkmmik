export interface Link {
  id?: number;
  userId?: string | null;
  description?: string | null;
  shortUrl?: string | null;
  longUrl?: string | null;
  title?: string | null;
  imageUrl?: string | null;
  favicon? : string | null;
}

export interface Category {
  name: string | null;
  id?: number;
  userId: string | null;
  color: number;
}


export interface Group {
  name: string
}