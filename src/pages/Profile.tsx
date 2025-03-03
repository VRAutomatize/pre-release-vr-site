
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser, useClerk, SignOutButton } from '@clerk/clerk-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { User, LogOut } from 'lucide-react';

const Profile = () => {
  const { user } = useUser();
  const navigate = useNavigate();
  const { signOut } = useClerk();

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gold"></div>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto"
        >
          <div className="bg-card rounded-xl shadow-lg overflow-hidden">
            <div className="bg-gradient-to-r from-gold/60 to-gold p-6 flex flex-col sm:flex-row items-center gap-6">
              <div className="h-24 w-24 rounded-full bg-white/20 flex items-center justify-center text-white overflow-hidden">
                {user.imageUrl ? (
                  <img 
                    src={user.imageUrl} 
                    alt={user.fullName || 'Usuário'} 
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <User size={48} />
                )}
              </div>
              <div className="text-center sm:text-left">
                <h1 className="text-3xl font-bold text-white">{user.fullName || 'Bem-vindo!'}</h1>
                <p className="text-white/80">{user.primaryEmailAddress?.emailAddress}</p>
              </div>
            </div>
            
            <div className="p-6">
              <h2 className="text-2xl font-semibold mb-6">Informações da conta</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">Nome completo</p>
                  <p className="font-medium">{user.fullName || 'Não informado'}</p>
                </div>
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">Email</p>
                  <p className="font-medium">{user.primaryEmailAddress?.emailAddress || 'Não informado'}</p>
                </div>
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">ID de Usuário</p>
                  <p className="font-medium">{user.id}</p>
                </div>
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">Data de criação</p>
                  <p className="font-medium">{new Date(user.createdAt).toLocaleDateString('pt-BR')}</p>
                </div>
              </div>
              
              <div className="flex justify-end mt-8">
                <SignOutButton>
                  <Button 
                    variant="outline" 
                    className="flex items-center gap-2"
                    onClick={() => navigate('/')}
                  >
                    <LogOut size={16} />
                    Sair
                  </Button>
                </SignOutButton>
              </div>
            </div>
          </div>
        </motion.div>
      </main>
      <Footer />
    </div>
  );
};

export default Profile;
