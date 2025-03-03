
import React from 'react';
import { SignIn as ClerkSignIn } from '@clerk/clerk-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { motion } from 'framer-motion';

const SignIn = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="flex-grow container mx-auto px-4 py-16 flex items-center justify-center">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md glass p-8 rounded-xl shadow-lg"
        >
          <h1 className="text-2xl font-bold text-center mb-6">Acesse sua conta</h1>
          <div className="flex justify-center">
            <ClerkSignIn 
              appearance={{
                elements: {
                  formButtonPrimary: 'bg-gold hover:bg-gold-light text-background py-2 px-4 rounded transition-all duration-300',
                  card: 'border-0 shadow-none',
                  headerTitle: 'text-xl font-semibold',
                  headerSubtitle: 'text-muted-foreground',
                }
              }}
              routing="path"
              path="/signin"
            />
          </div>
        </motion.div>
      </div>
      <Footer />
    </div>
  );
};

export default SignIn;
