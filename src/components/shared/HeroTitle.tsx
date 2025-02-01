interface HeroTitleProps {
  children: React.ReactNode;
  delay?: string;
}

const HeroTitle = ({ children, delay = "0.2s" }: HeroTitleProps) => {
  const renderContent = () => {
    if (typeof children === 'string') {
      return children;
    }
    if (Array.isArray(children)) {
      return children.map((child, index) => {
        if (typeof child === 'string') {
          return child;
        }
        return child;
      });
    }
    return children;
  };

  return (
    <h1 
      className="text-4xl md:text-7xl font-bold mb-8 leading-tight animate-fade-up whitespace-pre-line" 
      style={{ animationDelay: delay }}
    >
      {renderContent()}
    </h1>
  );
};

export default HeroTitle;