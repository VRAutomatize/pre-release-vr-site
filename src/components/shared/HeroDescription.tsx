interface HeroDescriptionProps {
  children: React.ReactNode;
  delay?: string;
}

const HeroDescription = ({ children, delay = "0.4s" }: HeroDescriptionProps) => {
  return (
    <p 
      className="text-lg md:text-2xl text-foreground/80 mb-12 animate-fade-up" 
      style={{ animationDelay: delay }}
    >
      {children}
    </p>
  );
};

export default HeroDescription;