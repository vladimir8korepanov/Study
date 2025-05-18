export const YANDEX_OAUTH_CONFIG = {
  client_id: 'VITE_YANDEX_CLIENT_ID',
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