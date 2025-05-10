
interface CalEvent {
  action: string;
  callback: (data?: any) => void;
}

interface CalNamespace {
  q: any[];
  ns: Record<string, any>;
  initNamespace: (namespace: string) => void;
  destroy?: () => void;
  loaded: boolean;
}

interface CalFunction {
  (command: "init", options: { origin: string }): void;
  (command: "inline", options: {
    elementOrSelector: string;
    calLink: string;
    config?: {
      theme?: "dark" | "light";
      hideEventTypeDetails?: boolean;
      layout?: "month_view" | "week_view" | "day_view" | "compact";
      [key: string]: any;
    };
  }): void;
  (command: "on", event: CalEvent): void;
  (command: string, ...args: any[]): void;
  ns: Record<string, any>;
  q: any[];
  loaded: boolean;
}

declare global {
  interface Window {
    Cal?: CalFunction;
  }
}
