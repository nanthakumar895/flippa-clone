import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import ListingCard from '@/components/ListingCard';
import { mockListings } from '@/data/mockListings';
import {
  Heart,
  Gavel,
  ShoppingBag,
  TrendingUp,
  DollarSign,
  Clock,
  Star,
  Eye,
  Calendar,
  Award
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { toast } from '@/hooks/use-toast';

const DashboardPage = () => {
  const [watchlist] = useState(['1', '3', '5']);
  const [activeBids] = useState([
    {
      listingId: '1',
      bidAmount: 72000,
      status: 'leading',
      timeRemaining: '5 days',
      listing: mockListings[0]
    },
    {
      listingId: '3',
      bidAmount: 33500,
      status: 'leading',
      timeRemaining: '2 days',
      listing: mockListings[2]
    }
  ]);
  
  const [purchases] = useState([
    {
      id: 'p1',
      listingTitle: 'Tech Blog - AI & Machine Learning',
      purchasePrice: 45000,
      purchaseDate: new Date('2024-01-15'),
      status: 'completed',
      monthlyRevenue: 3800
    },
    {
      id: 'p2',
      listingTitle: 'E-commerce Store - Electronics',
      purchasePrice: 85000,
      purchaseDate: new Date('2023-11-20'),
      status: 'completed',
      monthlyRevenue: 12500
    }
  ]);

  const watchlistListings = mockListings.filter(listing => watchlist.includes(listing.id));
  
  const stats = {
    totalInvested: purchases.reduce((sum, p) => sum + p.purchasePrice, 0),
    monthlyRevenue: purchases.reduce((sum, p) => sum + p.monthlyRevenue, 0),
    activeBids: activeBids.length,
    watchlistCount: watchlist.length,
    totalROI: purchases.length > 0 ? 
      ((purchases.reduce((sum, p) => sum + p.monthlyRevenue, 0) * 12) / 
       purchases.reduce((sum, p) => sum + p.purchasePrice, 0)) * 100 : 0
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const handleRemoveFromWatchlist = (listingId: string) => {
    toast({
      title: "Removed from watchlist",
      description: "The listing has been removed from your watchlist.",
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'leading':
        return 'bg-green-100 text-green-800';
      case 'outbid':
        return 'bg-red-100 text-red-800';
      case 'completed':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard</h1>
          <p className="text-gray-600">Track your investments, bids, and watchlist</p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <DollarSign className="h-8 w-8 text-green-600" />
                </div>
                <div className="ml-4">
                  <div className="text-2xl font-bold text-gray-900">
                    {formatCurrency(stats.totalInvested)}
                  </div>
                  <div className="text-sm text-gray-600">Total Invested</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <TrendingUp className="h-8 w-8 text-blue-600" />
                </div>
                <div className="ml-4">
                  <div className="text-2xl font-bold text-gray-900">
                    {formatCurrency(stats.monthlyRevenue)}
                  </div>
                  <div className="text-sm text-gray-600">Monthly Revenue</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <Award className="h-8 w-8 text-purple-600" />
                </div>
                <div className="ml-4">
                  <div className="text-2xl font-bold text-gray-900">
                    {stats.totalROI.toFixed(1)}%
                  </div>
                  <div className="text-sm text-gray-600">Annual ROI</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <Gavel className="h-8 w-8 text-orange-600" />
                </div>
                <div className="ml-4">
                  <div className="text-2xl font-bold text-gray-900">
                    {stats.activeBids}
                  </div>
                  <div className="text-sm text-gray-600">Active Bids</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="watchlist" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="watchlist" className="flex items-center gap-2">
              <Heart className="h-4 w-4" />
              Watchlist ({stats.watchlistCount})
            </TabsTrigger>
            <TabsTrigger value="bids" className="flex items-center gap-2">
              <Gavel className="h-4 w-4" />
              Active Bids ({stats.activeBids})
            </TabsTrigger>
            <TabsTrigger value="purchases" className="flex items-center gap-2">
              <ShoppingBag className="h-4 w-4" />
              Purchases ({purchases.length})
            </TabsTrigger>
            <TabsTrigger value="analytics" className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4" />
              Analytics
            </TabsTrigger>
          </TabsList>

          <TabsContent value="watchlist" className="mt-6">
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Heart className="h-5 w-5 text-red-500" />
                    Your Watchlist
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {watchlistListings.length === 0 ? (
                    <div className="text-center py-8">
                      <Heart className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">
                        Your watchlist is empty
                      </h3>
                      <p className="text-gray-600 mb-4">
                        Start watching listings to track their progress and get notified of updates.
                      </p>
                      <Button asChild>
                        <Link to="/browse">Browse Listings</Link>
                      </Button>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {watchlistListings.map((listing) => (
                        <ListingCard
                          key={listing.id}
                          listing={listing}
                          onAddToWatchlist={handleRemoveFromWatchlist}
                        />
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="bids" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Gavel className="h-5 w-5 text-blue-500" />
                  Active Bids
                </CardTitle>
              </CardHeader>
              <CardContent>
                {activeBids.length === 0 ? (
                  <div className="text-center py-8">
                    <Gavel className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      No active bids
                    </h3>
                    <p className="text-gray-600 mb-4">
                      Start bidding on listings to appear here.
                    </p>
                    <Button asChild>
                      <Link to="/browse">Find Auctions</Link>
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {activeBids.map((bid) => (
                      <div key={bid.listingId} className="border border-gray-200 rounded-lg p-4">
                        <div className="flex items-center justify-between mb-4">
                          <Link 
                            to={`/listing/${bid.listingId}`}
                            className="text-lg font-semibold hover:text-blue-600 transition-colors"
                          >
                            {bid.listing.title}
                          </Link>
                          <Badge className={getStatusColor(bid.status)}>
                            {bid.status === 'leading' ? 'Leading' : 'Outbid'}
                          </Badge>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                          <div>
                            <span className="text-gray-600">Your Bid:</span>
                            <div className="font-semibold text-lg text-green-600">
                              {formatCurrency(bid.bidAmount)}
                            </div>
                          </div>
                          <div>
                            <span className="text-gray-600">Current Bid:</span>
                            <div className="font-semibold text-lg">
                              {formatCurrency(bid.listing.currentBid || bid.listing.price)}
                            </div>
                          </div>
                          <div>
                            <span className="text-gray-600 flex items-center">
                              <Clock className="h-3 w-3 mr-1" />
                              Time Remaining:
                            </span>
                            <div className="font-semibold text-orange-600">
                              {bid.timeRemaining}
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex gap-2 mt-4">
                          <Button size="sm" asChild>
                            <Link to={`/listing/${bid.listingId}`}>View Listing</Link>
                          </Button>
                          <Button size="sm" variant="outline">
                            Increase Bid
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="purchases" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <ShoppingBag className="h-5 w-5 text-green-500" />
                  Your Purchases
                </CardTitle>
              </CardHeader>
              <CardContent>
                {purchases.length === 0 ? (
                  <div className="text-center py-8">
                    <ShoppingBag className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      No purchases yet
                    </h3>
                    <p className="text-gray-600 mb-4">
                      Your purchased businesses will appear here.
                    </p>
                    <Button asChild>
                      <Link to="/browse">Start Shopping</Link>
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {purchases.map((purchase) => (
                      <div key={purchase.id} className="border border-gray-200 rounded-lg p-4">
                        <div className="flex items-center justify-between mb-4">
                          <h3 className="text-lg font-semibold">{purchase.listingTitle}</h3>
                          <Badge className={getStatusColor(purchase.status)}>
                            {purchase.status.charAt(0).toUpperCase() + purchase.status.slice(1)}
                          </Badge>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm">
                          <div>
                            <span className="text-gray-600">Purchase Price:</span>
                            <div className="font-semibold text-lg">
                              {formatCurrency(purchase.purchasePrice)}
                            </div>
                          </div>
                          <div>
                            <span className="text-gray-600">Monthly Revenue:</span>
                            <div className="font-semibold text-lg text-green-600">
                              {formatCurrency(purchase.monthlyRevenue)}
                            </div>
                          </div>
                          <div>
                            <span className="text-gray-600">Annual ROI:</span>
                            <div className="font-semibold text-lg text-blue-600">
                              {((purchase.monthlyRevenue * 12 / purchase.purchasePrice) * 100).toFixed(1)}%
                            </div>
                          </div>
                          <div>
                            <span className="text-gray-600 flex items-center">
                              <Calendar className="h-3 w-3 mr-1" />
                              Purchase Date:
                            </span>
                            <div className="font-medium">
                              {purchase.purchaseDate.toLocaleDateString()}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics" className="mt-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Portfolio Performance</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span>Annual ROI</span>
                        <span className="font-medium">{stats.totalROI.toFixed(1)}%</span>
                      </div>
                      <Progress value={Math.min(stats.totalROI, 100)} className="h-2" />
                    </div>
                    
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span>Portfolio Diversification</span>
                        <span className="font-medium">{purchases.length} businesses</span>
                      </div>
                      <Progress value={(purchases.length / 10) * 100} className="h-2" />
                    </div>
                    
                    <div className="pt-4 border-t">
                      <h4 className="font-medium mb-2">Quick Stats</h4>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <div className="text-gray-600">Avg. Purchase Price</div>
                          <div className="font-semibold">
                            {purchases.length > 0 ? formatCurrency(stats.totalInvested / purchases.length) : '$0'}
                          </div>
                        </div>
                        <div>
                          <div className="text-gray-600">Avg. Monthly Revenue</div>
                          <div className="font-semibold">
                            {purchases.length > 0 ? formatCurrency(stats.monthlyRevenue / purchases.length) : '$0'}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Market Activity</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                      <div className="flex items-center">
                        <Eye className="h-4 w-4 text-blue-600 mr-2" />
                        <span className="text-sm">Listings Viewed</span>
                      </div>
                      <span className="font-semibold">47</span>
                    </div>
                    
                    <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                      <div className="flex items-center">
                        <Heart className="h-4 w-4 text-green-600 mr-2" />
                        <span className="text-sm">Items Watched</span>
                      </div>
                      <span className="font-semibold">{stats.watchlistCount}</span>
                    </div>
                    
                    <div className="flex items-center justify-between p-3 bg-orange-50 rounded-lg">
                      <div className="flex items-center">
                        <Gavel className="h-4 w-4 text-orange-600 mr-2" />
                        <span className="text-sm">Bids Placed</span>
                      </div>
                      <span className="font-semibold">12</span>
                    </div>
                    
                    <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
                      <div className="flex items-center">
                        <Star className="h-4 w-4 text-purple-600 mr-2" />
                        <span className="text-sm">Success Rate</span>
                      </div>
                      <span className="font-semibold">83%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default DashboardPage;