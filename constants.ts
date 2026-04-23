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
      <p class="mb-4">Known for its ancient cave dwellings, Matera is a city etched in stone. Once considered the "shame of Italy," it has transformed into a stunning cultural hub and a UNESCO World Heritage site. Walking through the Sassi di Matera feels like stepping back in time.</p>
      
      <h3 class="text-2xl font-bold mt-8 mb-4">2. Sintra, Portugal</h3>
      <p class="mb-4">Just a short train ride from Lisbon, Sintra feels like a page out of a fairy tale. With its colorful Pena Palace and misty forests, it's a magical escape. Don't miss the Quinta da Regaleira with its mysterious initiation wells.</p>
      
      <h3 class="text-2xl font-bold mt-8 mb-4">3. Hallstatt, Austria</h3>
      <p class="mb-4">Nestled between a lake and towering mountains, this village is picture-perfect. While it's gaining popularity, visiting in the shoulder season allows you to enjoy its serenity without the crowds.</p>
      
      <h3 class="text-2xl font-bold mt-8 mb-4">4. Kotor, Montenegro</h3>
      <p class="mb-4">Located in a secluded part of the Gulf of Kotor, this fortified town offers stunning views of the Adriatic Sea. The climb up to the Castle of San Giovanni is steep but worth every step for the panoramic vista.</p>

      <h3 class="text-2xl font-bold mt-8 mb-4">5. Colmar, France</h3>
      <p class="mb-4">Colmar looks like it was plucked straight from a storybook. With its cobblestone streets and half-timbered medieval and early Renaissance buildings, it is the capital of Alsatian wine.</p>

      <p class="mt-8">Exploring these lesser-known destinations not only helps you avoid the crowds but also supports local economies in unique ways. Pack your bags and get ready to discover the Europe most tourists miss.</p>
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
      <p class="mb-4">Traveling alone is one of the most liberating experiences you can have. It forces you out of your comfort zone, encourages you to meet new people, and allows you to move entirely at your own pace. But it can also be intimidating.</p>
      
      <h3 class="text-2xl font-bold mt-8 mb-4">Why Travel Solo?</h3>
      <p class="mb-4">When you're on your own, you're the master of your itinerary. Want to spend three hours in a museum? Go for it. Feel like sleeping in until noon? No one is stopping you. This absolute freedom is addictive and allows for deep self-reflection.</p>
      
      <h3 class="text-2xl font-bold mt-8 mb-4">Safety First</h3>
      <p class="mb-4">While solo travel is rewarding, safety is paramount. Always keep someone informed of your whereabouts. Trust your instincts—if a situation feels off, leave. Research common scams in your destination beforehand and keep digital copies of your important documents.</p>
      
      <h3 class="text-2xl font-bold mt-8 mb-4">Meeting People</h3>
      <p class="mb-4">Ironically, you're rarely alone when you travel solo. Hostels are fantastic for meeting fellow travelers. Walking tours, cooking classes, and pub crawls are also great ways to connect. Don't be afraid to strike up a conversation at a local cafe.</p>
      
      <h3 class="text-2xl font-bold mt-8 mb-4">Dining Alone</h3>
      <p class="mb-4">For many, eating alone is the hardest part. Bring a book or a journal, or sit at the bar where it's easier to chat with the staff or other patrons. Remember, no one is judging you; most people are too focused on their own meals.</p>

      <p class="mt-8">Solo travel teaches you resilience and confidence. It shows you that you are capable of navigating the world on your own terms. So, take the plunge. Book that ticket. The world is waiting for you.</p>
    `,
    author: 'Mike Ross',
    date: '2023-11-02',
    image: 'https://picsum.photos/800/601',
    tags: ['Solo Travel', 'Guide', 'Lifestyle']
  }
];

export const INITIAL_PACKAGES: TravelPackage[] = [
  {
    id: '1',
    title: 'Bali Bliss Retreat',
    description: '7 days of yoga, surf, and sun in beautiful Bali.',
    price: 1299,
    duration: '7 Days',
    image: 'https://picsum.photos/600/400',
    rating: 4.8,
    location: 'Bali, Indonesia'
  },
  {
    id: '2',
    title: 'Parisian Romance',
    description: 'A romantic getaway in the city of lights.',
    price: 2499,
    duration: '5 Days',
    image: 'https://picsum.photos/600/401',
    rating: 4.9,
    location: 'Paris, France'
  },
  {
    id: '3',
    title: 'Safari Adventure',
    description: 'Witness the big five in their natural habitat.',
    price: 3500,
    duration: '10 Days',
    image: 'https://picsum.photos/600/402',
    rating: 5.0,
    location: 'Kenya'
  }
];