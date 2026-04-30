const BANNER_IMG =
  'https://images.unsplash.com/photo-1424847651672-bf20a4b0982b?auto=format&fit=crop&w=1400&q=80'

export default function FeatureBanner() {
  return (
    <section
      className="feature-banner"
      style={{ backgroundImage: `url('${BANNER_IMG}')` }}
      aria-label="Chef quote"
    >
      <div className="feature-banner-overlay" />
      <div className="container-xl px-4 position-relative py-5">
        <div className="row">
          <div className="col-md-7 col-lg-5">
            <blockquote className="feature-quote">
              "We don&apos;t just cook food — we create moments that stay with
              you long after the last bite."
            </blockquote>
            <span className="feature-author">— Chef Maria Luca, Head Chef</span>
          </div>
        </div>
      </div>
    </section>
  )
}
