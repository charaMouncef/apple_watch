import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Health() {
  useGSAP(() => {
    gsap.utils.toArray("#health h3, #health h2, #health p").forEach((text) => {
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
    <section id="health">
      <div id="tracking">
        <h3>Advanced Health and Fitness Tracking</h3>
        <h2>Run with all your heart.</h2>
        <img
          src="/healths/health_tracking.jpg"
          alt="health_tracking"
          width={1868}
          height={1924}
          loading="lazy"
        />
        <p className="desktop-text">
          Heart data is fundamental in tracking your overall health and
          performance. Redesigned with more capable optical and electrical
          sensors, the{" "}
          <span>all‑new Health Sensing System works with the S11 chip</span> to
          provide higher-frequency heart monitoring. The updated sensors and
          larger, more power-efficient green LEDs give you richer heart data for
          more meaningful insights.
        </p>
        <p className="mobile-text">
          <span>all‑new Health Sensing System works with the S11 chip</span>
          delivers higher-frequency heart monitoring and richer heart data
          through advanced sensors and power-efficient LEDs.
        </p>
      </div>
      <div id="ready">
        <img
          src="/healths/health_ready.jpg"
          alt="health_ready"
          width={2058}
          height={1022}
          loading="lazy"
        />

        <p className="desktop-text">
          <span>Ready advice.</span> The new readiness experience can help you
          determine your capacity to take on the day by providing you with one
          simple score. Your score is determined each morning by analyzing your
          recent activity, vitals, and sleep — and it adjusts as you go about
          your day. So whether you’re training for a race or juggling a busy
          schedule, you can spend your energy on what matters most.
        </p>

        <p className="mobile-text">
          <span>Ready advice.</span> Get one simple readiness score every
          morning, based on your activity, vitals, and sleep. It adjusts
          throughout the day to help you manage your energy.
        </p>
      </div>
      <div id="tracking_hrv">
        <img
          src="/healths/health_tracking_hrv.jpg"
          alt="health_hrv"
          width={1926}
          height={1678}
          loading="lazy"
        />
        <div className="content">
          <p>
            <span>HRV? Check.</span>
            Heart rate variability (HRV) reflects how your body handles stress
            and recovery. Apple Watch Ultra 4 tracks HRV every five minutes,
            helping you monitor your health and recovery throughout the day.
          </p>

          <div className="right">
            <p>
              <span>60x</span>
              <span>
                more frequent background heart rate readings than Ultra 3
              </span>
            </p>
            <p>
              <span>24x</span>
              <span>more frequent HRV readings than Ultra 3</span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
