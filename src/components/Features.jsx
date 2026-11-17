import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cardsList } from "../constants";
gsap.registerPlugin(ScrollTrigger);

export default function Features() {
  const sectionRef = useRef(null);
  const cardsRef = useRef(null);

  useGSAP(
    () => {
      const section = sectionRef.current;
      const cards = cardsRef.current;
      if (!section || !cards) return;

      // Distance needed to bring the final card fully into view. The section's
      // horizontal padding must be excluded, otherwise the last card stays
      // clipped. Clamp to 0 so wide viewports can't produce a negative range.
      const getScrollAmount = () => {
        const styles = getComputedStyle(section);
        const padding =
          (parseFloat(styles.paddingLeft) || 0) +
          (parseFloat(styles.paddingRight) || 0);
        const visibleWidth = Math.max(1, section.clientWidth - padding);

        return Math.max(0, cards.scrollWidth - visibleWidth);
      };

      gsap.to(cards, {
        x: () => -getScrollAmount(),
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top 10%",
          end: () => `+=${Math.max(getScrollAmount(), 1)}`,
          pin: true,
          anticipatePin: 1,
          scrub: 3,
          invalidateOnRefresh: true,
          //markers: true, // Debugging
        },
      });
    },
    { scope: sectionRef },
  );

  return (
    <section id="features" ref={sectionRef}>
      <h2>
        Why Apple is the best place <br /> to buy Apple Watch.
      </h2>

      <div className="cards-list" ref={cardsRef}>
        {cardsList.map((card) => (
          <div className="card" key={card.id}>
            <span>{card.title}</span>
            <h3>{card.description}</h3>
            <div className="spacer"></div>
            <img src={card.img} alt={card.alt} loading="lazy" />
          </div>
        ))}
      </div>
    </section>
  );
}
