import "~/styles/globals.css";

import { GeistSans } from "geist/font/sans";
import { type Metadata } from "next";
import { SessionProvider } from "next-auth/react";
import { auth } from "~/server/auth";
import { Providers } from "~/components/Providers";
import Navbar from "~/components/Navbar";

export const metadata: Metadata = {
  title: "linkmmik",
  description: "linkmmik - url manager",
  icons: [{ rel: "icon", url: "/icon.ico" }],
};

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {

  const session = await auth()

  return (
    <html lang="en" className={`${GeistSans.variable}`}>
      <body>
      <SessionProvider session={session}>
        <Providers>
          {children}
        </Providers>
      </SessionProvider>
      </body>
    </html>
  );
}
