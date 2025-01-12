import "~/styles/globals.css";

import { GeistSans } from "geist/font/sans";
import { type Metadata } from "next";
import { SessionProvider } from "next-auth/react";
import { auth } from "~/server/auth";
import { Providers } from "~/components/Providers";

export const metadata: Metadata = {
  title: "linkmmik",
  description: "linkmmik - url manager",
  icons: [{ rel: "icon", url: "/icon.ico" }],
};

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {

  return (
    <html lang="en" className={`${GeistSans.variable}`}>
      <body className="font-medium">
      <SessionProvider session={await auth()}>
        <Providers>
          {children}
        </Providers>
      </SessionProvider>
      </body>
    </html>
  );
}
