import { PageData, SiteTheme, BlogPost, TravelPackage } from './types';

export const DEFAULT_THEME: SiteTheme = {
  primaryColor: '#0f172a',
  secondaryColor: '#3b82f6',
  accentColor: '#f59e0b',
  fontFamilySans: 'Inter',
  fontFamilySerif: 'Playfair Display',
};

export const INITIAL_PAGES: Record<string, PageData> = {
  home: {
    id: 'home',
    slug: 'home',
    title: 'Home',
    seoTitle: 'WorldClass Travel - Explore the World',
    seoDescription: 'Premium travel agency offering exclusive deals and unforgettable experiences.',
    sections: [
      {
        id: 'hero',
        type: 'hero',
        title: 'Discover Your Next Adventure',
        subtitle: 'Experience the world like never before with our exclusive travel packages.',
        image: 'https://picsum.photos/1920/1080',
        buttonText: 'Explore Destinations',
        buttonLink: '#destinations'
      },
      {
        id: 'intro',
        type: 'text',
        title: 'Why Choose WorldClass?',
        content: 'We provide top-tier travel planning services, ensuring every detail of your journey is perfect. From flights to luxury stays, we handle it all.',
      },
      {
        id: 'cta-home',
        type: 'cta',
        title: 'Ready to fly?',
        subtitle: 'Book your consultation today and get 10% off your first trip.',
        buttonText: 'Contact Us',
        buttonLink: '#contact'
      }
    ]
  },
  about: {
    id: 'about',
    slug: 'about',
    title: 'About Us',
    seoTitle: 'About WorldClass Travel',
    seoDescription: 'Learn about our history and mission.',
    sections: [
      {
        id: 'about-hero',
        type: 'hero',
        title: 'Our Story',
        subtitle: 'From humble beginnings to a global agency.',
        image: 'https://picsum.photos/1920/600',
        buttonText: 'Read Our Full Story',
        buttonLink: '/our-story'
      },
      {
        id: 'mission',
        type: 'text',
        title: 'Our Mission',
        content: 'To make travel accessible, luxurious, and worry-free for everyone. We believe in connecting cultures and creating memories.',
      }
    ]
  },
  ourStory: {
    id: 'our-story',
    slug: 'our-story',
    title: 'Our Journey',
    seoTitle: 'The WorldClass Story - Our History',
    seoDescription: 'Discover the history of WorldClass Travel from 1995 to today.',
    sections: [
      {
        id: 'story-hero',
        type: 'hero',
        title: 'A Journey Through Time',
        subtitle: 'Decades of excellence in exploring the globe.',
        image: 'https://picsum.photos/1920/1082',
      },
      {
        id: 'story-1995',
        type: 'text',
        title: '1995: The Spark',
        content: 'It all started in a small coffee shop in London. Our founder, Eleanor Rigby, sketched out a plan to help people see the world not as tourists, but as travelers. With a single desk and a passion for adventure, WorldClass was born.',
      },
      {
        id: 'story-2005',
        type: 'text',
        title: '2005: Going Global',
        content: 'By 2005, we had expanded to 10 countries. We launched our signature "Hidden Gems" packages which revolutionized how our clients experienced Europe, moving away from crowded hotspots to authentic local experiences.',
      },
      {
        id: 'story-present',
        type: 'text',
        title: 'Today & Beyond',
        content: 'Now, with over 500 agents worldwide and partnerships with the most exclusive resorts, we continue to push the boundaries of luxury and adventure travel. Our mission remains the same: create unforgettable memories.',
      }
    ]
  },
  services: {
    id: 'services',
    slug: 'services',
    title: 'Services',
    seoTitle: 'Our Services - WorldClass Travel',
    seoDescription: 'Visa assistance, flight booking, hotel reservations and more.',
    sections: [
      {
        id: 'services-hero',
        type: 'hero',
        title: 'World-Class Services',
        subtitle: 'Everything you need for a perfect trip.',
        image: 'https://picsum.photos/1920/601',
      }
    ]
  },
  contact: {
    id: 'contact',
    slug: 'contact',
    title: 'Contact',
    seoTitle: 'Contact Us',
    seoDescription: 'Get in touch with our agents.',
    sections: []
  }
};

