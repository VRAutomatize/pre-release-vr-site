const About = () => {
  return (
    <section className="py-20 px-4 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-20 -left-20 w-72 h-72 bg-gold/10 rounded-full filter blur-3xl animate-float" />
        <div className="absolute bottom-20 -right-20 w-96 h-96 bg-gold/5 rounded-full filter blur-3xl animate-float" style={{ animationDelay: "2s" }} />
      </div>

      <div className="container mx-auto relative z-10">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center bg-clip-text text-transparent bg-gradient-to-r from-gold to-gold-light">
            Quem Somos
          </h2>
          <div className="space-y-8 text-lg text-foreground/80 glass p-8 rounded-2xl shadow-xl">
            <p className="animate-fade-up" style={{ animationDelay: "0.1s" }}>
              A VR Automatize tem como seu objetivo facilitar o crescimento de outras empresas 
              compartilhando do conhecimento adquirido por inúmeras empresas de ramos e nichos diferentes.
            </p>
            <p className="animate-fade-up" style={{ animationDelay: "0.2s" }}>
              No final das contas, por mais que estejam atendendo clientes diferentes, todos estão 
              atendendo pessoas.
            </p>
            <p className="text-xl font-semibold text-gold animate-fade-up" style={{ animationDelay: "0.3s" }}>
              Na VR Automatize, acreditamos que automações são a base de empresas de sucesso.
            </p>
            <p className="animate-fade-up" style={{ animationDelay: "0.4s" }}>
              Tire o foco do que é repetitivo e cansativo e foque no que realmente importa.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;