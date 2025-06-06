import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { Progress } from '@/components/ui/progress';
import {
  Heart,
  Share2,
  Clock,
  TrendingUp,
  Eye,
  DollarSign,
  Users,
  Calendar,
  Shield,
  Star,
  ArrowLeft,
  ExternalLink } from
'lucide-react';
import { mockListings } from '@/data/mockListings';
import { toast } from '@/hooks/use-toast';

const ListingDetailPage = () => {
  const { id } = useParams<{id: string;}>();
  const listing = mockListings.find((l) => l.id === id);
  const [bidAmount, setBidAmount] = useState('');
  const [isWatching, setIsWatching] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  if (!listing) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardContent className="py-12 text-center">
            <h2 className="text-xl font-semibold mb-2">Listing not found</h2>
            <p className="text-gray-600 mb-4">The listing you're looking for doesn't exist.</p>
            <Button asChild>
              <Link to="/browse">Browse All Listings</Link>
            </Button>
          </CardContent>
        </Card>
      </div>);

  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  const formatNumber = (num: number) => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M';
    }
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
  };

  const getTimeRemaining = () => {
    if (!listing.auctionEndDate) return null;

    const now = new Date();
    const end = new Date(listing.auctionEndDate);
    const diff = end.getTime() - now.getTime();

    if (diff <= 0) return 'Ended';

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor(diff % (1000 * 60 * 60 * 24) / (1000 * 60 * 60));
    const minutes = Math.floor(diff % (1000 * 60 * 60) / (1000 * 60));

    if (days > 0) return `${days}d ${hours}h ${minutes}m`;
    if (hours > 0) return `${hours}h ${minutes}m`;
    return `${minutes}m`;
  };

  const handleBid = () => {
    const amount = parseFloat(bidAmount);
    if (isNaN(amount) || amount <= (listing.currentBid || listing.price)) {
      toast({
        title: "Invalid bid amount",
        description: "Bid must be higher than the current bid.",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Bid placed successfully!",
      description: `Your bid of ${formatCurrency(amount)} has been placed.`
    });
    setBidAmount('');
  };

  const handleWatch = () => {
    setIsWatching(!isWatching);
    toast({
      title: isWatching ? "Removed from watchlist" : "Added to watchlist",
      description: isWatching ?
      "This listing has been removed from your watchlist." :
      "You'll be notified of important updates."
    });
  };

  const getCategoryColor = (category: string) => {
    const colors = {
      ecommerce: 'bg-green-100 text-green-800',
      saas: 'bg-blue-100 text-blue-800',
      content: 'bg-purple-100 text-purple-800',
      marketplace: 'bg-orange-100 text-orange-800',
      affiliate: 'bg-yellow-100 text-yellow-800',
      other: 'bg-gray-100 text-gray-800'
    };
    return colors[category as keyof typeof colors] || colors.other;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 mb-6">
          <Button variant="ghost" size="sm" asChild>
            <Link to="/browse">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Browse
            </Link>
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Header */}
            <Card>
              <CardHeader>
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 flex-wrap">
                      <Badge className={getCategoryColor(listing.category)}>
                        {listing.category.charAt(0).toUpperCase() + listing.category.slice(1)}
                      </Badge>
                      {listing.isVerified &&
                      <Badge variant="secondary" className="bg-green-100 text-green-800">
                          <Shield className="h-3 w-3 mr-1" />
                          Verified
                        </Badge>
                      }
                    </div>
                    <h1 className="text-2xl font-bold text-gray-900">{listing.title}</h1>
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <a
                        href={`https://${listing.url}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center text-blue-600 hover:text-blue-700">

                        {listing.url}
                        <ExternalLink className="h-3 w-3 ml-1" />
                      </a>
                      <div className="flex items-center">
                        <Star className="h-4 w-4 text-yellow-500 mr-1" />
                        {listing.sellerRating}/5
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm" onClick={handleWatch}>
                      <Heart className={`h-4 w-4 mr-2 ${isWatching ? 'fill-red-500 text-red-500' : ''}`} />
                      {isWatching ? 'Watching' : 'Watch'}
                    </Button>
                    <Button variant="outline" size="sm">
                      <Share2 className="h-4 w-4 mr-2" />
                      Share
                    </Button>
                  </div>
                </div>
              </CardHeader>
            </Card>

            {/* Images */}
            <Card>
              <CardContent className="p-0">
                <div className="aspect-video bg-gray-100 rounded-lg overflow-hidden">
                  <img
                    src={listing.images[currentImageIndex]}
                    alt={listing.title}
                    className="w-full h-full object-cover" />

                </div>
                {listing.images.length > 1 &&
                <div className="flex gap-2 p-4">
                    {listing.images.map((image, index) =>
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`w-16 h-16 rounded-lg overflow-hidden border-2 ${
                    index === currentImageIndex ? 'border-blue-500' : 'border-gray-200'}`
                    }>

                        <img src={image} alt={`${listing.title} ${index + 1}`} className="w-full h-full object-cover" />
                      </button>
                  )}
                  </div>
                }
              </CardContent>
            </Card>

            {/* Details Tabs */}
            <Card>
              <Tabs defaultValue="overview" className="w-full">
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="financials">Financials</TabsTrigger>
                  <TabsTrigger value="traffic">Traffic</TabsTrigger>
                  <TabsTrigger value="tech">Technology</TabsTrigger>
                </TabsList>
                
                <TabsContent value="overview" className="p-6">
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Description</h3>
                    <p className="text-gray-700">{listing.description}</p>
                    
                    <Separator />
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <h4 className="font-medium mb-2">Business Age</h4>
                        <p className="text-gray-600">{Math.floor(listing.age / 12)} years, {listing.age % 12} months</p>
                      </div>
                      <div>
                        <h4 className="font-medium mb-2">Revenue Streams</h4>
                        <ul className="text-gray-600 space-y-1">
                          {listing.financials.revenueStreams.map((stream, index) =>
                          <li key={index}>• {stream}</li>
                          )}
                        </ul>
                      </div>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="financials" className="p-6">
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-semibold mb-4">Revenue &amp; Profit</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span>Monthly Revenue</span>
                            <span className="font-semibold">{formatCurrency(listing.monthlyRevenue)}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Monthly Profit</span>
                            <span className="font-semibold text-green-600">{formatCurrency(listing.monthlyProfit)}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Annual Revenue</span>
                            <span className="font-semibold">{formatCurrency(listing.metrics.revenue12Month)}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Annual Profit</span>
                            <span className="font-semibold text-green-600">{formatCurrency(listing.metrics.profit12Month)}</span>
                          </div>
                        </div>
                        <div>
                          <h4 className="font-medium mb-2">Profit Margin</h4>
                          <Progress
                            value={listing.monthlyProfit / listing.monthlyRevenue * 100}
                            className="h-2" />

                          <p className="text-sm text-gray-600 mt-1">
                            {(listing.monthlyProfit / listing.monthlyRevenue * 100).toFixed(1)}%
                          </p>
                        </div>
                      </div>
                    </div>
                    
                    <Separator />
                    
                    <div>
                      <h3 className="text-lg font-semibold mb-4">Monthly Expenses</h3>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span>Hosting</span>
                          <span>{formatCurrency(listing.financials.expenses.hosting)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Marketing</span>
                          <span>{formatCurrency(listing.financials.expenses.marketing)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Other</span>
                          <span>{formatCurrency(listing.financials.expenses.other)}</span>
                        </div>
                        <Separator />
                        <div className="flex justify-between font-semibold">
                          <span>Total Expenses</span>
                          <span>
                            {formatCurrency(
                              listing.financials.expenses.hosting +
                              listing.financials.expenses.marketing +
                              listing.financials.expenses.other
                            )}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="traffic" className="p-6">
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Traffic Analytics</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="text-center p-4 bg-blue-50 rounded-lg">
                        <Eye className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                        <div className="font-semibold text-lg">{formatNumber(listing.monthlyPageviews)}</div>
                        <div className="text-sm text-gray-600">Monthly Pageviews</div>
                      </div>
                      <div className="text-center p-4 bg-green-50 rounded-lg">
                        <Users className="h-8 w-8 text-green-600 mx-auto mb-2" />
                        <div className="font-semibold text-lg">{formatNumber(listing.metrics.pageviews12Month)}</div>
                        <div className="text-sm text-gray-600">Annual Pageviews</div>
                      </div>
                      <div className="text-center p-4 bg-purple-50 rounded-lg">
                        <Heart className="h-8 w-8 text-purple-600 mx-auto mb-2" />
                        <div className="font-semibold text-lg">{formatNumber(listing.metrics.socialFollowers || 0)}</div>
                        <div className="text-sm text-gray-600">Social Followers</div>
                      </div>
                    </div>
                    
                    {listing.metrics.emailSubscribers &&
                    <div className="mt-4">
                        <h4 className="font-medium mb-2">Email Marketing</h4>
                        <p className="text-gray-600">
                          {formatNumber(listing.metrics.emailSubscribers)} email subscribers
                        </p>
                      </div>
                    }
                  </div>
                </TabsContent>
                
                <TabsContent value="tech" className="p-6">
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Technology Stack</h3>
                    <div className="flex flex-wrap gap-2">
                      {listing.technologies.map((tech, index) =>
                      <Badge key={index} variant="outline">{tech}</Badge>
                      )}
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Pricing Card */}
            <Card>
              <CardHeader>
                <CardTitle>Purchase Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {listing.currentBid ?
                <div>
                    <div className="text-sm text-gray-500">Current Bid</div>
                    <div className="text-2xl font-bold text-green-600">
                      {formatCurrency(listing.currentBid)}
                    </div>
                    {listing.auctionEndDate &&
                  <div className="flex items-center text-sm text-orange-600 mt-2">
                        <Clock className="h-4 w-4 mr-1" />
                        {getTimeRemaining()} remaining
                      </div>
                  }
                  </div> :

                <div>
                    <div className="text-sm text-gray-500">Asking Price</div>
                    <div className="text-2xl font-bold">
                      {formatCurrency(listing.price)}
                    </div>
                  </div>
                }

                {listing.buyNowPrice &&
                <div>
                    <div className="text-sm text-gray-500">Buy It Now</div>
                    <div className="text-xl font-semibold text-blue-600">
                      {formatCurrency(listing.buyNowPrice)}
                    </div>
                  </div>
                }

                <Separator />

                {listing.currentBid ?
                <div className="space-y-3">
                    <div>
                      <Label htmlFor="bid-amount">Your Bid Amount</Label>
                      <Input
                      id="bid-amount"
                      type="number"
                      placeholder={`Minimum: ${formatCurrency((listing.currentBid || 0) + 1000)}`}
                      value={bidAmount}
                      onChange={(e) => setBidAmount(e.target.value)} />

                    </div>
                    <Button className="w-full" onClick={handleBid}>
                      Place Bid
                    </Button>
                  </div> :

                <div className="space-y-3">
                    <Button className="w-full">Make Offer</Button>
                  </div>
                }

                {listing.buyNowPrice &&
                <Button variant="outline" className="w-full">
                    Buy It Now - {formatCurrency(listing.buyNowPrice)}
                  </Button>
                }
              </CardContent>
            </Card>

            {/* Key Metrics */}
            <Card>
              <CardHeader>
                <CardTitle>Key Metrics</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Monthly Revenue</span>
                  <span className="font-semibold">{formatCurrency(listing.monthlyRevenue)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Monthly Profit</span>
                  <span className="font-semibold text-green-600">{formatCurrency(listing.monthlyProfit)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Monthly Pageviews</span>
                  <span className="font-semibold">{formatNumber(listing.monthlyPageviews)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">ROI (Annual)</span>
                  <span className="font-semibold text-blue-600">
                    {(listing.metrics.profit12Month / listing.price * 100).toFixed(1)}%
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Watchers</span>
                  <span className="font-semibold">{listing.watchers}</span>
                </div>
              </CardContent>
            </Card>

            {/* Bid History */}
            {listing.bidHistory && listing.bidHistory.length > 0 &&
            <Card>
                <CardHeader>
                  <CardTitle>Recent Bids</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {listing.bidHistory.slice(0, 5).map((bid, index) =>
                  <div key={index} className="flex justify-between items-center">
                        <span className="text-sm font-medium">{formatCurrency(bid.amount)}</span>
                        <span className="text-xs text-gray-500">
                          {new Date(bid.timestamp).toLocaleDateString()}
                        </span>
                      </div>
                  )}
                  </div>
                </CardContent>
              </Card>
            }
          </div>
        </div>
      </div>
    </div>);

};

export default ListingDetailPage;