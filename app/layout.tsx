import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Ruri's Shop | Digital Depot",
  description: "Premium digital products, editing apps, entertainments, VPNs, and boosting services.",
  openGraph: {
    title: "Ruri's Shop",
    description: "Your go-to digital depot for premium accounts and services.",
    url: "https://rurika.shop",
    siteName: "Ruri's Shop",
    type: "website",
    // If you want your cute cat logo to appear in the link preview, 
    // upload the picture to Imgur (or similar) and paste the direct image link below!
    images: [
      {
        url: "https://i.imgur.com/YOUR_IMAGE_LINK_HERE.png", // Replace this with your actual image link, or delete this whole images block if you don't want a picture!
      },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}