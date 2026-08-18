import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ЕВРОПА ПРОМ — промышленные поставки из Европы",
  description: "Оборудование, комплектующие и материалы из Европы. Закупка, ВЭД и доставка до предприятия под ключ.",
  openGraph: {
    title: "Европейская точность. Без границ.",
    description: "Промышленные поставки из Европы под ключ.",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "ЕВРОПА ПРОМ" }],
    locale: "ru_RU",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Европейская точность. Без границ.",
    description: "Промышленные поставки из Европы под ключ.",
    images: ["/og.png"],
  },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body>{children}</body>
    </html>
  );
}
