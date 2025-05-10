
interface HeroTitleProps {
  children: React.ReactNode;
  delay?: string;
}

const HeroTitle = ({ children, delay = "0.2s" }: HeroTitleProps) => {
  return (
    <h1 
      className="text-3xl md:text-6xl font-bold mb-8 leading-tight animate-fade-up whitespace-pre-line text-gold" 
      style={{ animationDelay: delay }}
    >
      {children}
    </h1>
  );
};

export default HeroTitle;
