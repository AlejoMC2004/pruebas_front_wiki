// app/layout.js
import "./globals.css";

export const metadata = {
  title: {
    default: "Wiki · Grupo de Investigación CV",
    template: "%s | Wiki CV Group",
  },
  description: "Wiki del grupo de investigación en Visión Computacional",
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
