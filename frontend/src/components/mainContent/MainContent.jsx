import './mainContent.css'

const MainContent = () => {
  return (
    <main className="main-content">
      <section id="about">
        <h2>Welcome to Our Academy</h2>
        <p>
          Join us to learn self-discipline, confidence, and physical fitness through martial arts.
        </p>
      </section>

      <section id="classes">
        <h2>Our Classes</h2>
        <ul>
          <li>Karate</li>
          <li>Taekwondo</li>
          <li>Jiu-Jitsu</li>
          <li>Kickboxing</li>
          <li>Self-Defense</li>
        </ul>
      </section>
    </main>
  );
};

export default MainContent;