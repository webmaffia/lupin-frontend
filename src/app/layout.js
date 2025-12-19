import { Inter } from "next/font/google";
import "../scss/main.scss";

const inter = Inter({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  style: ["normal", "italic"],
  variable: "--font-inter",
});

export const metadata = {
  title: "Lupin Frontend",
  description: "Lupin Frontend with Next.js and SCSS",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
      </body>
    </html>
  );
}
