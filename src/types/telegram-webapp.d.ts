interface TelegramWebApp {
  WebApp: {
    initDataUnsafe: {
      user?: {
        id: number;
        username: string;
        first_name: string;
      };
      start_param?: string;
    };
    ready: () => void;
    clipboard: {
      writeText: (text: string) => Promise<void>;
    };
    shareUrl: (url: string, text?: string) => void;
    switchInlineQuery: (query: string) => void;
  }
}

interface Window {
  Telegram?: TelegramWebApp;
}