interface PageHeroProps {
  title: string;
  subtitle: string;
  tag?: string;
  backgroundImage?: string;
  children?: React.ReactNode;
}

const PageHero = ({ title, subtitle, tag, backgroundImage, children }: PageHeroProps) => {
  return (
    <section className="min-h-[90vh] flex items-center relative overflow-hidden mt-16">
      {/* Background Image */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${backgroundImage || 'https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?auto=format&fit=crop&w=2000'})`,
          opacity: 0.1
        }}
      />

      {/* Background Effects */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-20 left-20 w-72 h-72 bg-gold/20 rounded-full filter blur-3xl animate-float" />
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-gold/10 rounded-full filter blur-3xl animate-float" style={{ animationDelay: "2s" }} />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          {tag && (
            <span className="inline-block px-3 py-1 rounded-full text-sm bg-gold/10 text-gold mb-6 animate-fade-up">
              {tag}
            </span>
          )}
          
          <h1 className="text-4xl md:text-7xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-gold to-gold-light leading-tight animate-fade-up" style={{ animationDelay: "0.2s" }}>
            {title}
          </h1>
          
          <p className="text-lg md:text-2xl text-foreground/80 mb-12 max-w-3xl animate-fade-up" style={{ animationDelay: "0.4s" }}>
            {subtitle}
          </p>

          <div className="animate-fade-up" style={{ animationDelay: "0.6s" }}>
            {children}
          </div>
        </div>
      </div>
    </section>
  );
};

export default PageHero;