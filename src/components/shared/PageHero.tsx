import HeroTag from "./HeroTag";
import HeroTitle from "./HeroTitle";
import HeroDescription from "./HeroDescription";

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
        <div className="max-w-3xl">
          {tag && <HeroTag>{tag}</HeroTag>}
          <HeroTitle>{title}</HeroTitle>
          <HeroDescription>{subtitle}</HeroDescription>
          {children}
        </div>
      </div>
    </section>
  );
};

export default PageHero;