import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Loader from "./components/Loader";
import { lazy, Suspense, useState, useEffect, useCallback } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGLTF } from "@react-three/drei";

gsap.registerPlugin(ScrollTrigger);
useGLTF.preload("/models/apple_watch_ultra_4.glb");

const ProductViewer = lazy(() => import("./components/ProductViewer"));
const Health = lazy(() => import("./components/Health"));
const Features = lazy(() => import("./components/Features"));
const Footer = lazy(() => import("./components/Footer"));

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

  

  if (!loaded) {
    return <Loader onFinish={handleLoaderFinish} />;
  }

  return (
    <main className="bg-black">
      <Navbar />
      <Hero />
      <Suspense fallback={null}>
        <ProductViewer />
      </Suspense>
      <Suspense fallback={null}>
        <Health />
      </Suspense>
      <Suspense fallback={null}>
        <Features />
      </Suspense>
      <Suspense fallback={null}>
        <Footer />
      </Suspense>
    </main>
  );
}

export default App;
