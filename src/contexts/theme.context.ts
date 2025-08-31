import { createContext } from 'react'

import type { ThemeContextValue } from '@/schemas'

const ThemeContext = createContext<ThemeContextValue | null>(null)

export default ThemeContext
