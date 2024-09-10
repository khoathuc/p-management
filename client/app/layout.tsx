import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import favicon from "../public/notion.png";
import { Toaster } from "sonner";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { ModalProvider } from "@/components/providers/modal-provider";
import { cn } from "@/lib/utils";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Notion - Bring your ideas to life.",
  description: "Bring your ideas to life",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn("bg-background dark:bg-[#1F1F1F]")}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
          storageKey="notion-theme-2"
        >
          <Toaster position="bottom-center" />
          <ModalProvider />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
