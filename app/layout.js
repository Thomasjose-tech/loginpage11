import "./globals.css";
import Head from "next/head";

export const metadata = {
  title: "my-auth-app",
  description: "Register and Login with Tailwind and Next.js",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
      </head>
      <body className="bg-gray-900 text-white">{children}</body>
    </html>
  );
}
