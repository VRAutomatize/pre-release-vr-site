interface HeroTitleProps {
  children: React.ReactNode;
  delay?: string;
}

const HeroTitle = ({ children, delay = "0.2s" }: HeroTitleProps) => {
  return (
    <h1 
      className="text-4xl md:text-7xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-gold to-gold-light leading-tight animate-fade-up" 
      style={{ animationDelay: delay }}
    >
      {children}
    </h1>
  );
};

export default HeroTitle;