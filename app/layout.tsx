import type { Metadata } from "next";
import { Jost } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import { SidebarProvider } from "./contexts/SidebarContext";
import { SwitchRoadmapProvider } from "./contexts/SwitchRoadmapContext";
import { SettingsModalProvider } from "./contexts/SettingsModalContext";
import { CurrentCommentIdProvider } from "./contexts/CurrentCommentContext";

const jost = Jost({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Product Feedback",
    template: "%s | Product Feedback",
  },
  description:
    "A simple and interactive app that lets users share feedback, suggest new features, and vote on ideas to help improve the product.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${jost.className} antialiased`}>
        <div>
          <SettingsModalProvider>
            <SwitchRoadmapProvider>
              <CurrentCommentIdProvider>
                <SidebarProvider>{children}</SidebarProvider>
              </CurrentCommentIdProvider>
            </SwitchRoadmapProvider>
          </SettingsModalProvider>
        </div>
        <Toaster />
      </body>
    </html>
  );
}
