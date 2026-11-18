import { useRef, useEffect, Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import gsap from "gsap";
import { Html } from "@react-three/drei";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Scene from "./three/Scene";
import { useMediaQuery } from "react-responsive";

gsap.registerPlugin(ScrollTrigger);

export default function ProductViewer() {
  const mainRef = useRef(null);
  const sceneRef = useRef(null);
  const progressRef = useRef(0);

  const isMobile = useMediaQuery({
    query: "(max-width: 767px)"
  });

  useEffect(() => {
    const timeline = gsap
      .timeline({
        scrollTrigger: {
          trigger: mainRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: 1,
          onUpdate: (self) => {
            progressRef.current = self.progress;
          },
        },
      })
      .to(sceneRef.current, {
        ease: "none",
        x: "-25vw",
        y: isMobile ? "40vh" : "75vh",
      })
      .to(sceneRef.current, {
        ease: "none",
        x: "25vw",
        y: isMobile ? "80vh" : "150vh",
      })
      .to(sceneRef.current, {
        ease: "none",
        x: "-25vw",
        y: isMobile ? "120vh" : "225vh",
      });

    return () => {
      timeline.scrollTrigger?.kill();
      timeline.kill();
    };
  }, [isMobile]);

  useGSAP(() => {
    gsap.utils
      .toArray("#product-viewer .title, #product-viewer .copy")
      .forEach((text) => {
        gsap.fromTo(
          text,
          {
            y: 40,
            opacity: 0,
          },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: text,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          },
        );
      });
  }, []);

  return (
    <section id="product-viewer" ref={mainRef}>
      <section className="intro">
        <p className="title title-top">Apple Watch</p>
        <p className="title title-bottom">Ultra 4</p>

        <div ref={sceneRef} className="canvas">
          <Canvas>
            <Suspense fallback={<Html>loading...</Html>}>
              <Scene progressRef={progressRef} isMobile={isMobile} />
            </Suspense>
          </Canvas>
        </div>
      </section>

      <section className="feature">
        <p className="spacer"></p>
        <p className="copy">
          <span className="desktop-text">
            Durability. Ultra 4 is built to last with a rugged titanium case and
            a display crafted from sapphire crystal — one of the strongest
            naturally occurring materials on Earth. And it’s MIL-STD-810H tested
            for extreme environments.9
          </span>

          <span className="mobile-text">
            Durability. Built with a rugged titanium case and sapphire crystal
            for extreme environments.
          </span>
        </p>
      </section>

      <section className="feature">
        <p className="copy copy-left">
          <span className="desktop-text">
            Health Sensing System. Redesigned with more capable optical and
            electrical sensors and larger, more power-efficient green LEDs, the
            sensing system unlocks deeper health and fitness insights.
          </span>

          <span className="mobile-text">
            Health Sensing System. Advanced sensors deliver deeper health and
            fitness insights.
          </span>
        </p>
        <p className="spacer"></p>
      </section>

      <section className="feature">
        <p className="spacer"></p>
        <p className="copy">
          <span className="desktop-text">
            Action button. One quick press gives you precise, physical control
            over a variety of customizable functions — like starting a workout,
            marking a segment, advancing to the next interval, or turning on the
            flashlight.
          </span>

          <span className="mobile-text">
            Action button. One press gives you quick access to workouts,
            intervals, and the flashlight.
          </span>
        </p>
      </section>
    </section>
  );
}
