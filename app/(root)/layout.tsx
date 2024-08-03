import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "../globals.css";
import { Sidebar } from "@/components/sidebar/sidebar";
import { Provider } from "../providers/provider";

const poppins = Poppins({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "CodeRally",
  description: "Welcome to CodeRally!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <Provider>
        <body className={poppins.className}>
          <Sidebar />
          {children}
        </body>
      </Provider>
    </html>
  );
}
