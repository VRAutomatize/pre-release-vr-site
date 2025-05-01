
import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import Header from "@/components/Header";

const Dashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <>
      <Header />
      <section className="min-h-[80vh] container mx-auto px-4 py-12">
        <div className="glass p-8 rounded-lg border border-gold/20 shadow-lg">
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold mb-2 text-gold">Painel do Colaborador</h1>
            <p className="text-xl">Bem-vindo, {user?.name || "Colaborador"}</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="glass p-6 rounded-lg border border-gold/10">
              <h2 className="text-xl font-semibold mb-4">Status do Sistema</h2>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Serviços Ativos:</span>
                  <span className="text-green-400">24/24</span>
                </div>
                <div className="flex justify-between">
                  <span>Webhook Status:</span>
                  <span className="text-green-400">Conectado</span>
                </div>
                <div className="flex justify-between">
                  <span>Últimos Dados:</span>
                  <span>{new Date().toLocaleDateString()}</span>
                </div>
              </div>
            </div>
            
            <div className="glass p-6 rounded-lg border border-gold/10">
              <h2 className="text-xl font-semibold mb-4">Ações Rápidas</h2>
              <div className="space-y-3">
                <Button 
                  variant="outline"
                  className="w-full justify-start border-gold/20 hover:bg-gold/10"
                >
                  Verificar Solicitações
                </Button>
                <Button 
                  variant="outline"
                  className="w-full justify-start border-gold/20 hover:bg-gold/10"
                >
                  Atualizar Dados
                </Button>
                <Button 
                  variant="outline"
                  className="w-full justify-start border-gold/20 hover:bg-gold/10"
                >
                  Gerar Relatório
                </Button>
              </div>
            </div>
          </div>
          
          <div className="text-center">
            <Button 
              onClick={handleLogout} 
              variant="outline" 
              className="border-gold/20 hover:bg-gold/10"
            >
              Sair do Painel
            </Button>
          </div>
        </div>
      </section>
    </>
  );
};

export default Dashboard;
