"use client";

import { ThemeProvider } from "next-themes";

interface Props {
  children: React.ReactNode
}

export function Providers({ children }: Props) {
  return <ThemeProvider
    attribute="class"
    enableSystem={true}
    defaultTheme="system"
  >
    {children}
  </ThemeProvider>
}
