const InfoCards = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto px-4 mt-16">
      <div className="floating-card p-6 rounded-xl animate-fade-up">
        <h3 className="text-xl font-semibold mb-4 text-gold">Sobre a Implementação</h3>
        <p className="text-foreground/80">
          A <span className="text-gold font-medium">implementação</span> é um valor{" "}
          <span className="text-gold font-medium">único</span> que inclui toda a{" "}
          <span className="text-gold font-medium">configuração inicial</span> do sistema,{" "}
          <span className="text-gold font-medium">treinamento</span> da equipe e{" "}
          <span className="text-gold font-medium">personalização</span> do CRM para seu negócio.
        </p>
      </div>

      <div className="floating-card p-6 rounded-xl animate-fade-up" style={{ animationDelay: "0.2s" }}>
        <h3 className="text-xl font-semibold mb-4 text-gold">Sobre a Mensalidade</h3>
        <p className="text-foreground/80">
          A <span className="text-gold font-medium">mensalidade</span> é cobrada{" "}
          <span className="text-gold font-medium">mensalmente</span> e inclui{" "}
          <span className="text-gold font-medium">suporte ilimitado</span>,{" "}
          <span className="text-gold font-medium">atualizações</span> do sistema e{" "}
          <span className="text-gold font-medium">todas as funcionalidades</span> do plano escolhido.
        </p>
      </div>
    </div>
  );
};

export default InfoCards;