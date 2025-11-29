import type { Metadata } from "next";
import "./globals.css";
import Loading from "@/components/Loading";

export const metadata: Metadata = {
  title: "SA Personeel - Premium Recruitment Services",
  description: "Exclusieve recruitment diensten voor toptalent en toonaangevende werkgevers",
  icons: {
    icon: [
      { url: '/icon.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="nl">
      <body className="antialiased">
        <Loading />
        {children}
      </body>
    </html>
  );
}

