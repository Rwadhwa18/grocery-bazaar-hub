
import React from 'react';
import Navbar from '@/components/ui/layout/Navbar';
import Footer from '@/components/ui/layout/Footer';

const Terms = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="container mx-auto px-4 py-8 flex-1">
        <h1 className="text-3xl font-bold mb-6">Terms and Conditions</h1>
        <p className="text-gray-300 mb-6">Last updated: {new Date().toLocaleDateString()}</p>
        
        <div className="space-y-6">
          <section>
            <h2 className="text-2xl font-semibold mb-3">1. Introduction</h2>
            <p className="text-gray-300">
              Welcome to GrocMerchants. These Terms and Conditions govern your use of our website and services. By accessing or using GrocMerchants, you agree to be bound by these Terms. If you disagree with any part of the terms, you may not access the service.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">2. Definitions</h2>
            <ul className="list-disc pl-5 text-gray-300 space-y-2">
              <li><strong>"Service"</strong> refers to the GrocMerchants website and platform.</li>
              <li><strong>"User"</strong> refers to individuals who use our service.</li>
              <li><strong>"Merchant"</strong> refers to sellers and vendors who offer products through our platform.</li>
              <li><strong>"Customer"</strong> refers to users who purchase products through our platform.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">3. User Accounts</h2>
            <p className="text-gray-300 mb-3">
              When you create an account with us, you must provide information that is accurate, complete, and current at all times. Failure to do so constitutes a breach of the Terms, which may result in immediate termination of your account on our Service.
            </p>
            <p className="text-gray-300">
              You are responsible for safeguarding the password that you use to access the Service and for any activities or actions under your password. You agree not to disclose your password to any third party. You must notify us immediately upon becoming aware of any breach of security or unauthorized use of your account.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">4. Merchant Terms</h2>
            <p className="text-gray-300">
              Merchants are responsible for the accuracy of their product listings, including descriptions, prices, and availability. Merchants must comply with all applicable laws and regulations regarding the sale of their products. GrocMerchants reserves the right to remove any product listing that violates these Terms or applicable laws.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">5. Customer Terms</h2>
            <p className="text-gray-300">
              Customers are responsible for reviewing product listings before making purchases. GrocMerchants is not responsible for any discrepancies between product listings and the actual products received. Customers agree to resolve any disputes with merchants directly before involving GrocMerchants.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">6. Intellectual Property</h2>
            <p className="text-gray-300">
              The Service and its original content, features, and functionality are and will remain the exclusive property of GrocMerchants and its licensors. The Service is protected by copyright, trademark, and other laws. Our trademarks and trade dress may not be used in connection with any product or service without the prior written consent of GrocMerchants.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">7. Termination</h2>
            <p className="text-gray-300">
              We may terminate or suspend your account immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach the Terms. Upon termination, your right to use the Service will immediately cease.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">8. Limitation of Liability</h2>
            <p className="text-gray-300">
              In no event shall GrocMerchants, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from your access to or use of or inability to access or use the Service.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">9. Changes</h2>
            <p className="text-gray-300">
              We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is material, we will try to provide at least 30 days' notice prior to any new terms taking effect. What constitutes a material change will be determined at our sole discretion.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">10. Contact Us</h2>
            <p className="text-gray-300">
              If you have any questions about these Terms, please contact us at support@grocmerchants.com.
            </p>
          </section>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Terms;
