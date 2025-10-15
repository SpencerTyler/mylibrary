import type { Metadata } from "next";
import Toasts from "@/components/toasts";
import "./globals.css";
import Link from "next/link";
import Profile from "@/components/profile";

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
          <Toasts>
            <section className="p-4 flex flex-col gap-4 min-h-screen">
              <header className="flex flex-row gap-2 justify-between items-center">
                <Link href="/" className="cursor-pointer hover:underline">
                  <h1 className="text-3xl">MyLibrary</h1>
                </Link>
                <Profile />
              </header>
              <div className="grow">{children}</div>
              <footer className="">footer</footer>
            </section>
          </Toasts>
        </div>
      </body>
    </html>
  );
}
