import { WebsiteListing } from '@/types/listing';

export const mockListings: WebsiteListing[] = [
  {
    id: '1',
    title: 'Profitable E-commerce Store - Home & Garden Niche',
    description: 'Established online store selling home and garden products with consistent revenue growth over 3 years.',
    url: 'homegardenstore.com',
    price: 75000,
    currentBid: 72000,
    buyNowPrice: 85000,
    monthlyRevenue: 12500,
    monthlyProfit: 4200,
    monthlyPageviews: 45000,
    age: 36,
    category: 'ecommerce',
    technologies: ['Shopify', 'Google Analytics', 'Facebook Pixel', 'Mailchimp'],
    auctionEndDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
    isVerified: true,
    sellerRating: 4.8,
    images: [
      'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800',
      'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800'
    ],
    metrics: {
      revenue12Month: 150000,
      profit12Month: 50400,
      pageviews12Month: 540000,
      socialFollowers: 15000,
      emailSubscribers: 8500
    },
    financials: {
      expenses: {
        hosting: 150,
        marketing: 3200,
        other: 800
      },
      revenueStreams: ['Product Sales', 'Affiliate Commissions', 'Sponsored Content']
    },
    bidHistory: [
      { amount: 72000, bidder: 'buyer123', timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000) },
      { amount: 70000, bidder: 'investor_pro', timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000) }
    ],
    watchers: 23
  },
  {
    id: '2',
    title: 'SaaS Tool - Project Management Dashboard',
    description: 'B2B SaaS platform for project management with 200+ active subscribers and growing MRR.',
    url: 'projectdash.io',
    price: 125000,
    monthlyRevenue: 8500,
    monthlyProfit: 6800,
    monthlyPageviews: 12000,
    age: 24,
    category: 'saas',
    technologies: ['React', 'Node.js', 'PostgreSQL', 'Stripe', 'AWS'],
    isVerified: true,
    sellerRating: 4.9,
    images: [
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800',
      'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800'
    ],
    metrics: {
      revenue12Month: 102000,
      profit12Month: 81600,
      pageviews12Month: 144000,
      emailSubscribers: 1200
    },
    financials: {
      expenses: {
        hosting: 300,
        marketing: 1200,
        other: 200
      },
      revenueStreams: ['Monthly Subscriptions', 'Annual Plans', 'Enterprise Licenses']
    },
    watchers: 18
  },
  {
    id: '3',
    title: 'Popular Food Blog with Recipe Database',
    description: 'Established food blog with 500+ recipes, strong social media presence, and multiple revenue streams.',
    url: 'deliciousrecipes.net',
    price: 35000,
    currentBid: 33500,
    monthlyRevenue: 3200,
    monthlyProfit: 2800,
    monthlyPageviews: 85000,
    age: 48,
    category: 'content',
    technologies: ['WordPress', 'Google AdSense', 'Amazon Associates', 'Pinterest'],
    auctionEndDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
    isVerified: true,
    sellerRating: 4.6,
    images: [
      'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800',
      'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800'
    ],
    metrics: {
      revenue12Month: 38400,
      profit12Month: 33600,
      pageviews12Month: 1020000,
      socialFollowers: 45000,
      emailSubscribers: 12000
    },
    financials: {
      expenses: {
        hosting: 50,
        marketing: 200,
        other: 150
      },
      revenueStreams: ['Display Ads', 'Affiliate Marketing', 'Sponsored Posts', 'Email Newsletter']
    },
    bidHistory: [
      { amount: 33500, bidder: 'content_king', timestamp: new Date(Date.now() - 1 * 60 * 60 * 1000) },
      { amount: 32000, bidder: 'blog_buyer', timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000) }
    ],
    watchers: 31
  },
  {
    id: '4',
    title: 'Freelance Marketplace - Creative Services',
    description: 'Niche marketplace connecting creative freelancers with clients, with automated payment processing.',
    url: 'creativefreelance.com',
    price: 95000,
    monthlyRevenue: 6800,
    monthlyProfit: 5100,
    monthlyPageviews: 28000,
    age: 30,
    category: 'marketplace',
    technologies: ['Laravel', 'Vue.js', 'Stripe Connect', 'Redis', 'MySQL'],
    isVerified: false,
    sellerRating: 4.3,
    images: [
      'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800',
      'https://images.unsplash.com/photo-1553877522-43269d4ea984?w=800'
    ],
    metrics: {
      revenue12Month: 81600,
      profit12Month: 61200,
      pageviews12Month: 336000,
      emailSubscribers: 3500
    },
    financials: {
      expenses: {
        hosting: 400,
        marketing: 1000,
        other: 300
      },
      revenueStreams: ['Platform Fees', 'Premium Memberships', 'Featured Listings']
    },
    watchers: 15
  },
  {
    id: '5',
    title: 'Affiliate Marketing Site - Tech Reviews',
    description: 'High-traffic tech review site with strong affiliate commissions from major retailers.',
    url: 'techreviewpro.org',
    price: 42000,
    currentBid: 40500,
    monthlyRevenue: 4800,
    monthlyProfit: 4200,
    monthlyPageviews: 125000,
    age: 18,
    category: 'affiliate',
    technologies: ['WordPress', 'Amazon Associates', 'Best Buy Affiliate', 'Google Analytics'],
    auctionEndDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    isVerified: true,
    sellerRating: 4.7,
    images: [
      'https://images.unsplash.com/photo-1518717758536-85ae29035b6d?w=800',
      'https://images.unsplash.com/photo-1496171367470-9ed9a91ea931?w=800'
    ],
    metrics: {
      revenue12Month: 57600,
      profit12Month: 50400,
      pageviews12Month: 1500000,
      socialFollowers: 22000,
      emailSubscribers: 6800
    },
    financials: {
      expenses: {
        hosting: 100,
        marketing: 300,
        other: 200
      },
      revenueStreams: ['Amazon Affiliate', 'Retail Partnerships', 'Display Advertising']
    },
    bidHistory: [
      { amount: 40500, bidder: 'affiliate_master', timestamp: new Date(Date.now() - 30 * 60 * 1000) }
    ],
    watchers: 28
  },
  {
    id: '6',
    title: 'Online Course Platform - Digital Marketing',
    description: 'Comprehensive digital marketing course platform with video content and student community.',
    url: 'digitalmarketingacademy.com',
    price: 180000,
    monthlyRevenue: 15200,
    monthlyProfit: 12800,
    monthlyPageviews: 35000,
    age: 42,
    category: 'other',
    technologies: ['Thinkific', 'WordPress', 'Zoom', 'Slack', 'ConvertKit'],
    isVerified: true,
    sellerRating: 4.9,
    images: [
      'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800',
      'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800'
    ],
    metrics: {
      revenue12Month: 182400,
      profit12Month: 153600,
      pageviews12Month: 420000,
      emailSubscribers: 25000
    },
    financials: {
      expenses: {
        hosting: 200,
        marketing: 1800,
        other: 400
      },
      revenueStreams: ['Course Sales', 'Monthly Memberships', 'Coaching Sessions', 'Affiliate Programs']
    },
    watchers: 42
  }
];