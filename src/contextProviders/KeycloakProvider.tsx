import React, { ReactNode, useState, useEffect } from 'react'
import { ReactKeycloakProvider, useKeycloak } from '@react-keycloak/web'
import keycloak from './keycloak'

const KeycloakProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [keycloakInit, setKeycloakInit] = useState(false)
  const [keycloakError, setKeycloakError] = useState<string | null>(null)

  useEffect(() => {
    keycloak
      .init({
        onLoad: 'check-sso',
        silentCheckSsoRedirectUri:
          window.location.origin + '/silent-check-sso.html'
      })
      .then((authenticated) => {
        setKeycloakInit(true)
        if (!authenticated) {
          console.warn('User is not authenticated')
        }
      })
      .catch((error) => {
        console.error('Failed to initialize Keycloak:', error)
        setKeycloakError('Failed to initialize Keycloak')
      })
  }, [])

  if (keycloakError) {
    return <div>Error: {keycloakError}</div>
  }

  if (!keycloakInit) {
    return <div>Loading...</div>
  }

  return (
    <ReactKeycloakProvider authClient={keycloak}>
      {children}
    </ReactKeycloakProvider>
  )
}

export default KeycloakProvider
