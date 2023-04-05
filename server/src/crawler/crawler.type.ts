export interface IManga {
  id: number;
  name: string;
  cover_url: string;
  cover_mobile_url: string;
  panorama_url: string;
  panorama_mobile_url: string;
  newest_chapter_number: string;
  newest_chapter_id: number;
  newest_chapter_created_at: string;
  author: IAuthor;
  description: string;
  full_description: any;
  official_url: string;
  is_region_limited: boolean;
  is_ads: boolean;
  chapters_count: number;
  views_count: number;
  team: ITeam;
  is_following: boolean;
  titles: ITitle[];
  created_at: string;
  updated_at: string;
}

export interface IAuthor {
  name: string;
}

export interface ITeam {
  id: number;
  name: string;
  description: string;
  is_ads: boolean;
  facebook_address: string;
  views_count: number;
  translations_count: number;
  created_at: string;
  updated_at: string;
}

export interface ITitle {
  id: number;
  name: string;
  primary: boolean;
}

export interface IPreviewManga {
  id: number;
  name: string;
  cover_url: string;
  cover_mobile_url: string;
  newest_chapter_number: string;
  newest_chapter_id: number;
  newest_chapter_created_at: string;
}

export interface IChapter {
  id: number;
  order: number;
  number: string;
  name: string;
  views_count: number;
  comments_count: number;
  status: string;
  previous_chapter_id: number;
  previous_chapter_number: string;
  previous_chapter_name: string;
  next_chapter_id: any;
  next_chapter_number: any;
  next_chapter_name: any;
  created_at: string;
  updated_at: string;
  pages: IPage[];
}

export interface IPage {
  id: number;
  order: number;
  width: number;
  height: number;
  status: string;
  image_url: string;
  image_url_size: number;
  drm_data: string;
}

export interface IChapterPreview {
  id: number;
  order: number;
  number: string;
  name: any;
  views_count: number;
  comments_count: number;
  status: string;
  created_at: string;
  updated_at: string;
}
