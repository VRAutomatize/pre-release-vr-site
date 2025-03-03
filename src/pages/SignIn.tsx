
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { SignIn as ClerkSignIn } from '@clerk/clerk-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { motion } from 'framer-motion';

const SignIn = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="flex-grow container mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-md mx-auto"
        >
          <h1 className="text-3xl font-bold mb-8 text-center">Entre na sua conta</h1>
          
          <div className="bg-card p-6 rounded-lg shadow-lg">
            <ClerkSignIn
              routing="path"
              path="/signin"
              signUpUrl="/signin"
              afterSignInUrl="/profile"
              appearance={{
                elements: {
                  rootBox: "w-full",
                  card: "bg-transparent shadow-none",
                  formButtonPrimary: "bg-gold hover:bg-gold-light text-background",
                  footerAction: "text-gold hover:text-gold-light"
                }
              }}
            />
          </div>
        </motion.div>
      </div>
      <Footer />
    </div>
  );
};

export default SignIn;