export const INITIAL_POSTS: BlogPost[] = [
  {
    id: '1',
    title: 'Top 10 Hidden Gems in Europe',
    excerpt: 'Discover the places the tourists miss. From Italian caves to Portuguese castles, explore the road less traveled.',
    content: `
      <p class="mb-4">Europe is renowned for its iconic cities like Paris, Rome, and London. However, beyond the bustling capitals lie enchanting towns and secret spots that offer a more authentic experience. Here are our top picks for European hidden gems that you absolutely must visit.</p>
      <h3 class="text-2xl font-bold mt-8 mb-4">1. Matera, Italy</h3>
      <p class="mb-4">Known for its ancient cave dwellings, Matera is a city etched in stone. Once considered the "shame of Italy," it has transformed into a stunning cultural hub and a UNESCO World Heritage site.</p>
      <h3 class="text-2xl font-bold mt-8 mb-4">2. Sintra, Portugal</h3>
      <p class="mb-4">Just a short train ride from Lisbon, Sintra feels like a page out of a fairy tale. With its colorful Pena Palace and misty forests, it's a magical escape.</p>
      <h3 class="text-2xl font-bold mt-8 mb-4">3. Hallstatt, Austria</h3>
      <p class="mb-4">Nestled between a lake and towering mountains, this village is picture-perfect.</p>
    `,
    author: 'Sarah Jenkins',
    date: '2023-10-15',
    image: 'https://picsum.photos/800/600',
    tags: ['Europe', 'Travel Tips', 'Hidden Gems']
  },
  {
    id: '2',
    title: 'A Guide to Solo Travel: Embracing the Adventure',
    excerpt: 'How to travel alone and love it. Tips on safety, meeting people, and finding yourself.',
    content: `
      <p class="mb-4">Traveling alone is one of the most liberating experiences you can have. It forces you out of your comfort zone and allows you to move entirely at your own pace.</p>
      <h3 class="text-2xl font-bold mt-8 mb-4">Why Travel Solo?</h3>
      <p class="mb-4">When you're on your own, you're the master of your itinerary. This absolute freedom is addictive and allows for deep self-reflection.</p>
      <h3 class="text-2xl font-bold mt-8 mb-4">Safety First</h3>
      <p class="mb-4">Always keep someone informed of your whereabouts. Trust your instincts and research common scams in your destination beforehand.</p>
    `,
    author: 'Mike Ross',
    date: '2023-11-02',
    image: 'https://picsum.photos/800/601',
    tags: ['Solo Travel', 'Guide', 'Lifestyle']
  }
];

export const INITIAL_PACKAGES: TravelPackage[] = [
  {
    id: '69e9f945fcb7bf555a7cf2df',
    title: 'Paris Luxury Tour',
    description: '5 days exploring the city of lights',
    price: 1500,
    duration: '5 Days',
    image: 'https://images.unsplash.com/photo-1499856871958-5b9627545d1a?w=800',
    rating: 5,
    location: 'Paris, France'
  },
  {
    id: '69e9fa46fcb7bf555a7cf2e0',
    title: 'Maldives Beach Escape',
    description: 'Relax in overwater bungalows surrounded by crystal clear waters and white sandy beaches in the beautiful Maldives.',
    price: 3200,
    duration: '7 Days',
    image: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=800',
    rating: 5,
    location: 'Maldives'
  },
  {
    id: '69e9faaafcb7bf555a7cf2e1',
    title: 'Dubai City Explorer',
    description: 'Discover the ultramodern city of Dubai. Visit Burj Khalifa, desert safari, and world-class shopping malls.',
    price: 1200,
    duration: '4 Days',
    image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800',
    rating: 5,
    location: 'Dubai, UAE'
  }
];