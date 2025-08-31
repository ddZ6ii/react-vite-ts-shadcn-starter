import { SelectMode } from '@/components'
import { Heading } from '@/components/ui/heading'
import { TooltipProvider } from '@/components/ui/tooltip'
import { useSystemModeSync } from '@/hooks'

export default function App() {
  useSystemModeSync()

  return (
    <TooltipProvider>
      <div className="container mx-auto flex min-h-screen flex-col gap-8 p-3">
        <header className="flex items-center justify-between gap-4">
          <img src="/vite.svg" alt="" />
          <SelectMode />
        </header>

        <main className="flex-1">
          <Heading as="h2" className="text-center">
            Vite + React + Shadcn Starter
          </Heading>
        </main>
      </div>
    </TooltipProvider>
  )
}
