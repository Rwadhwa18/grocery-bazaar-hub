
import React from 'react';
import { Navbar } from '@/components/ui/layout/Navbar';
import { Footer } from '@/components/ui/layout/Footer';

const AboutUs = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="container mx-auto px-4 py-8 flex-1">
        <h1 className="text-3xl font-bold mb-6">About GrocMerchants</h1>
        
        <div className="space-y-6">
          <section>
            <h2 className="text-2xl font-semibold mb-3">Our Story</h2>
            <p className="text-gray-300">
              Founded in 2023, GrocMerchants was born from a simple idea: to connect local merchants with customers who value quality and convenience. Our founders noticed that small businesses often struggled to reach customers in an increasingly digital world, while consumers were looking for ways to support local businesses without sacrificing convenience.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">Our Mission</h2>
            <p className="text-gray-300">
              At GrocMerchants, our mission is to build a thriving ecosystem where local merchants can showcase their unique products, and customers can discover and purchase from businesses they love with ease and confidence.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">What Sets Us Apart</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-appgray p-5 rounded-lg">
                <h3 className="text-xl font-medium text-appgold mb-2">Local Focus</h3>
                <p className="text-gray-300">We prioritize local merchants and artisans, helping you discover hidden gems in your community.</p>
              </div>
              <div className="bg-appgray p-5 rounded-lg">
                <h3 className="text-xl font-medium text-appgold mb-2">Quality Assurance</h3>
                <p className="text-gray-300">Every merchant on our platform is carefully vetted to ensure quality products and service.</p>
              </div>
              <div className="bg-appgray p-5 rounded-lg">
                <h3 className="text-xl font-medium text-appgold mb-2">Community Building</h3>
                <p className="text-gray-300">We foster connections between merchants and customers, creating a community of shared values.</p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">Our Team</h2>
            <p className="text-gray-300 mb-6">
              Our diverse team brings together expertise in technology, retail, and customer experience. We're united by our passion for supporting local businesses and creating exceptional shopping experiences.
            </p>
            <div className="grid md:grid-cols-4 gap-6">
              {[1, 2, 3, 4].map((item) => (
                <div key={item} className="text-center">
                  <div className="w-32 h-32 mx-auto bg-appgray rounded-full mb-3"></div>
                  <h3 className="font-medium">Team Member {item}</h3>
                  <p className="text-sm text-gray-400">Position</p>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AboutUs;
