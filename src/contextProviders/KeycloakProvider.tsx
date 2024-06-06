import React, { ReactNode, useState, useEffect } from 'react'

import { ReactKeycloakProvider } from '@react-keycloak/web'
import Cookies from 'universal-cookie'

import { getKeycloak } from '../keycloak.ts'

// @ts-expect-error: explanation
export const onKeycloakEvent = (keycloak) => {
  const cookies = new Cookies()
  const apiBase = import.meta.env.VITE_APP_API_BASE || ''
  const path = apiBase.startsWith('/') ? apiBase : new URL(apiBase).pathname
  // @ts-expect-error: explanation
  return (event) => {
    if (event === 'onAuthSuccess') {
      cookies.set('Authorization', 'Bearer ' + keycloak.token, {
        path: path,
        expires: new Date(
          (keycloak.tokenParsed.exp + keycloak.timeSkew) * 1000
        ),
        sameSite: 'strict'
      })
    } else if (event === 'onAuthLogout') {
      cookies.remove('Authorization', { path: path })
    }
  }
}

const KeycloakProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const keycloak = getKeycloak()
  const [keycloakInit, setKeycloakInit] = useState(false)
  const [keycloakError, setKeycloakError] = useState<string | null>(null)

  useEffect(() => {
    keycloak
      .init({
        onLoad: 'login-required',
        checkLoginIframe: false
      })
      .then((authenticated) => {
        setKeycloakInit(true)
        if (!authenticated) {
          window.location.reload()
        }
      })
      .catch((error) => {
        console.error('Failed to initialize Keycloak:', error)
        setKeycloakError('Failed to initialize Keycloak')
      })
  }, [keycloak])

  if (keycloakError) {
    return <div>Error: {keycloakError}</div>
  }

  if (!keycloakInit) {
    return <div>Loading...</div>
  }

  return (
    <ReactKeycloakProvider
      authClient={keycloak}
      onEvent={onKeycloakEvent(keycloak)}
      initOptions={{
        onLoad: 'check-sso',
        checkLoginIframe: false,
        promiseType: 'native'
      }}
      LoadingComponent={<div />}
    >
      {children}
    </ReactKeycloakProvider>
  )
}

export default KeycloakProvider
