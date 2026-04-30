import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import '../styles/home.css'
import fruitsImg from '../assets/imgs/homePage/fruits.jpg'
import meatsImg from '../assets/imgs/homePage/meats.jpg'
import seaFoodImg from '../assets/imgs/homePage/sea-food.jpg'
import salads from '../assets/imgs/homePage/salads.jpg'
import wine from '../assets/imgs/homePage/wine.jpg'


export default function HomePage() {
  return (
    <div>
      <Navbar />
      <main className="hero-main">
        <div className="hero-main__overlay" />
        <div className="hero-main__content">
          <span className="hero-main__label">Welcome to Health &amp; Taste</span>
          <h1 className="hero-main__headline">
            Cuisine Crafted<br />from the Heart
          </h1>
          <p className="hero-main__sub">
            Fresh ingredients, bold flavours, and warmth on every plate.
          </p>
          <div className="hero-main__actions">
            <Link to="/bookForm" className="hero-main__cta-primary">
              <i className="fa-solid fa-calendar-days" /> Make a Reservation
            </Link>
            <Link to="/edit" className="hero-main__cta-secondary">
              Edit Reservation
            </Link>
          </div>
          <div className="hero-main__social">
            <a href="#" aria-label="Facebook"><i className="fa-brands fa-facebook" /></a>
            <a href="#" aria-label="Instagram"><i className="fa-brands fa-instagram" /></a>
            <a href="#" aria-label="Twitter"><i className="fa-brands fa-twitter" /></a>
          </div>
        </div>
      </main>

      {/* ABOUT ------------------------------------------ */}
      <section className="about-section">
        <div className="about-section__inner">
          <div className="about-section__img-col">
            <div className="about-section__img-wrap">
              <img
                src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80"
                alt="Restaurant interior"
              />
            </div>
            <div className="about-section__badge">
              <span className="about-section__badge-number">15+</span>
              <span className="about-section__badge-label">Years of excellence</span>
            </div>
          </div>
          <div className="about-section__text-col">
            <span className="section-label">About Us</span>
            <h2 className="about-section__heading">
              Discover Our<br />Restaurant Story
            </h2>
            <p className="about-section__body">
              Born from a love of honest, seasonal cooking, Health &amp; Taste has
              been bringing people together around the table since 2010. Every dish
              reflects the care of our chefs, the quality of our suppliers, and a
              deep respect for flavour.
            </p>
            <p className="about-section__body">
              We believe great food doesn't need to be complicated — it just needs
              to be made well, with intention, and shared generously.
            </p>
            <Link to="/menu" className="about-section__cta">
              Explore Our Menu <i className="fa-solid fa-arrow-right" />
            </Link>
          </div>
        </div>
      </section>

      {/* SPECIALITY -------------------------------------- */}
      <section className="speciality-section">
        <div className="speciality-section__inner">
          <div className="speciality-section__header">
            <span className="section-label">What We Do Best</span>
            <h2>Our Speciality Cuisine</h2>
            <div className="speciality-section__tabs">
              <Link to="/breakfast" className="speciality-tab">Breakfast</Link>
              <Link to="/lunch"     className="speciality-tab">Lunch</Link>
              <Link to="/dinner"    className="speciality-tab">Dinner</Link>
            </div>
          </div>
          <div className="speciality-section__grid">
            {[
              { img: fruitsImg,  alt: 'Fruits',    title: 'Fruits',    desc: 'Fresh seasonal selections, vibrant and unprocessed' },
              { img: salads,     alt: 'Salads',    title: 'Salads',    desc: 'Garden-to-table greens, dressed with care' },
              { img: meatsImg,   alt: 'Meats',     title: 'Meats',     desc: 'Ethically sourced, slow-cooked to perfection' },
              { img: seaFoodImg, alt: 'Sea Food',  title: 'Sea Food',  desc: 'Ocean-fresh catches, simply prepared' },
            ].map(({ img, alt, title, desc }) => (
              <div key={title} className="speciality-card">
                <div className="speciality-card__img-wrap">
                  <img src={img} alt={alt} />
                </div>
                <h3 className="speciality-card__title">{title}</h3>
                <p className="speciality-card__desc">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WINE -------------------------------------------- */}
      <section className="wine-section">
        <div className="wine-section__inner">
          <div className="wine-section__img-col">
            <img src={wine} alt="Wine selection" className="wine-section__img" />
          </div>
          <div className="wine-section__text-col">
            <span className="section-label">Drinks &amp; Pairings</span>
            <h2 className="wine-section__heading">A Curated<br />Wine Selection</h2>
            <p className="wine-section__body">
              From crisp whites to bold reds, our sommelier has hand-picked every
              bottle to complement the seasons and your meal. Whether you're
              celebrating or simply unwinding, the right wine is waiting for you.
            </p>
            <Link to="/menu" className="wine-section__cta">
              Discover Our Cellar <i className="fa-solid fa-arrow-right" />
            </Link>
          </div>
        </div>
      </section>

      {/* HOURS ------------------------------------------- */}
      <section className="hours-section">
        <div className="hours-section__inner">
          <div className="hours-section__header">
            <span className="section-label">We're Open</span>
            <h2 className="hours-section__heading">Opening Hours</h2>
            <p className="hours-section__sub">
              Walk in or{' '}
              <Link to="tel:+12345678910" className="hours-section__phone-link">
                call us at +12345 678 910
              </Link>{' '}
              to reserve your table.
            </p>
          </div>
          <div className="hours-section__cards">
            <div className="hours-card">
              <i className="fa-solid fa-sun hours-card__icon" />
              <h3 className="hours-card__days">Monday – Friday</h3>
              <p className="hours-card__time">09:00 am – 10:00 pm</p>
            </div>
            <div className="hours-card hours-card--accent">
              <i className="fa-solid fa-star hours-card__icon" />
              <h3 className="hours-card__days">Saturday – Sunday</h3>
              <p className="hours-card__time">09:00 am – 11:00 pm</p>
            </div>
          </div>
          <div className="hours-section__cta-wrap">
            <Link to="/bookForm" className="hours-section__cta">
              <i className="fa-solid fa-calendar-days" /> Make a Reservation
            </Link>
          </div>
        </div>
      </section>

      <footer className="site-footer">
        <span>&copy; Health &amp; Taste</span>
        <span className="site-footer__sep">·</span>
        <span>Website created by Brenda Loncaric</span>
      </footer>
    </div>
  )
}
