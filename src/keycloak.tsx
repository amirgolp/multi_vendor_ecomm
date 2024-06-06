import Keycloak from 'keycloak-js'
import keycloakConfig from './keycloak-config'

const keycloak = new Keycloak({
  url: keycloakConfig.url,
  realm: keycloakConfig.realm,
  clientId: keycloakConfig.clientId
})

keycloak.onAuthError = () => {
  console.error('Authentication error')
}

keycloak.onAuthLogout = () => {
  console.warn('User logged out')
}

keycloak.onAuthRefreshError = () => {
  console.error('Failed to refresh the token')
}

keycloak.onAuthSuccess = () => {
  console.log('Authentication successful')
}

export default keycloak
