
import { LucideIcon } from "lucide-react";

export interface CTAVariant {
  id: string;
  title: string;
  description: string;
  buttonText: string;
  icon: LucideIcon;
  urgency: "low" | "medium" | "high";
  color: string;
  bgColor: string;
}

export type SegmentType = 'high_intent' | 'medium_intent' | 'low_intent' | 'price_sensitive' | 'feature_focused' | 'executive';
