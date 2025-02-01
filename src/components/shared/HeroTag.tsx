interface HeroTagProps {
  children: React.ReactNode;
}

const HeroTag = ({ children }: HeroTagProps) => {
  return (
    <span className="inline-block px-3 py-1 rounded-full text-sm bg-gold/10 text-gold mb-6 animate-fade-up hover:bg-gold/20 transition-colors duration-300">
      {children}
    </span>
  );
};

export default HeroTag;