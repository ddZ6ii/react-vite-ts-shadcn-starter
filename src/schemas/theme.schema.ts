import z from 'zod'

// Only the darkMode property is persisted to the local storage
const themeContextSchema = z.boolean()

const _schema = z.object({
  darkMode: z.boolean(),
  toggleDarkMode: z.function({
    input: [],
    output: z.void(),
  }),
})

type ThemeContextValue = z.infer<typeof _schema>

export { type ThemeContextValue, themeContextSchema }
