import type { Metadata } from "next";
import "./globals.css";


export const metadata: Metadata = {
  title: "Password Generator",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`font-sans bg-Xprimary dark:bg-Xprimary-dark `}>
        {children}
      </body>
    </html>
  );
}
