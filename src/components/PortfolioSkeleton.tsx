import React from 'react';

export const PortfolioSkeleton: React.FC = () => {
  return (
    <div className="min-h-screen bg-transparent relative">
      {/* Background Grid Decoration to match actual portfolio */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />

      {/* Navigation Skeleton */}
      <nav className="fixed w-full z-50 transition-all duration-300 bg-white/80 backdrop-blur-md shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            {/* Logo area */}
            <div className="w-40 h-6 bg-gray-200 rounded animate-pulse"></div>
            {/* Desktop Menu area */}
            <div className="hidden md:flex space-x-6">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="w-16 h-4 bg-gray-200 rounded animate-pulse"></div>
              ))}
            </div>
            {/* Mobile menu button */}
            <div className="md:hidden w-8 h-8 bg-gray-200 rounded animate-pulse"></div>
          </div>
        </div>
      </nav>

      {/* Hero Skeleton */}
      <section className="pt-32 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          
          {/* Left Column (Text) */}
          <div className="order-2 lg:order-1 space-y-6">
            <div className="h-12 bg-gray-200 rounded-md animate-pulse w-3/4"></div>
            <div className="h-6 bg-gray-200 rounded-md animate-pulse w-1/2"></div>
            
            <div className="space-y-3 pt-4">
              <div className="h-4 bg-gray-200 rounded-md animate-pulse w-full"></div>
              <div className="h-4 bg-gray-200 rounded-md animate-pulse w-5/6"></div>
              <div className="h-4 bg-gray-200 rounded-md animate-pulse w-4/5"></div>
            </div>

            {/* Social Icons Skeleton */}
            <div className="flex gap-4 pt-4">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="h-10 w-10 bg-gray-200 rounded-full animate-pulse"></div>
              ))}
            </div>

            {/* Contact Info Skeleton */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <div className="h-6 w-32 bg-gray-200 rounded animate-pulse"></div>
              <div className="h-6 w-40 bg-gray-200 rounded animate-pulse"></div>
            </div>

            {/* Action Buttons Skeleton */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <div className="h-12 w-40 bg-gray-200 rounded-md animate-pulse"></div>
              <div className="h-12 w-32 bg-gray-200 rounded-md animate-pulse"></div>
            </div>
          </div>

          {/* Right Column (Image) */}
          <div className="order-1 lg:order-2 flex justify-center">
            <div className="relative">
              <div className="w-80 h-80 rounded-full bg-gray-200 animate-pulse border-8 border-gray-100"></div>
              <div className="absolute -bottom-4 -right-4 w-12 h-12 bg-gray-300 rounded-full animate-pulse"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section Skeleton */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-12 flex flex-col items-center">
          <div className="h-8 w-48 bg-gray-200 rounded-md animate-pulse mb-4"></div>
          <div className="h-4 w-64 bg-gray-200 rounded-md animate-pulse"></div>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="p-6 rounded-2xl bg-white shadow-sm border border-gray-100 h-48 flex flex-col">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-gray-200 rounded-lg animate-pulse"></div>
                <div className="h-6 w-32 bg-gray-200 rounded animate-pulse"></div>
              </div>
              <div className="flex flex-wrap gap-2 mt-auto">
                {[1, 2, 3, 4, 5].map((j) => (
                  <div key={j} className="h-8 w-20 bg-gray-100 rounded-full animate-pulse"></div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
