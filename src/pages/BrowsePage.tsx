import React, { useState, useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import SearchFilters from '@/components/SearchFilters';
import ListingCard from '@/components/ListingCard';
import { mockListings } from '@/data/mockListings';
import { FilterOptions, WebsiteListing } from '@/types/listing';
import { Grid, List, SlidersHorizontal, Search, X } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

const BrowsePage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showFilters, setShowFilters] = useState(true);
  const [watchlist, setWatchlist] = useState<string[]>([]);
  const [localSearchQuery, setLocalSearchQuery] = useState('');

  const [filters, setFilters] = useState<FilterOptions>({
    category: searchParams.get('category') || undefined,
    search: searchParams.get('search') || undefined,
    sortBy: 'price',
    sortOrder: 'asc'
  });

  // Update filters when URL params change
  useEffect(() => {
    const category = searchParams.get('category');
    const search = searchParams.get('search');

    setFilters((prev) => ({
      ...prev,
      category: category || undefined,
      search: search || undefined
    }));

    setLocalSearchQuery(search || '');
  }, [searchParams]);

  const filteredAndSortedListings = useMemo(() => {
    let filtered = [...mockListings];

    // Apply search filter
    if (filters.search) {
      const searchTerm = filters.search.toLowerCase();
      filtered = filtered.filter((listing) => 
        listing.title.toLowerCase().includes(searchTerm) ||
        listing.description.toLowerCase().includes(searchTerm) ||
        listing.url.toLowerCase().includes(searchTerm) ||
        listing.category.toLowerCase().includes(searchTerm) ||
        listing.technologies.some(tech => tech.toLowerCase().includes(searchTerm)) ||
        listing.financials.revenueStreams.some(stream => stream.toLowerCase().includes(searchTerm))
      );
    }

    // Apply category filter
    if (filters.category) {
      filtered = filtered.filter((listing) => listing.category === filters.category);
    }

    // Apply price filters
    if (filters.minPrice !== undefined) {
      filtered = filtered.filter((listing) => listing.price >= filters.minPrice!);
    }

    if (filters.maxPrice !== undefined) {
      filtered = filtered.filter((listing) => listing.price <= filters.maxPrice!);
    }

    // Apply revenue filters
    if (filters.minRevenue !== undefined) {
      filtered = filtered.filter((listing) => listing.monthlyRevenue >= filters.minRevenue!);
    }

    if (filters.maxRevenue !== undefined) {
      filtered = filtered.filter((listing) => listing.monthlyRevenue <= filters.maxRevenue!);
    }

    // Apply verified filter
    if (filters.verified) {
      filtered = filtered.filter((listing) => listing.isVerified);
    }

    // Apply sorting
    filtered.sort((a, b) => {
      let aValue, bValue;

      switch (filters.sortBy) {
        case 'price':
          aValue = a.price;
          bValue = b.price;
          break;
        case 'revenue':
          aValue = a.monthlyRevenue;
          bValue = b.monthlyRevenue;
          break;
        case 'watchers':
          aValue = a.watchers;
          bValue = b.watchers;
          break;
        case 'ending':
          // Sort by auction end date (auctions first, then by time remaining)
          if (!a.auctionEndDate && !b.auctionEndDate) return 0;
          if (!a.auctionEndDate) return 1;
          if (!b.auctionEndDate) return -1;
          aValue = new Date(a.auctionEndDate).getTime();
          bValue = new Date(b.auctionEndDate).getTime();
          break;
        default:
          aValue = a.price;
          bValue = b.price;
      }

      const modifier = filters.sortOrder === 'desc' ? -1 : 1;
      return (aValue - bValue) * modifier;
    });

    return filtered;
  }, [filters]);

  const handleFiltersChange = (newFilters: FilterOptions) => {
    setFilters(newFilters);

    // Update URL params
    const params = new URLSearchParams(searchParams);
    
    if (newFilters.category) {
      params.set('category', newFilters.category);
    } else {
      params.delete('category');
    }

    if (newFilters.search) {
      params.set('search', newFilters.search);
    } else {
      params.delete('search');
    }

    setSearchParams(params);
  };

  const handleLocalSearch = (e: React.FormEvent) => {
    e.preventDefault();
    handleFiltersChange({ ...filters, search: localSearchQuery.trim() || undefined });
  };

  const handleClearFilters = () => {
    setFilters({
      sortBy: 'price',
      sortOrder: 'asc'
    });
    setLocalSearchQuery('');
    setSearchParams({});
  };

  const handleClearSearch = () => {
    setLocalSearchQuery('');
    handleFiltersChange({ ...filters, search: undefined });
  };

  const handleAddToWatchlist = (listingId: string) => {
    if (watchlist.includes(listingId)) {
      setWatchlist((prev) => prev.filter((id) => id !== listingId));
      toast({
        title: "Removed from watchlist",
        description: "The listing has been removed from your watchlist."
      });
    } else {
      setWatchlist((prev) => [...prev, listingId]);
      toast({
        title: "Added to watchlist",
        description: "The listing has been added to your watchlist."
      });
    }
  };

  const getCategoryTitle = () => {
    const category = searchParams.get('category');
    const search = searchParams.get('search');
    
    if (search) {
      return `Search results for "${search}"`;
    }
    
    if (!category) return 'All Listings';

    const categoryMap: Record<string, string> = {
      ecommerce: 'E-commerce Sites',
      saas: 'SaaS Businesses',
      content: 'Content Sites',
      marketplace: 'Marketplaces',
      affiliate: 'Affiliate Sites',
      other: 'Other Businesses'
    };

    return categoryMap[category] || 'All Listings';
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                {getCategoryTitle()}
              </h1>
              <p className="text-gray-600">
                {filteredAndSortedListings.length} listings found
              </p>
            </div>
            
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowFilters(!showFilters)}
                className="lg:hidden"
              >
                <SlidersHorizontal className="h-4 w-4 mr-2" />
                Filters
              </Button>
              
              <div className="flex items-center bg-white rounded-lg border">
                <Button
                  variant={viewMode === 'grid' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('grid')}
                >
                  <Grid className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === 'list' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('list')}
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* Search Bar */}
          <div className="mt-6">
            <form onSubmit={handleLocalSearch} className="max-w-2xl">
              <div className="relative">
                <Input
                  type="text"
                  placeholder="Search by title, description, technology, or category..."
                  value={localSearchQuery}
                  onChange={(e) => setLocalSearchQuery(e.target.value)}
                  className="pl-10 pr-12"
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                {localSearchQuery && (
                  <button
                    type="button"
                    onClick={handleClearSearch}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    <X className="h-4 w-4" />
                  </button>
                )}
              </div>
            </form>
          </div>

          {/* Active Filters */}
          {(filters.category || filters.search || filters.verified || filters.minPrice || filters.maxPrice) && (
            <div className="flex flex-wrap gap-2 mt-4">
              {filters.search && (
                <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                  Search: "{filters.search}"
                  <button
                    onClick={() => handleFiltersChange({ ...filters, search: undefined })}
                    className="ml-2 hover:text-blue-600"
                  >
                    ×
                  </button>
                </Badge>
              )}
              {filters.category && (
                <Badge variant="secondary" className="bg-green-100 text-green-800">
                  Category: {filters.category}
                  <button
                    onClick={() => handleFiltersChange({ ...filters, category: undefined })}
                    className="ml-2 hover:text-green-600"
                  >
                    ×
                  </button>
                </Badge>
              )}
              {filters.verified && (
                <Badge variant="secondary" className="bg-purple-100 text-purple-800">
                  Verified Only
                  <button
                    onClick={() => handleFiltersChange({ ...filters, verified: false })}
                    className="ml-2 hover:text-purple-600"
                  >
                    ×
                  </button>
                </Badge>
              )}
              {(filters.minPrice || filters.maxPrice) && (
                <Badge variant="secondary" className="bg-orange-100 text-orange-800">
                  Price: ${filters.minPrice || 0}K - ${filters.maxPrice || 500}K
                  <button
                    onClick={() => handleFiltersChange({
                      ...filters,
                      minPrice: undefined,
                      maxPrice: undefined
                    })}
                    className="ml-2 hover:text-orange-600"
                  >
                    ×
                  </button>
                </Badge>
              )}
            </div>
          )}
        </div>

        {/* Main Content */}
        <div className="flex gap-8">
          {/* Filters Sidebar */}
          {showFilters && (
            <div className="w-full lg:w-80 flex-shrink-0">
              <SearchFilters
                filters={filters}
                onFiltersChange={handleFiltersChange}
                onClearFilters={handleClearFilters}
              />
            </div>
          )}

          {/* Listings */}
          <div className="flex-1">
            {filteredAndSortedListings.length === 0 ? (
              <Card>
                <CardContent className="py-12 text-center">
                  <div className="text-gray-500 mb-4">
                    <Search className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    No listings found
                  </h3>
                  <p className="text-gray-600 mb-4">
                    {filters.search 
                      ? `No results found for "${filters.search}". Try different keywords or adjust your filters.`
                      : "Try adjusting your filters to see more results."
                    }
                  </p>
                  <Button onClick={handleClearFilters}>Clear All Filters</Button>
                </CardContent>
              </Card>
            ) : (
              <div className={
                viewMode === 'grid' 
                  ? 'grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6' 
                  : 'space-y-6'
              }>
                {filteredAndSortedListings.map((listing) => (
                  <ListingCard
                    key={listing.id}
                    listing={listing}
                    onAddToWatchlist={handleAddToWatchlist}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BrowsePage;