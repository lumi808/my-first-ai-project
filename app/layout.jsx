import "./globals.css";
import Script from 'next/script';
import { Analytics } from "@vercel/analytics/react";
import cx from "classnames";
import { sfPro, inter } from "./fonts";
import Nav from "@/components/layout/nav";
import { Suspense } from "react";

export const metadata = {
  title: "AI Date Assistant",
  description:
    "Meet your AI Date expert.",
  themeColor: "#FFF",
  icons: {
    icon: '/favicon.ico'
  }
};

// iOS Safari viewport unit correction
const IOS_SAFARI_VIEWPORT_UNIT_CORRECTION = `
var customViewportCorrectionVariable = 'vh';

function setViewportProperty(doc) {
  var prevClientHeight;
  var customVar = '--' + ( customViewportCorrectionVariable || 'vh' );
  function handleResize() {
    var clientHeight = doc.clientHeight;
    if (clientHeight === prevClientHeight) return;
    requestAnimationFrame(function updateViewportHeight(){
      doc.style.setProperty(customVar, (clientHeight * 0.01) + 'px');
      prevClientHeight = clientHeight;
    });
  }
  handleResize();
  return handleResize;
}
window.addEventListener('resize', setViewportProperty(document.documentElement));
`;

export default async function RootLayout({
  children,
}) {
  return (
    <html lang="en">
      <Script id="safari-viewport-fix">{IOS_SAFARI_VIEWPORT_UNIT_CORRECTION}</Script>
      <body className={cx(sfPro.variable, inter.variable)}>
        <div className="fixed h-full w-full bg-gradient-to-tl from-cyan-200 via-red-100 to-rose-200" />
        <Suspense fallback="...">
          <Nav />
        </Suspense>
        <main className="flex min-h-full w-full flex-col items-center justify-center pt-16 relative">
          {children}
        </main>
        <Analytics />
      </body>
    </html>
  );
}
