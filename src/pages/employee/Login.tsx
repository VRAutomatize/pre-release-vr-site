
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { EyeIcon, EyeOffIcon, LogInIcon } from "lucide-react";

import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import Header from "@/components/Header";
import { useIsMobile } from "@/hooks/useIsMobile";

// Form schema
const loginSchema = z.object({
  username: z.string().min(1, { message: "Usuário é obrigatório" }),
  password: z.string().min(1, { message: "Senha é obrigatória" }),
});

type LoginFormValues = z.infer<typeof loginSchema>;

const LoginPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();
  const isMobile = useIsMobile();

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const onSubmit = async (data: LoginFormValues) => {
    setIsLoading(true);
    try {
      const success = await login(data.username, data.password);
      if (success) {
        navigate("/employee/dashboard");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  const LoginContent = () => (
    <div className={`${isMobile ? 'mobile-full-width min-h-screen flex items-center justify-center bg-background' : 'min-h-[80vh] flex items-center justify-center relative overflow-hidden mt-4'}`}>
      {/* Background Effects - only for desktop */}
      {!isMobile && (
        <div className="absolute inset-0 z-0">
          <div className="absolute top-20 right-20 w-48 h-48 bg-gold/10 rounded-full filter blur-3xl animate-float" />
          <div className="absolute bottom-20 left-20 w-48 h-48 bg-gold/5 rounded-full filter blur-3xl animate-float" style={{ animationDelay: "1s" }} />
        </div>
      )}

      <div className={`${isMobile ? 'w-full px-4' : 'container max-w-md'} z-10`}>
        <div className="animate-fade-up" style={{ animationDuration: "0.7s" }}>
          <Card className={`${isMobile ? 'border-0 shadow-none bg-transparent' : 'glass border-gold/20 shadow-xl'}`}>
            <CardHeader className="space-y-2">
              <div className="flex justify-center mb-6">
                <img 
                  src="/lovable-uploads/2a347c53-83d5-4886-b387-c38347ea3fbc.png" 
                  alt="VR Link" 
                  className={`object-contain ${isMobile ? 'h-20 w-20' : 'h-16 w-16'}`}
                />
              </div>
              <CardTitle className={`text-center text-gold ${isMobile ? 'text-2xl' : 'text-2xl'}`}>
                Portal do Colaborador
              </CardTitle>
              <CardDescription className="text-center">
                Entre com suas credenciais para acessar
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                  <FormField
                    control={form.control}
                    name="username"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Usuário</FormLabel>
                        <FormControl>
                          <Input 
                            {...field} 
                            autoComplete="username" 
                            disabled={isLoading}
                            className={isMobile ? 'h-12 text-base' : ''}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Senha</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Input
                              {...field}
                              type={showPassword ? "text" : "password"}
                              autoComplete="current-password" 
                              disabled={isLoading}
                              className={isMobile ? 'h-12 text-base pr-12' : 'pr-12'}
                            />
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              className="absolute right-0 top-0 h-full px-3"
                              onClick={togglePasswordVisibility}
                            >
                              {showPassword ? 
                                <EyeOffIcon className="h-4 w-4" /> : 
                                <EyeIcon className="h-4 w-4" />
                              }
                            </Button>
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <Button 
                    type="submit" 
                    className={`w-full bg-gold hover:bg-gold-light text-background ${isMobile ? 'h-12 text-base' : ''}`}
                    disabled={isLoading}
                  >
                    {isLoading ? "Entrando..." : "Entrar"}
                    {!isLoading && <LogInIcon className="ml-2 h-4 w-4" />}
                  </Button>
                </form>
              </Form>
            </CardContent>
            <CardFooter className="flex justify-center text-sm text-muted-foreground">
              <p>VR Automatize © {new Date().getFullYear()}</p>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );

  // Mobile renders without header/navbar
  if (isMobile) {
    return <LoginContent />;
  }

  // Desktop includes header
  return (
    <>
      <Header />
      <section>
        <LoginContent />
      </section>
    </>
  );
};

export default LoginPage;
