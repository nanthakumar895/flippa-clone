export interface WebsiteListing {
  id: string;
  title: string;
  description: string;
  url: string;
  price: number;
  currentBid?: number;
  buyNowPrice?: number;
  monthlyRevenue: number;
  monthlyProfit: number;
  monthlyPageviews: number;
  age: number; // in months
  category: 'ecommerce' | 'saas' | 'content' | 'marketplace' | 'affiliate' | 'other';
  technologies: string[];
  auctionEndDate?: Date;
  isVerified: boolean;
  sellerRating: number;
  images: string[];
  metrics: {
    revenue12Month: number;
    profit12Month: number;
    pageviews12Month: number;
    socialFollowers?: number;
    emailSubscribers?: number;
  };
  financials: {
    expenses: {
      hosting: number;
      marketing: number;
      other: number;
    };
    revenueStreams: string[];
  };
  bidHistory?: {
    amount: number;
    bidder: string;
    timestamp: Date;
  }[];
  timeRemaining?: string;
  watchers: number;
}

export interface FilterOptions {
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  minRevenue?: number;
  maxRevenue?: number;
  verified?: boolean;
  sortBy?: 'price' | 'revenue' | 'ending' | 'watchers';
  sortOrder?: 'asc' | 'desc';
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  watchlist: string[];
  bids: string[];
  purchases: string[];
}