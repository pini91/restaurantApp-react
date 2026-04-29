import { Link } from 'react-router-dom'
import seaFoodImg from '../assets/imgs/homePage/sea-food.jpg'

/**
 * Full-viewport dark cinematic hero with:
 * - Centered serif headline + supporting text + single CTA
 * - Decorative botanical leaf framing (CSS font icons)
 * - Oversized food platter that overlaps into the section below
 */
export default function HeroSection() {
  return (
    <section className="hero-section pt-5">
      {/* Decorative leaves — purely atmospheric, hidden on mobile */}
      <span className="hero-leaf hero-leaf--left" aria-hidden="true">
        <i className="fa-solid fa-leaf" />
      </span>
      <span className="hero-leaf hero-leaf--right" aria-hidden="true">
        <i className="fa-solid fa-leaf" />
      </span>

      {/* Content block — container handles centering on all screen sizes */}
      <div className="container-xxl text-center mt-5 pt-4 pt-md-5 position-relative px-4">
        <p className="hero-eyebrow mb-4">Premium Culinary Experience</p>

        <h1 className="hero-headline mx-auto mb-4">
          Delicious food &amp; a wonderful eating experience
        </h1>

        <p className="hero-subtext mx-auto mb-5">
          Where every dish tells a story of craftsmanship, fresh seasonal
          ingredients, and genuine hospitality.
        </p>

        <Link to="/bookForm" className="btn btn-primary-brand px-5 py-3">
          BOOK A TABLE
        </Link>
      </div>

      {/* Oversized platter — positioned to overlap the section below */}
      <div className="hero-platter-wrap">
        <img
          src={seaFoodImg}
          alt="Chef's signature seafood platter"
          className="hero-platter"
        />
      </div>
    </section>
  )
}
