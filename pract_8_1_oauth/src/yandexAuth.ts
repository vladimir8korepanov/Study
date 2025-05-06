// const CLIENT_ID = 'ef65f055cb1b4a15ae31f33a652e8d8f';
// const REDIRECT_URI = 'http://localhost:5173/callback';

// export const getYandexOAuthUrl = () => {
//   const url = new URL('https://oauth.yandex.ru/authorize');
//   url.searchParams.append('response_type', 'token');
//   url.searchParams.append('client_id', CLIENT_ID);
//   url.searchParams.append('redirect_uri', REDIRECT_URI);
//   return url.toString();
// };
// export const initYandexAuthWidget = async (containerId: string) => {
//   try {
//     const { handler } = await window.YaAuthSuggest.init(
//       {
//         client_id: import.meta.env.VITE_YANDEX_CLIENT_ID,
//         response_type: "token",
//         redirect_uri: import.meta.env.VITE_REDIRECT_URI,
//       },
//       containerId,
//       { view: "button" }
//     );
    
//     const data = await handler();
//     return data.access_token;
//   } catch (error) {
//     console.error("Yandex auth error:", error);
//     throw error;
//   }
// };
export const YANDEX_OAUTH_CONFIG = {
  client_id: 'ef65f05c6db4af5ae3f133a652e8d8f',
  redirect_uri: 'https://localhost:5173/callback',
  auth_url: 'https://oauth.yandex.ru/authorize',
  scope: 'login:email login:info'
};

export const getYandexOAuthUrl = () => {
  const params = new URLSearchParams({
    response_type: 'code',
    client_id: YANDEX_OAUTH_CONFIG.client_id,
    redirect_uri: YANDEX_OAUTH_CONFIG.redirect_uri,
    scope: YANDEX_OAUTH_CONFIG.scope
  });
  
  return `${YANDEX_OAUTH_CONFIG.auth_url}?${params}`;
};