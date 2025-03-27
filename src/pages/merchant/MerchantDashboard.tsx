
import React from 'react';
import Navbar from '@/components/ui/layout/Navbar';
import Footer from '@/components/ui/layout/Footer';
import MerchantDashboard from '@/components/merchants/MerchantDashboard';

const MerchantDashboardPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="container mx-auto px-4 py-8 flex-1">
        <MerchantDashboard />
      </div>
      <Footer />
    </div>
  );
};

export default MerchantDashboardPage;
