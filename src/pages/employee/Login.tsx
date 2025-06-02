
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { EyeIcon, EyeOffIcon, LogInIcon, Smartphone } from "lucide-react";

import { useAuth } from "@/contexts/AuthContext";
import { NativeButton } from "@/components/ui/native-button";
import { NativeInput } from "@/components/ui/native-input";
import { NativeCard } from "@/components/ui/native-card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useIsMobile } from "@/hooks/useIsMobile";

// Form schema
const loginSchema = z.object({
  username: z.string().min(1, { message: "Usuário é obrigatório" }),
  password: z.string().min(1, { message: "Senha é obrigatória" }),
});

type LoginFormValues = z.infer<typeof loginSchema>;

const LoginPage = () => {
  console.log("LoginPage rendering...");
  
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();
  const isMobile = useIsMobile();

  console.log("LoginPage - isMobile:", isMobile);

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  console.log("LoginPage - form initialized");

  const onSubmit = async (data: LoginFormValues) => {
    console.log("LoginPage - onSubmit called with:", data);
    setIsLoading(true);
    try {
      const success = await login(data.username, data.password);
      console.log("LoginPage - login result:", success);
      if (success) {
        navigate("/employee/dashboard");
      }
    } finally {
      setIsLoading(false);
    }
  };

  console.log("LoginPage - about to render JSX");

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center p-4">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-yellow-400/5 rounded-full filter blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-yellow-400/3 rounded-full filter blur-3xl animate-pulse" style={{ animationDelay: "2s" }} />
      </div>

      <div className="relative z-10 w-full max-w-md">
        <div className="animate-fade-in">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="mb-6">
              <img 
                src="/lovable-uploads/2a347c53-83d5-4886-b387-c38347ea3fbc.png" 
                alt="VR Link" 
                className="h-20 w-20 object-contain mx-auto"
              />
            </div>
            <h1 className="text-3xl font-bold text-yellow-400 mb-2">
              Portal do Colaborador
            </h1>
            <p className="text-gray-400 text-sm">
              Entre com suas credenciais para acessar
            </p>
          </div>

          {/* Login Form */}
          <NativeCard variant="elevated" padding="lg" className="mb-6">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="username"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-200">Usuário</FormLabel>
                      <FormControl>
                        <NativeInput 
                          {...field} 
                          placeholder="Digite seu usuário"
                          disabled={isLoading}
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
                      <FormLabel className="text-gray-200">Senha</FormLabel>
                      <FormControl>
                        <NativeInput
                          {...field}
                          type="password"
                          placeholder="Digite sua senha"
                          disabled={isLoading}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <NativeButton 
                  type="submit" 
                  variant="primary"
                  fullWidth
                  loading={isLoading}
                  className="mt-8"
                >
                  {isLoading ? "Entrando..." : "Entrar"}
                  {!isLoading && <LogInIcon className="ml-2 h-5 w-5" />}
                </NativeButton>
              </form>
            </Form>
          </NativeCard>

          {/* Features */}
          <NativeCard variant="glass" padding="md" className="mb-6">
            <div className="flex items-center gap-3 text-sm text-gray-300">
              <Smartphone className="h-5 w-5 text-yellow-400" />
              <span>Interface otimizada para mobile</span>
            </div>
          </NativeCard>

          {/* Footer */}
          <div className="text-center text-sm text-gray-500">
            <p>VR Automatize © {new Date().getFullYear()}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
