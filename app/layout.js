
import "./globals.css";
import SmoothScroll from "./scrollSmooth/SmoothScroll";



export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
    >
      <SmoothScroll/>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
