import React from 'react'
import { MoonIcon, SunIcon } from 'lucide-react'

function toggleMode(darkMode: boolean) {
  const htmlEl = document.querySelector('html')
  if (!htmlEl) return
  htmlEl.classList.toggle('dark', darkMode)
}

function initDarkMode() {
  return window.matchMedia('(prefers-color-scheme: dark)').matches
}

export default function App() {
  const [darkMode, setDarkMode] = React.useState(initDarkMode)

  const handleClick: React.MouseEventHandler<HTMLButtonElement> = (_e) => {
    const nextDarkMode = !darkMode
    setDarkMode(nextDarkMode)
  }

  React.useEffect(() => {
    toggleMode(darkMode)
  }, [darkMode])

  return (
    <div className="container mx-auto flex min-h-screen items-start justify-between gap-4 p-3">
      <h1 className="text-2xl font-bold">Vite + Shadcn Starter</h1>
      <button
        onClick={handleClick}
        className="bg-foreground text-background hover:bg-foreground/80 cursor-pointer rounded-full p-2 transition-colors"
      >
        {darkMode ? <SunIcon /> : <MoonIcon />}
      </button>
    </div>
  )
}
