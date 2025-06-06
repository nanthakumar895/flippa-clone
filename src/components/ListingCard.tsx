import React from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Heart, Eye, Clock, TrendingUp, Users, DollarSign } from 'lucide-react';
import { WebsiteListing } from '@/types/listing';
import { Link } from 'react-router-dom';

interface ListingCardProps {
  listing: WebsiteListing;
  onAddToWatchlist?: (id: string) => void;
}

const ListingCard: React.FC<ListingCardProps> = ({ listing, onAddToWatchlist }) => {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
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
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    
    if (days > 0) return `${days}d ${hours}h`;
    return `${hours}h`;
  };

  const getCategoryColor = (category: string) => {
    const colors = {
      ecommerce: 'bg-green-100 text-green-800',
      saas: 'bg-blue-100 text-blue-800',
      content: 'bg-purple-100 text-purple-800',
      marketplace: 'bg-orange-100 text-orange-800',
      affiliate: 'bg-yellow-100 text-yellow-800',
      other: 'bg-gray-100 text-gray-800',
    };
    return colors[category as keyof typeof colors] || colors.other;
  };

  return (
    <Card className="hover:shadow-lg transition-all duration-300 group relative overflow-hidden">
      <div className="absolute top-4 right-4 z-10">
        <Button
          variant="ghost"
          size="sm"
          className="h-8 w-8 p-0 bg-white/80 hover:bg-white"
          onClick={() => onAddToWatchlist?.(listing.id)}
        >
          <Heart className="h-4 w-4" />
        </Button>
      </div>

      <CardHeader className="pb-3">
        <div className="aspect-video w-full bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg mb-4 overflow-hidden">
          <img
            src={listing.images[0]}
            alt={listing.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
        
        <div className="space-y-2">
          <div className="flex items-start justify-between">
            <Badge className={getCategoryColor(listing.category)}>
              {listing.category.charAt(0).toUpperCase() + listing.category.slice(1)}
            </Badge>
            {listing.isVerified && (
              <Badge variant="secondary" className="bg-green-100 text-green-800">
                Verified
              </Badge>
            )}
          </div>
          
          <h3 className="font-semibold text-lg leading-tight group-hover:text-blue-600 transition-colors">
            {listing.title}
          </h3>
          
          <p className="text-sm text-gray-600 line-clamp-2">
            {listing.description}
          </p>
          
          <div className="text-sm text-blue-600 font-medium">
            {listing.url}
          </div>
        </div>
      </CardHeader>

      <CardContent className="pt-0">
        <div className="space-y-4">
          {/* Price Information */}
          <div className="flex items-center justify-between">
            <div>
              {listing.currentBid ? (
                <>
                  <div className="text-sm text-gray-500">Current Bid</div>
                  <div className="font-bold text-xl text-green-600">
                    {formatCurrency(listing.currentBid)}
                  </div>
                </>
              ) : (
                <>
                  <div className="text-sm text-gray-500">Price</div>
                  <div className="font-bold text-xl">
                    {formatCurrency(listing.price)}
                  </div>
                </>
              )}
            </div>
            
            {listing.auctionEndDate && (
              <div className="text-right">
                <div className="text-sm text-gray-500 flex items-center">
                  <Clock className="h-3 w-3 mr-1" />
                  Time Left
                </div>
                <div className="font-semibold text-orange-600">
                  {getTimeRemaining()}
                </div>
              </div>
            )}
          </div>

          {/* Key Metrics */}
          <div className="grid grid-cols-3 gap-3 text-sm">
            <div className="text-center p-2 bg-gray-50 rounded-lg">
              <div className="flex items-center justify-center mb-1">
                <DollarSign className="h-3 w-3 text-green-600" />
              </div>
              <div className="font-semibold">{formatCurrency(listing.monthlyRevenue)}</div>
              <div className="text-xs text-gray-500">Monthly Revenue</div>
            </div>
            
            <div className="text-center p-2 bg-gray-50 rounded-lg">
              <div className="flex items-center justify-center mb-1">
                <TrendingUp className="h-3 w-3 text-blue-600" />
              </div>
              <div className="font-semibold">{formatCurrency(listing.monthlyProfit)}</div>
              <div className="text-xs text-gray-500">Monthly Profit</div>
            </div>
            
            <div className="text-center p-2 bg-gray-50 rounded-lg">
              <div className="flex items-center justify-center mb-1">
                <Eye className="h-3 w-3 text-purple-600" />
              </div>
              <div className="font-semibold">{formatNumber(listing.monthlyPageviews)}</div>
              <div className="text-xs text-gray-500">Monthly Views</div>
            </div>
          </div>

          {/* Additional Info */}
          <div className="flex items-center justify-between text-sm text-gray-500">
            <div className="flex items-center">
              <Users className="h-3 w-3 mr-1" />
              {listing.watchers} watching
            </div>
            <div>
              Age: {Math.floor(listing.age / 12)}y {listing.age % 12}m
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2 pt-2">
            <Button asChild className="flex-1">
              <Link to={`/listing/${listing.id}`}>View Details</Link>
            </Button>
            {listing.currentBid ? (
              <Button variant="outline" className="flex-1">
                Place Bid
              </Button>
            ) : (
              <Button variant="outline" className="flex-1">
                Make Offer
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ListingCard;