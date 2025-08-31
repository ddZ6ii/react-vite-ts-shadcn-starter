import { useCallback, useEffect, useMemo } from 'react'

import { ThemeContext } from '@/contexts'
import { usePreference } from '@/hooks'
import { themeContextSchema } from '@/schemas'

function toggleMode(darkMode: boolean) {
  const htmlEl = document.querySelector('html')
  if (!htmlEl) return
  htmlEl.classList.toggle('dark', darkMode)
}

function initDarkMode() {
  return window.matchMedia('(prefers-color-scheme: dark)').matches
}

export default function ThemeContextProvider({
  children,
}: React.PropsWithChildren) {
  const [darkMode, setDarkMode] = usePreference(
    'dark-mode',
    initDarkMode,
    themeContextSchema,
  )

  const toggleDarkMode = useCallback(() => {
    setDarkMode(!darkMode)
  }, [darkMode, setDarkMode])

  useEffect(() => {
    toggleMode(darkMode)
  }, [darkMode])

  const ctx = useMemo(
    () => ({ darkMode, toggleDarkMode }),
    [darkMode, toggleDarkMode],
  )

  return <ThemeContext value={ctx}>{children}</ThemeContext>
}
