import type { FallbackProps } from 'react-error-boundary'

import { ErrorAlert } from '@/components'
import { cn } from '@/utilities'

type ErrorFallbackProps = FallbackProps & {
  className?: string
}

export default function ErrorFallback({
  className,
  error,
  resetErrorBoundary,
}: ErrorFallbackProps) {
  return (
    <div className={cn('grid place-content-center', className)}>
      <ErrorAlert
        errorMessage={error instanceof Error ? error.message : 'Unknown error'}
        onRetry={resetErrorBoundary}
      />
    </div>
  )
}
