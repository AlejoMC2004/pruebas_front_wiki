// app/layout.js
import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";

export const metadata = {
  title: {
    default: "Wiki · Grupo de Investigación CVAIL",
    template: "%s | Wiki CVAIL",
  },
  description: "Wiki del grupo de investigación en Visión Computacional",
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
