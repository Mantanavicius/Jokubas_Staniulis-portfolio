import Hero from "../components/Hero";
import Works from "../components/Works";

const Main = () => {

  return (
    <main className="relative">
      <Hero />
      <section className="relative z-20 mt-[100vh] bg-light">
        <Works />
      </section>
    </main>
  );
};

export default Main;
