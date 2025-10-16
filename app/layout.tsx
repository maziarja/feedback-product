import type { Metadata } from "next";
import { Jost } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import { SidebarProvider } from "./contexts/SidebarContext";
import { CurrentCommentIdProvider } from "./contexts/currentCommentContext";

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
  // icons: {
  //   icon: "@/favicon.png",
  // },
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
          <CurrentCommentIdProvider>
            <SidebarProvider>{children}</SidebarProvider>
          </CurrentCommentIdProvider>
        </div>
        <Toaster />
      </body>
    </html>
  );
}
