import type { Metadata } from "next";
import Toasts from "@/components/toasts";
import "./globals.css";

export const metadata: Metadata = {
  title: "My Library",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <div className="isolate">
          <Toasts>{children}</Toasts>
        </div>
      </body>
    </html>
  );
}
