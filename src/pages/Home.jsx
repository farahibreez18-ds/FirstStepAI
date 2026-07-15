import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import FeatureMenu from "../components/FeatureMenu";
import Footer from "../components/Footer";

function Home() {
  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <Navbar />
      <Hero />
      <FeatureMenu />
      <Footer />
    </div>
  );
}

export default Home;