import React, { createContext, useState, useContext, ReactNode } from 'react'

import { ConfigProvider, theme } from 'antd'

interface ThemeContextProps {
  toggleTheme: () => void
  isDarkMode: boolean
}

const ThemeContext = createContext<ThemeContextProps | undefined>(undefined)

export const ThemeProvider: React.FC<{ children: ReactNode }> = ({
  children
}) => {
  const [isDarkMode, setIsDarkMode] = useState(false)

  const toggleTheme = () => {
    setIsDarkMode((prevMode) => !prevMode)
  }

  const currentTheme = isDarkMode ? theme.darkAlgorithm : theme.defaultAlgorithm

  return (
    <ThemeContext.Provider value={{ toggleTheme, isDarkMode }}>
      <ConfigProvider theme={{ algorithm: currentTheme }}>
        {children}
      </ConfigProvider>
    </ThemeContext.Provider>
  )
}

export const useTheme = (): ThemeContextProps => {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
}
