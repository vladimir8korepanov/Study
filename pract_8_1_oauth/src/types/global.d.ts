declare global {
  interface Window {
    YaAuthSuggest: {
      init: (
        config: {
          client_id: string;
          response_type: string;
          redirect_uri: string;
        },
        containerId: string,
        options: { view: string }
      ) => Promise<{ handler: () => Promise<{ access_token: string }> }>;
    };
  }
}

export {};