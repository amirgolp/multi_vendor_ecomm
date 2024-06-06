import React from 'react'

import { useKeycloak } from '@react-keycloak/web'

const MainPage: React.FC = () => {
  const { keycloak } = useKeycloak()

  const handleLogout = () => {
    keycloak.logout()
  }

  return (
    <div>
      <header>
        {keycloak.authenticated && (
          <button onClick={handleLogout}>Logout</button>
        )}
      </header>
      <main>
        <h1>Welcome to the Main Page</h1>
      </main>
    </div>
  )
}

export default MainPage
