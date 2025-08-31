import { useCallback, useState } from 'react'
import type z from 'zod'

type UsePreferenceResult<T> = [
  preference: T,
  setPreference: (newPreference: T) => void,
]

function initPreference(
  key: string,
  initialPreference: unknown,
  schema?: z.ZodType,
): unknown {
  const getInitialValue = () =>
    typeof initialPreference === 'function'
      ? (initialPreference as () => unknown)()
      : initialPreference

  const saved = localStorage.getItem(key)

  if (saved === null) return getInitialValue()

  let parsed: unknown
  try {
    parsed = JSON.parse(saved)
  } catch {
    return getInitialValue()
  }

  if (schema) {
    const result = schema.safeParse(parsed)
    return result.success ? result.data : getInitialValue()
  }

  return parsed
}

// Overload 1: schema provided → type inferred from schema
function usePreference<S extends z.ZodType>(
  key: string,
  initialPreference: z.infer<S> | (() => z.infer<S>),
  schema: S,
): UsePreferenceResult<z.infer<S>>

// Overload 2: no schema → caller provides T explicitly
function usePreference<T>(
  key: string,
  initialPreference: T | (() => T),
): UsePreferenceResult<T>

function usePreference<T = unknown>(
  key: string,
  initialPreference: T | (() => T),
  schema?: z.ZodType,
): UsePreferenceResult<T> {
  const [preference, setPreference] = useState<T>(
    () => initPreference(key, initialPreference, schema) as T,
  )

  const updatePreference = useCallback(
    (newPreference: T) => {
      setPreference(newPreference)
      localStorage.setItem(key, JSON.stringify(newPreference))
    },
    [key],
  )

  return [preference, updatePreference] as const
}

export default usePreference
