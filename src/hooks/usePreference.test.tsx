import { renderHook, act } from '@testing-library/react'
import { assert, beforeEach, describe, expect, it, vi } from 'vitest'
import { z } from 'zod'

import usePreference from './usePreference'

// ℹ️ Key points:
// renderHook — the right tool for testing hooks in isolation, no need to wrap in a component
// act() — required when calling the updater since it triggers a state update
// beforeEach(() => localStorage.clear()) — prevents test pollution between cases
// localStorage is available in jsdom (the default test environment) with no mocking needed

describe('usePreference', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it('returns the initial preference when nothing is saved', () => {
    const { result } = renderHook(() => usePreference('theme', 'light'))

    expect(result.current[0]).toBe('light')
  })

  it('restores preference from localStorage on mount', () => {
    localStorage.setItem('theme', JSON.stringify('dark'))

    const { result } = renderHook(() => usePreference('theme', 'light'))

    expect(result.current[0]).toBe('dark')
  })

  it('updates state and persists to localStorage', () => {
    const { result } = renderHook(() => usePreference('theme', 'light'))

    act(() => {
      result.current[1]('dark')
    })

    expect(result.current[0]).toBe('dark')
    expect(localStorage.getItem('theme')).toBe('"dark"')
  })

  it('falls back to initial preference when localStorage contains malformed JSON', () => {
    localStorage.setItem('theme', 'not-valid-json{{{')

    const { result } = renderHook(() => usePreference('theme', 'light'))

    expect(result.current[0]).toBe('light')
  })

  it('restores saved value when it passes schema validation', () => {
    localStorage.setItem('theme', JSON.stringify('dark'))

    const { result } = renderHook(() =>
      usePreference('theme', 'light', z.enum(['light', 'dark'])),
    )

    expect(result.current[0]).toBe('dark')
  })

  it('falls back to initial preference when saved value fails schema validation', () => {
    localStorage.setItem('theme', JSON.stringify('invalid-value'))

    const { result } = renderHook(() =>
      usePreference('theme', 'light', z.enum(['light', 'dark'])),
    )

    expect(result.current[0]).toBe('light')
  })

  it('does not call lazy initializer when a valid saved value exists', () => {
    localStorage.setItem('theme', JSON.stringify('dark'))
    const initializer = vi.fn(() => 'light' as const)

    renderHook(() => usePreference('theme', initializer))

    expect(initializer).not.toHaveBeenCalled()
  })

  it('works with non-string types (objects)', () => {
    const { result } = renderHook(() =>
      usePreference('settings', { lang: 'en' }),
    )

    act(() => {
      result.current[1]({ lang: 'fr' })
    })

    expect(result.current[0]).toEqual({ lang: 'fr' })

    const saved = localStorage.getItem('settings')
    assert(saved !== null, 'Expected settings to be saved in localStorage')
    expect(JSON.parse(saved)).toEqual({ lang: 'fr' })
  })
})
