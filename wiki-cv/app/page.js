// app/page.js
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import HeroSection from "@/components/home/HeroSection";
import PublicationsPreview from "@/components/home/PublicationsPreview";
import NewsPreview from "@/components/home/NewsPreview";
import { getHomeSummary } from "@/lib/api";

export const metadata = {
  title: "Inicio · Wiki CV Group",
};

export default async function HomePage() {
  const { stats, latestPapers, latestNews, about } = await getHomeSummary();

  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <Navbar />
      <main style={{ flex: 1 }}>
        <HeroSection about={about} stats={stats} />
        <PublicationsPreview papers={latestPapers} />
        <NewsPreview news={latestNews} />
      </main>
      <Footer />
    </div>
  );
}
