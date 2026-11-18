export default function Hero() {
  return (
    <section id="hero">
      <div>
        <h1>
          <img src="/logo.svg" alt="Apple logo" /> Watch <span>Ultra 4</span>
        </h1>
        <h2>
          A battery you <br /> can’t outrun.
        </h2>
      </div>
      <div className="container">
        <img
          className="img img1"
          src="/hero.jpg"
          alt="White Watch Ultra 4"
          width={1868}
          height={664}
        />
        <img
          className="img img2"
          src="/hero2.jpg"
          alt="Black Watch Ultra 4"
          width={1868}
          height={664}
        />
      </div>
      <button>Buy</button>
      <p>From $799 or $66.58/mo. for 12 months.</p>
    </section>
  );
}
