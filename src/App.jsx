
import "./App.css";
import { useState } from "react";

const dishes = [
  {
    name: "Tajine Traditionnel",
    description: "Tajine marocain préparé avec des épices authentiques.",
    price: "85 DH",
    image: "https://images.unsplash.com/photo-1547592180-85f173990554?w=800",
  },
  {
    name: "Couscous Royal",
    description: "Semoule délicate, légumes frais et saveurs du Maroc.",
    price: "95 DH",
    image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800",
  },
  {
    name: "Pastilla Marocaine",
    description: "Une spécialité traditionnelle douce et croustillante.",
    price: "75 DH",
    image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=800",
  },
];

function App() {
  const [reservation, setReservation] = useState({
    name: "",
    phone: "",
    guests: "2",
    date: "",
    time: "",
    message: "",
  });

  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  function handleChange(e) {
    setReservation({
      ...reservation,
      [e.target.name]: e.target.value,
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    setLoading(true);
    setError("");
    setSuccess(false);

    try {
      const response = await fetch(
        "/api/reservations",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...reservation,
            guests: Number(reservation.guests),
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Une erreur est survenue.");
      }

      setSuccess(true);

      setReservation({
        name: "",
        phone: "",
        guests: "2",
        date: "",
        time: "",
        message: "",
      });

      console.log("Reservation saved:", data.reservation);
    } catch (err) {
      setError(
        err.message || "Impossible de contacter le serveur."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="app">
      <header className="navbar">
        <a href="#home" className="logo">
          LA MAISON<span>.</span>
          <small>RESTAURANT MAROCAIN</small>
        </a>

        <nav>
          <a href="#home">Accueil</a>
          <a href="#menu">Notre Menu</a>
          <a href="#about">À propos</a>
          <a href="#contact">Contact</a>
        </nav>

        <a href="#reservation" className="nav-button">
          Réserver une table
        </a>
      </header>

      <section className="hero" id="home">
        <div className="hero-content">
          <p className="subtitle">✦ CUISINE MAROCAINE AUTHENTIQUE ✦</p>
          <h1>
            Le goût du Maroc,
            <br />
            <span>dans chaque bouchée.</span>
          </h1>
          <p className="hero-description">
            Découvrez une expérience culinaire unique,
            entre tradition marocaine et élégance moderne.
          </p>
          <a href="#menu" className="primary-button">
            Découvrir notre menu →
          </a>
        </div>

        <div className="hero-bottom">
          <span>TRADITION</span>
          <span>PASSION</span>
          <span>AUTHENTICITÉ</span>
        </div>
      </section>

      <section className="menu-section" id="menu">
        <div className="section-heading">
          <p className="section-label">✦ NOS SPÉCIALITÉS ✦</p>
          <h2>Un voyage au cœur du Maroc</h2>
          <p>
            Des recettes traditionnelles préparées avec amour
            et des ingrédients soigneusement sélectionnés.
          </p>
        </div>

        <div className="menu-grid">
          {dishes.map((dish, index) => (
            <article className="menu-card" key={dish.name}>
              <div className="dish-image">
                <img src={dish.image} alt={dish.name} />
                <span>0{index + 1}</span>
              </div>

              <div className="menu-info">
                <h3>{dish.name}</h3>
                <p>{dish.description}</p>
                <div className="dish-footer">
                  <strong>{dish.price}</strong>
                  <a href="#reservation">Commander →</a>
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="menu-action">
          <a href="#contact" className="outline-button">
            Découvrir notre restaurant
          </a>
        </div>
      </section>

      <section className="about-section" id="about">
        <div className="about-image">
          <img
            src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1000"
            alt="Ambiance du restaurant"
          />
        </div>

        <div className="about-content">
          <p className="section-label">✦ NOTRE HISTOIRE ✦</p>
          <h2>
            Plus qu'un restaurant,
            <span> une tradition.</span>
          </h2>
          <p>
            LA MAISON célèbre la richesse de la gastronomie
            marocaine. Nous associons les recettes de nos
            traditions à une touche de modernité pour vous
            offrir un moment inoubliable.
          </p>
          <p>
            Chaque plat raconte une histoire, chaque saveur
            vous rapproche de l'authenticité du Maroc.
          </p>
          <a href="#contact" className="primary-button">
            Nous découvrir →
          </a>
        </div>
      </section>

      <section className="contact-section" id="contact">
        <div className="section-heading">
          <p className="section-label">✦ NOUS CONTACTER ✦</p>
          <h2>Votre table vous attend.</h2>
          <p>
            Réservez votre table et profitez d'une expérience
            culinaire marocaine authentique.
          </p>
        </div>

        <div className="contact-content">
          <div className="contact-card">
            <span className="contact-icon">⌖</span>
            <h3>Notre adresse</h3>
            <p>Oujda, Maroc</p>
          </div>

          <div className="contact-card">
            <span className="contact-icon">◷</span>
            <h3>Nos horaires</h3>
            <p>Tous les jours : 12h00 – 23h00</p>
          </div>

          <div className="contact-card">
            <span className="contact-icon">✉</span>
            <h3>Réservation</h3>
            <p>Réservez directement en ligne.</p>
          </div>
        </div>

        <div className="reservation-container" id="reservation">
          <div className="reservation-heading">
            <p className="section-label">✦ RÉSERVATION ✦</p>
            <h2>Réservez votre table</h2>
            <p>Nous serons ravis de vous accueillir.</p>
          </div>

          {success ? (
            <div className="reservation-success">
              <h3>Merci pour votre réservation !</h3>
              <p>
                Votre réservation a été enregistrée avec succès.
              </p>
              <button
                className="primary-button"
                onClick={() => setSuccess(false)}
              >
                Nouvelle réservation
              </button>
            </div>
          ) : (
            <form className="reservation-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Nom complet</label>
                <input
                  type="text"
                  name="name"
                  placeholder="Votre nom"
                  value={reservation.name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>Téléphone</label>
                <input
                  type="tel"
                  name="phone"
                  placeholder="Votre numéro de téléphone"
                  value={reservation.phone}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>Nombre de personnes</label>
                <select
                  name="guests"
                  value={reservation.guests}
                  onChange={handleChange}
                >
                  <option value="1">1 personne</option>
                  <option value="2">2 personnes</option>
                  <option value="3">3 personnes</option>
                  <option value="4">4 personnes</option>
                  <option value="5">5 personnes</option>
                  <option value="6">6 personnes</option>
                  <option value="7">7 personnes</option>
                  <option value="8">8 personnes</option>
                </select>
              </div>

              <div className="form-group">
                <label>Date de réservation</label>
                <input
                  type="date"
                  name="date"
                  min={new Date().toISOString().split("T")[0]}
                  value={reservation.date}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>Heure</label>
                <select
                  name="time"
                  value={reservation.time}
                  onChange={handleChange}
                  required
                >
                  <option value="">Choisir une heure</option>
                  <option value="12:00">12:00</option>
                  <option value="13:00">13:00</option>
                  <option value="14:00">14:00</option>
                  <option value="19:00">19:00</option>
                  <option value="20:00">20:00</option>
                  <option value="21:00">21:00</option>
                  <option value="22:00">22:00</option>
                </select>
              </div>

              <div className="form-group full-width">
                <label>Demandes spéciales (facultatif)</label>
                <textarea
                  name="message"
                  placeholder="Votre message..."
                  rows="4"
                  value={reservation.message}
                  onChange={handleChange}
                />
              </div>

              {error && (
                <p className="reservation-error full-width">
                  {error}
                </p>
              )}

              <button
                type="submit"
                className="primary-button full-width"
                disabled={loading}
              >
                {loading
                  ? "Envoi en cours..."
                  : "Confirmer ma réservation →"}
              </button>
            </form>
          )}
        </div>
      </section>

      <footer className="footer">
        <a href="#home" className="logo">
          LA MAISON<span>.</span>
        </a>
        <p>© 2026 LA MAISON. Tous droits réservés.</p>
        <a href="#home">Retour en haut ↑</a>
      </footer>
    </div>
  );
}

export default App;
