
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser, useAuth, SignOutButton } from '@clerk/clerk-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@/hooks/use-toast";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { motion } from 'framer-motion';
import { UserIcon, LogOut, Camera, Save } from 'lucide-react';

const Profile = () => {
  const { isLoaded, isSignedIn, user } = useUser();
  const { signOut } = useAuth();
  const navigate = useNavigate();
  
  const [name, setName] = useState(user?.fullName || '');
  const [email, setEmail] = useState(user?.primaryEmailAddress?.emailAddress || '');
  const [phone, setPhone] = useState(user?.phoneNumbers?.[0]?.phoneNumber || '');
  const [saving, setSaving] = useState(false);
  
  // Redirect to sign in if not signed in
  React.useEffect(() => {
    if (isLoaded && !isSignedIn) {
      navigate('/signin');
    }
  }, [isLoaded, isSignedIn, navigate]);
  
  if (!isLoaded || !isSignedIn) {
    return <div className="flex justify-center items-center h-screen">Carregando...</div>;
  }
  
  const handleSave = async () => {
    setSaving(true);
    try {
      // In a real app, we would save the updated data to Clerk and/or our backend
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call
      toast({
        title: "Perfil atualizado",
        description: "Suas informações foram atualizadas com sucesso.",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Erro ao atualizar",
        description: "Ocorreu um erro ao atualizar seu perfil.",
      });
    } finally {
      setSaving(false);
    }
  };
  
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="flex-grow container mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mx-auto"
        >
          <h1 className="text-3xl font-bold mb-8 text-center">Seu Perfil</h1>
          
          <div className="grid gap-8 md:grid-cols-[300px_1fr]">
            {/* Profile sidebar */}
            <div className="space-y-6">
              <Card>
                <CardContent className="pt-6 flex flex-col items-center">
                  <div className="relative mb-4">
                    <Avatar className="w-32 h-32">
                      <AvatarImage src={user.imageUrl} alt={user.fullName || 'Avatar'} />
                      <AvatarFallback className="text-2xl bg-gold/20">
                        {user.fullName?.charAt(0) || <UserIcon className="w-8 h-8" />}
                      </AvatarFallback>
                    </Avatar>
                    <div className="absolute -right-2 bottom-0 bg-gold text-background p-1.5 rounded-full cursor-pointer hover:bg-gold-light transition-colors">
                      <Camera size={16} />
                    </div>
                  </div>
                  <h2 className="text-xl font-semibold">{user.fullName}</h2>
                  <p className="text-sm text-muted-foreground">{user.primaryEmailAddress?.emailAddress}</p>
                  
                  <div className="w-full mt-6">
                    <SignOutButton signOutCallback={() => navigate('/')}>
                      <Button variant="outline" className="w-full gap-2">
                        <LogOut size={16} />
                        Sair da conta
                      </Button>
                    </SignOutButton>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            {/* Profile settings */}
            <Card>
              <CardHeader>
                <CardTitle>Informações pessoais</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Nome completo</Label>
                  <Input 
                    id="name" 
                    value={name} 
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Seu nome completo"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="email">E-mail</Label>
                  <Input 
                    id="email" 
                    type="email" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                    placeholder="seu@email.com"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="phone">WhatsApp</Label>
                  <Input 
                    id="phone" 
                    value={phone} 
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="(00) 00000-0000"
                  />
                </div>
              </CardContent>
              <CardFooter>
                <Button 
                  onClick={handleSave} 
                  disabled={saving}
                  className="bg-gold hover:bg-gold-light text-background"
                >
                  {saving ? 'Salvando...' : 'Salvar alterações'}
                  {!saving && <Save size={16} className="ml-2" />}
                </Button>
              </CardFooter>
            </Card>
          </div>
        </motion.div>
      </div>
      <Footer />
    </div>
  );
};

export default Profile;
