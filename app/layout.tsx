import Logo from "./components/Logo";
import "./globals.css";

export const metadata = {
  title: "آی اس پی | چت بات",
  description: "چت بات آی اس پی. یک چت بات برای تمام مشکلات اینترنت.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="flex flex-col justify-center items-center container mx-auto max-h-full px-4">
        {children}
      </body>
    </html>
  );
}
