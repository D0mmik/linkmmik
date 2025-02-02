"use client"
import {NextUIProvider} from '@nextui-org/react'
import {CSPostHogProvider} from "~/components/PostHogProvider";

export function Providers({children}: { children: React.ReactNode }) {
  return (
    <CSPostHogProvider>
      <NextUIProvider>
        {children}
      </NextUIProvider>
    </CSPostHogProvider>
  )
}