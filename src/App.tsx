import { PageLayout } from '@/layouts'
import { ThemeContextProvider } from '@/providers'

export default function App() {
  return (
    <ThemeContextProvider>
      <PageLayout className="space-y-12"></PageLayout>
    </ThemeContextProvider>
  )
}
