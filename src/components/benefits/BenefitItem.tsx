
import { LucideIcon } from "lucide-react";
import { Card } from "@/components/ui/card";

interface BenefitItemProps {
  icon: LucideIcon;
  title: string;
  problem: string;
  solution: string;
  index: number;
}

const BenefitItem = ({ icon: Icon, title, problem, solution, index }: BenefitItemProps) => {
  return (
    <Card 
      className="floating-card p-6 relative overflow-hidden group hover:border-gold/40 transition-all duration-300 rounded-lg"
      style={{
        animationDelay: `${index * 0.2}s`,
      }}
    >
      <div className="absolute -right-20 -top-20 w-40 h-40 bg-gold/5 rounded-full transition-all duration-500 group-hover:bg-gold/10 group-hover:scale-110"></div>
      <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-gold/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      <Icon className="w-12 h-12 text-gold mb-4 relative z-10" />
      <h3 className="text-xl font-semibold mb-2 relative z-10">{title}</h3>
      <p className="text-gold/90 font-medium mb-2 text-sm relative z-10">{problem}</p>
      <p className="text-foreground/80 relative z-10">{solution}</p>
    </Card>
  );
};

export default BenefitItem;
