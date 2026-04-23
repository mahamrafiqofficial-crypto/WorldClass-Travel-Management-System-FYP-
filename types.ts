export interface SiteTheme {
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  fontFamilySans: string;
  fontFamilySerif: string;
}

export interface SectionContent {
  id: string;
  type: 'hero' | 'text' | 'features' | 'cta' | 'testimonials';
  title: string;
  subtitle?: string;
  content?: string;
  image?: string;
  buttonText?: string;
  buttonLink?: string;
}

export interface PageData {
  id: string;
  slug: string;
  title: string;
  sections: SectionContent[];
  seoTitle: string;
  seoDescription: string;
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  date: string;
  image: string;
  tags: string[];
}

export interface TravelPackage {
  id: string;
  title: string;
  description: string;
  price: number;
  duration: string;
  image: string;
  rating: number;
  location: string;
}

export interface ContactSubmission {
  id: string;
  name: string;
  email: string;
  message: string;
  date: string;
  status: 'new' | 'read' | 'archived';
}

export interface CMSState {
  theme: SiteTheme;
  pages: Record<string, PageData>; // keyed by slug e.g. 'home', 'about'
  posts: BlogPost[];
  packages: TravelPackage[];
  inquiries: ContactSubmission[];
  token: string | null;
  login: (token: string) => void;
  logout: () => void;
  updateTheme: (theme: Partial<SiteTheme>) => void;
  updatePage: (slug: string, data: Partial<PageData>) => void;
  addPost: (post: BlogPost) => void;
  updatePost: (id: string, post: Partial<BlogPost>) => void;
  deletePost: (id: string) => void;
  addPackage: (pkg: TravelPackage) => void;
  deletePackage: (id: string) => void;
  addInquiry: (inquiry: Omit<ContactSubmission, 'id' | 'date' | 'status'>) => void;
}
