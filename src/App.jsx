import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Health from "./components/Health";
import Features from "./components/Features";
import Footer from "./components/Footer";
import Loader from "./components/Loader";
import { lazy, Suspense, useState, useEffect, useCallback } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGLTF } from "@react-three/drei";

gsap.registerPlugin(ScrollTrigger);
useGLTF.preload("/models/apple_watch_ultra_4.glb");

const ProductViewer = lazy(() => import("./components/ProductViewer"));

function App() {
  const [loaded, setLoaded] = useState(false);

  const handleLoaderFinish = useCallback(() => setLoaded(true), []);

  useEffect(() => {
    const lenis = new Lenis();

    lenis.on("scroll", ScrollTrigger.update);

    const tickerCallback = (time) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(tickerCallback);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(tickerCallback);
      lenis.destroy();
    };
  }, []);

  useEffect(() => {
    if (!loaded) return;

    // Keep trigger positions accurate once the lazy 3D viewer mounts.
    const frame = requestAnimationFrame(() => ScrollTrigger.refresh());
    return () => cancelAnimationFrame(frame);
  }, [loaded]);

  if (!loaded) {
    return <Loader onFinish={handleLoaderFinish} />;
  }

  return (
    <main className="bg-black">
      <Navbar />
      <Hero />
      <ProductViewer />
      <Health />
      <Features />
      <Footer />
    </main>
  );
}

export default App;
