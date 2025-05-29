
export interface ConversionEvent {
  tag: string;
  action: string;
  element: string;
  section: string;
  timestamp: string;
  sessionData: SessionData;
  metadata?: Record<string, any>;
}

export interface SessionData {
  timeOnPage: number;
  scrollDepth: number;
  device: string;
  referrer: string;
  userAgent: string;
  viewport: string;
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  // Advanced tracking fields
  traffic_source: string;
  is_returning_user: boolean;
  bounce_probability_score: number;
  engagement_hotspot_percent: number;
  perceived_page_speed_score: number;
  last_funnel_step: string;
  time_per_section: Record<string, number>;
  ctr_elements: Record<string, number>;
  form_fields_filled: string[];
  form_fields_left_blank: string[];
}

export interface ElementCTRData {
  element_id: string;
  impressions: number;
  clicks: number;
  ctr: number;
}

export interface SectionTimeData {
  section_id: string;
  time_spent: number;
  entry_time: number;
  exit_time: number;
}

export interface FormInteractionData {
  field_name: string;
  filled: boolean;
  time_spent: number;
  attempts: number;
}
