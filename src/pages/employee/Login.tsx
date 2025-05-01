
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
        navigate("/dashboard");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  return (
    <>
      <Header />
      <section className="min-h-[80vh] flex items-center justify-center relative overflow-hidden mt-4">
        {/* Background Effects */}
        <div className="absolute inset-0 z-0">
          <div className="absolute top-20 right-20 w-48 h-48 bg-gold/10 rounded-full filter blur-3xl animate-float" />
          <div className="absolute bottom-20 left-20 w-48 h-48 bg-gold/5 rounded-full filter blur-3xl animate-float" style={{ animationDelay: "1s" }} />
        </div>

        <div className="container max-w-md z-10">
          <div className="animate-fade-up" style={{ animationDuration: "0.7s" }}>
            <Card className="glass border-gold/20 shadow-xl">
              <CardHeader className="space-y-2">
                <CardTitle className="text-2xl text-center text-gold">Portal do Colaborador</CardTitle>
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
                            <Input {...field} autoComplete="username" disabled={isLoading} />
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
                      className="w-full bg-gold hover:bg-gold-light text-background" 
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
      </section>
    </>
  );
};

export default LoginPage;
