import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import ListingCard from '@/components/ListingCard';
import { mockListings } from '@/data/mockListings';
import { 
  Search, 
  TrendingUp, 
  Shield, 
  Zap, 
  DollarSign, 
  Users, 
  BarChart3,
  ArrowRight
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from '@/hooks/use-toast';

const HomePage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const featuredListings = mockListings.slice(0, 6);
  
  const categories = [
    {
      name: 'E-commerce',
      slug: 'ecommerce',
      count: mockListings.filter(l => l.category === 'ecommerce').length,
      icon: '🛒',
      description: 'Online stores and retail businesses'
    },
    {
      name: 'SaaS',
      slug: 'saas',
      count: mockListings.filter(l => l.category === 'saas').length,
      icon: '💻',
      description: 'Software as a Service platforms'
    },
    {
      name: 'Content Sites',
      slug: 'content',
      count: mockListings.filter(l => l.category === 'content').length,
      icon: '📝',
      description: 'Blogs, news sites, and content platforms'
    },
    {
      name: 'Marketplaces',
      slug: 'marketplace',
      count: mockListings.filter(l => l.category === 'marketplace').length,
      icon: '🏪',
      description: 'Multi-vendor platforms and marketplaces'
    },
    {
      name: 'Affiliate Sites',
      slug: 'affiliate',
      count: mockListings.filter(l => l.category === 'affiliate').length,
      icon: '🤝',
      description: 'Affiliate marketing and review sites'
    },
    {
      name: 'Other',
      slug: 'other',
      count: mockListings.filter(l => l.category === 'other').length,
      icon: '🚀',
      description: 'Unique business models and opportunities'
    },
  ];

  const stats = [
    { label: 'Active Listings', value: mockListings.length, icon: BarChart3 },
    { label: 'Total Value', value: '$2.5M+', icon: DollarSign },
    { label: 'Successful Sales', value: '150+', icon: TrendingUp },
    { label: 'Active Buyers', value: '1,200+', icon: Users },
  ];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/browse?search=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const handleAddToWatchlist = (listingId: string) => {
    toast({
      title: "Added to watchlist",
      description: "The listing has been added to your watchlist.",
    });
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 via-purple-600 to-blue-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Buy & Sell
              <span className="block bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
                Digital Businesses
              </span>
            </h1>
            <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
              The world's largest marketplace for buying and selling websites, domains, apps, and digital businesses. 
              Find your next investment opportunity or sell your digital asset today.
            </p>
            
            {/* Search Bar */}
            <form onSubmit={handleSearch} className="max-w-2xl mx-auto mb-8">
              <div className="relative">
                <Input
                  type="text"
                  placeholder="Search websites, apps, domains..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-12 pr-4 py-4 text-lg bg-white/90 backdrop-blur border-0 rounded-xl"
                />
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <Button 
                  type="submit" 
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-blue-600 hover:bg-blue-700 rounded-lg"
                >
                  Search
                </Button>
              </div>
            </form>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100 font-semibold" asChild>
                <Link to="/browse">Browse All Listings</Link>
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                How It Works
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div key={index} className="text-center">
                  <div className="flex justify-center mb-2">
                    <Icon className="h-8 w-8 text-blue-600" />
                  </div>
                  <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                  <div className="text-sm text-gray-600">{stat.label}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Browse by Category
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Find the perfect digital business in your area of expertise
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((category, index) => (
              <Card key={index} className="hover:shadow-lg transition-all duration-300 group cursor-pointer" asChild>
                <Link to={`/browse?category=${category.slug}`}>
                  <CardContent className="p-6">
                    <div className="flex items-center mb-4">
                      <span className="text-3xl mr-3">{category.icon}</span>
                      <div>
                        <h3 className="text-lg font-semibold group-hover:text-blue-600 transition-colors">
                          {category.name}
                        </h3>
                        <Badge variant="secondary">{category.count} listings</Badge>
                      </div>
                    </div>
                    <p className="text-gray-600 text-sm">{category.description}</p>
                    <div className="flex items-center mt-3 text-blue-600 text-sm font-medium">
                      Browse {category.name.toLowerCase()}
                      <ArrowRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </CardContent>
                </Link>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Listings */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Featured Listings
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Hand-picked opportunities from our marketplace
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {featuredListings.map((listing) => (
              <ListingCard
                key={listing.id}
                listing={listing}
                onAddToWatchlist={handleAddToWatchlist}
              />
            ))}
          </div>
          
          <div className="text-center">
            <Button size="lg" asChild>
              <Link to="/browse">View All Listings</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Why Choose Our Platform?
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              The most trusted marketplace for digital business transactions
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="flex justify-center mb-4">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Shield className="h-6 w-6 text-blue-600" />
                </div>
              </div>
              <h3 className="text-xl font-semibold mb-2">Verified Listings</h3>
              <p className="text-gray-600">
                All listings are thoroughly vetted and verified by our expert team to ensure authenticity and accuracy.
              </p>
            </div>
            
            <div className="text-center">
              <div className="flex justify-center mb-4">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <Zap className="h-6 w-6 text-green-600" />
                </div>
              </div>
              <h3 className="text-xl font-semibold mb-2">Fast Transactions</h3>
              <p className="text-gray-600">
                Streamlined buying process with secure escrow services and quick transfer protocols.
              </p>
            </div>
            
            <div className="text-center">
              <div className="flex justify-center mb-4">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                  <TrendingUp className="h-6 w-6 text-purple-600" />
                </div>
              </div>
              <h3 className="text-xl font-semibold mb-2">Expert Support</h3>
              <p className="text-gray-600">
                Get guidance from our experienced brokers throughout the entire buying or selling process.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Ready to Find Your Next Digital Business?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Join thousands of entrepreneurs who have found success through our platform.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100 font-semibold" asChild>
              <Link to="/browse">Start Browsing</Link>
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
              Create Account
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;