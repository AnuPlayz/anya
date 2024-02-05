"use client"
import "@/styles/globals.css"
import { AnonAadhaarProvider } from "anon-aadhaar-react";

import {
  ThirdwebProvider,
  metamaskWallet,
  coinbaseWallet,
  walletConnect,
  localWallet,
  embeddedWallet,
} from "@thirdweb-dev/react";

import { fontSans } from "@/lib/fonts"
import { cn } from "@/lib/utils"
import { SiteHeader } from "@/components/site-header"
import { TailwindIndicator } from "@/components/tailwind-indicator"
import { ThemeProvider } from "@/components/theme-provider"

interface RootLayoutProps {
  children: React.ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <>
      <ThirdwebProvider
        activeChain="mumbai"
        clientId="db6a42c09cffd69f9948764333016f18"
        supportedWallets={[
          metamaskWallet(),
          coinbaseWallet({ recommended: true }),
          walletConnect(),
          localWallet(),
          embeddedWallet({
            auth: {
              options: [
                "email",
                "google",
                "apple",
                "facebook",
              ],
            },
          }),
        ]}
      > 
        <AnonAadhaarProvider _appId="db6a42c09cffd69f9948764333016f18">
          <html lang="en" suppressHydrationWarning>
            <head>
              <title>Pixel Vote</title>
              <link rel="icon" href="/logo.svg" />
            </head>
            <body
              className={cn(
                "min-h-screen bg-background font-sans antialiased",
                fontSans.variable
              )}
            >
              <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
                <div className="relative flex min-h-screen flex-col">
                  <SiteHeader />
                  <div className="flex-1">{children}</div>
                </div>
                <TailwindIndicator />
              </ThemeProvider>
            </body>
          </html>
        </AnonAadhaarProvider>
      </ThirdwebProvider>
    </>
  )
}
