import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, TrendingUp, Shield, Users, Search } from "lucide-react";
import { Link } from "react-router-dom";
import ListingCard from "@/components/ListingCard";
import { mockListings } from "@/data/mockListings";

const HomePage = () => {
  const featuredListings = mockListings.slice(0, 3);
  
  const stats = [
    { label: "Active Listings", value: "1,200+", icon: TrendingUp },
    { label: "Verified Sellers", value: "850+", icon: Shield },
    { label: "Happy Buyers", value: "5,000+", icon: Users },
  ];

  const categories = [
    { name: "E-commerce", count: 245, color: "bg-green-100 text-green-800" },
    { name: "SaaS", count: 189, color: "bg-blue-100 text-blue-800" },
    { name: "Content Sites", count: 156, color: "bg-purple-100 text-purple-800" },
    { name: "Marketplaces", count: 98, color: "bg-orange-100 text-orange-800" },
    { name: "Affiliate Sites", count: 134, color: "bg-yellow-100 text-yellow-800" },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 to-indigo-100 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Buy & Sell
              <span className="text-blue-600"> Digital Businesses</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              The world's largest marketplace for buying and selling websites, apps, and digital businesses. 
              Find your next investment or sell your online business today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild>
                <Link to="/browse">
                  <Search className="h-5 w-5 mr-2" />
                  Browse Listings
                </Link>
              </Button>
              <Button size="lg" variant="outline">
                Sell Your Business
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
                  <stat.icon className="h-8 w-8 text-blue-600" />
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Browse by Category</h2>
            <p className="text-gray-600">Find the perfect digital business in your preferred niche</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
            {categories.map((category, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardContent className="p-6 text-center">
                  <Badge className={`${category.color} mb-3`}>
                    {category.name}
                  </Badge>
                  <div className="text-2xl font-bold text-gray-900 mb-1">{category.count}</div>
                  <div className="text-sm text-gray-600">Active Listings</div>
                  <Button variant="ghost" size="sm" className="mt-3" asChild>
                    <Link to={`/browse?category=${category.name.toLowerCase().replace(' ', '')}`}>
                      View All <ArrowRight className="h-4 w-4 ml-1" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Listings */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Featured Listings</h2>
            <p className="text-gray-600">Hand-picked opportunities from verified sellers</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredListings.map((listing) => (
              <ListingCard key={listing.id} listing={listing} />
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Button size="lg" variant="outline" asChild>
              <Link to="/browse">
                View All Listings <ArrowRight className="h-5 w-5 ml-2" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-blue-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Ready to Start Your Journey?</h2>
          <p className="text-blue-100 mb-8 max-w-2xl mx-auto">
            Whether you're looking to buy your first online business or sell your existing one, 
            we're here to help you every step of the way.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary">
              Start Buying
            </Button>
            <Button size="lg" variant="outline" className="text-white border-white hover:bg-white hover:text-blue-600">
              Start Selling
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;