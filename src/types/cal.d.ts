
interface CalAPI {
  (action: string, arg1?: string, arg2?: any): void;
  ns: {
    [namespace: string]: (action: string, arg1?: any) => void;
  };
  destroy: () => void;
  on: (options: { action: string; callback: (data: any) => void }) => void;
}

interface Window {
  Cal?: CalAPI;
}
