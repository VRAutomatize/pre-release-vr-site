const About = () => {
  return (
    <section className="py-20 px-4 bg-secondary/50">
      <div className="container mx-auto">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-8">
            Quem Somos
          </h2>
          <div className="space-y-6 text-lg text-foreground/80">
            <p>
              A VR Automatize tem como seu objetivo facilitar o crescimento de outras empresas 
              compartilhando do conhecimento adquirido por inúmeras empresas de ramos e nichos diferentes.
            </p>
            <p>
              No final das contas, por mais que estejam atendendo clientes diferentes, todos estão 
              atendendo pessoas.
            </p>
            <p className="text-xl font-semibold text-gold">
              Na VR Automatize, acreditamos que automações são a base de empresas de sucesso.
            </p>
            <p>
              Tire o foco do que é repetitivo e cansativo e foque no que realmente importa.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;