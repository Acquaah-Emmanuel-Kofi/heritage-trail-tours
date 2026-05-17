interface Window {
  PaystackPop?: {
    setup(config: {
      key: string;
      email: string;
      amount: number;
      currency: 'NGN' | 'USD' | 'GHS' | 'ZAR';
        metadata: {
        email: string;
      };
      callback: (response: PaystackResponse) => void;
      onClose?: () => void;
    }): {
      openIframe: () => void;
    };
  };
}