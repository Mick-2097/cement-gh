export default {
  KEYCLOAK: {
    url: 'https://auth.dev.nlplay.ru/auth/',
    realm: 'proptech',
    clientId: 'smc'
  },
  API: {
    main: {
      root:
        import.meta.env.VITE_ENV === 'local'
          ? import.meta.env.VITE_API_URL
          : 'https://api.smc.dev.nlplay.ru/api/'
    }
  }
}
