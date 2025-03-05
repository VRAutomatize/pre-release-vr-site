
interface HeroActionsProps {
  children: React.ReactNode;
  delay?: string;
}

const HeroActions = ({ children, delay = "0.6s" }: HeroActionsProps) => {
  return (
    <div 
      className="flex flex-col sm:flex-row gap-4 animate-fade-up" 
      style={{ animationDelay: delay }}
    >
      {children}
    </div>
  );
};

export default HeroActions;
