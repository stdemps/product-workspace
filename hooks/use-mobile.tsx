"use client"

import * as React from "react"

const MOBILE_BREAKPOINT = 640
const COMPACT_BREAKPOINT = 1024

function useBreakpoint(breakpoint: number) {
  const [below, setBelow] = React.useState(false)

  React.useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${breakpoint - 1}px)`)
    const onChange = (e: MediaQueryListEvent) => {
      setBelow(e.matches)
    }
    mql.addEventListener("change", onChange)
    setBelow(mql.matches)
    return () => mql.removeEventListener("change", onChange)
  }, [breakpoint])

  return !!below
}

/** Below 640px — phone-sized viewports */
export function useIsMobile() {
  return useBreakpoint(MOBILE_BREAKPOINT)
}

/** Below 1024px — tablet and below */
export function useIsCompact() {
  return useBreakpoint(COMPACT_BREAKPOINT)
}
