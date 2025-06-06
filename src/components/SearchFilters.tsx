import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue } from
'@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { FilterOptions } from '@/types/listing';
import { Filter, X } from 'lucide-react';

interface SearchFiltersProps {
  filters: FilterOptions;
  onFiltersChange: (filters: FilterOptions) => void;
  onClearFilters: () => void;
}

const SearchFilters: React.FC<SearchFiltersProps> = ({
  filters,
  onFiltersChange,
  onClearFilters
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [priceRange, setPriceRange] = useState([filters.minPrice || 0, filters.maxPrice || 500000]);
  const [revenueRange, setRevenueRange] = useState([filters.minRevenue || 0, filters.maxRevenue || 50000]);

  const categories = [
  { value: 'ecommerce', label: 'E-commerce' },
  { value: 'saas', label: 'SaaS' },
  { value: 'content', label: 'Content Sites' },
  { value: 'marketplace', label: 'Marketplaces' },
  { value: 'affiliate', label: 'Affiliate Sites' },
  { value: 'other', label: 'Other' }];


  const sortOptions = [
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
  { value: 'revenue-desc', label: 'Revenue: High to Low' },
  { value: 'revenue-asc', label: 'Revenue: Low to High' },
  { value: 'ending', label: 'Ending Soon' },
  { value: 'watchers-desc', label: 'Most Watched' }];


  const updateFilters = (newFilters: Partial<FilterOptions>) => {
    onFiltersChange({ ...filters, ...newFilters });
  };

  const handlePriceChange = (values: number[]) => {
    setPriceRange(values);
    updateFilters({ minPrice: values[0], maxPrice: values[1] });
  };

  const handleRevenueChange = (values: number[]) => {
    setRevenueRange(values);
    updateFilters({ minRevenue: values[0], maxRevenue: values[1] });
  };

  const handleSortChange = (value: string) => {
    const [sortBy, sortOrder] = value.split('-');
    updateFilters({
      sortBy: sortBy as FilterOptions['sortBy'],
      sortOrder: sortOrder as FilterOptions['sortOrder']
    });
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  const hasActiveFilters = Object.values(filters).some((value) =>
  value !== undefined && value !== '' && value !== false
  );

  return (
    <div className="w-full">
      {/* Mobile Filter Toggle */}
      <div className="lg:hidden mb-4">
        <Button
          variant="outline"
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-full justify-between">

          <span className="flex items-center">
            <Filter className="h-4 w-4 mr-2" />
            Filters
            {hasActiveFilters &&
            <span className="ml-2 bg-blue-500 text-white text-xs px-2 py-1 rounded-full">
                Active
              </span>
            }
          </span>
        </Button>
      </div>

      {/* Filter Panel */}
      <div className={`lg:block ${isExpanded ? 'block' : 'hidden'}`}>
        <Card>
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">Filters</CardTitle>
              {hasActiveFilters &&
              <Button
                variant="ghost"
                size="sm"
                onClick={onClearFilters}
                className="text-red-600 hover:text-red-700">

                  <X className="h-4 w-4 mr-1" />
                  Clear All
                </Button>
              }
            </div>
          </CardHeader>
          
          <CardContent className="space-y-6">
            {/* Sort */}
            <div>
              <Label className="text-sm font-medium mb-3 block">Sort By</Label>
              <Select
                value={`${filters.sortBy || 'price'}-${filters.sortOrder || 'asc'}`}
                onValueChange={handleSortChange}>

                <SelectTrigger>
                  <SelectValue placeholder="Sort by..." />
                </SelectTrigger>
                <SelectContent>
                  {sortOptions.map((option) =>
                  <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  )}
                </SelectContent>
              </Select>
            </div>

            {/* Category */}
            <div>
              <Label className="text-sm font-medium mb-3 block">Category</Label>
              <Select
                value={filters.category || ''}
                onValueChange={(value) => updateFilters({ category: value || undefined })}>

                <SelectTrigger>
                  <SelectValue placeholder="All categories" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">All Categories</SelectItem>
                  {categories.map((category) =>
                  <SelectItem key={category.value} value={category.value}>
                      {category.label}
                    </SelectItem>
                  )}
                </SelectContent>
              </Select>
            </div>

            {/* Price Range */}
            <div>
              <Label className="text-sm font-medium mb-3 block">
                Price Range: {formatCurrency(priceRange[0])} - {formatCurrency(priceRange[1])}
              </Label>
              <div className="px-2">
                <Slider
                  value={priceRange}
                  onValueChange={handlePriceChange}
                  max={500000}
                  min={0}
                  step={5000}
                  className="w-full" />

              </div>
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>$0</span>
                <span>$500K+</span>
              </div>
            </div>

            {/* Monthly Revenue Range */}
            <div>
              <Label className="text-sm font-medium mb-3 block">
                Monthly Revenue: {formatCurrency(revenueRange[0])} - {formatCurrency(revenueRange[1])}
              </Label>
              <div className="px-2">
                <Slider
                  value={revenueRange}
                  onValueChange={handleRevenueChange}
                  max={50000}
                  min={0}
                  step={1000}
                  className="w-full" />

              </div>
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>$0</span>
                <span>$50K+</span>
              </div>
            </div>

            {/* Verified Only */}
            <div className="flex items-center space-x-2">
              <Checkbox
                id="verified"
                checked={filters.verified || false}
                onCheckedChange={(checked) => updateFilters({ verified: checked as boolean })} />

              <Label htmlFor="verified" className="text-sm font-medium">
                Verified listings only
              </Label>
            </div>

            {/* Quick Filters */}
            <div>
              <Label className="text-sm font-medium mb-3 block">Quick Filters</Label>
              <div className="grid grid-cols-1 gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => updateFilters({ minRevenue: 5000 })}
                  className="justify-start">

                  $5K+ Monthly Revenue
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => updateFilters({ maxPrice: 50000 })}
                  className="justify-start">

                  Under $50K
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => updateFilters({ verified: true })}
                  className="justify-start">

                  Verified Only
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>);

};

export default SearchFilters;