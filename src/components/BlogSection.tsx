interface Post {
  id: number
  img: string
  date: string
  title: string
  excerpt: string
}

const POSTS: Post[] = [
  {
    id: 1,
    img: 'https://images.unsplash.com/photo-1497034825429-c343d7c6a68f?auto=format&fit=crop&w=500&q=80',
    date: 'April 12, 2026',
    title: 'The Art of a Perfect Breakfast Plate',
    excerpt:
      'Mornings deserve more than a rushed bite. Discover our approach to crafting the ideal start to your day.',
  },
  {
    id: 2,
    img: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=500&q=80',
    date: 'March 28, 2026',
    title: 'Seasonal Ingredients and Why They Matter',
    excerpt:
      'Our head chef explains how locally sourced produce shapes a different menu every season.',
  },
  {
    id: 3,
    img: 'https://images.unsplash.com/photo-1474722883778-792e7890ab3e?auto=format&fit=crop&w=500&q=80',
    date: 'March 15, 2026',
    title: 'Pairing Wine with a Multi-Course Dinner',
    excerpt:
      "A sommelier's practical guide to making every course shine with exactly the right pour.",
  },
]

export default function BlogSection() {
  return (
    <section className="section-y bg-beige">
      <div className="container-xl px-4">

        <div className="text-center mb-5">
          <span className="label-tag">Stories &amp; Craft</span>
          <h2 className="fw-bold">From Our Kitchen</h2>
        </div>

        <div className="row g-4">
          {POSTS.map(({ id, img, date, title, excerpt }) => (
            <div key={id} className="col-md-6 col-lg-4">
              <article className="card-brand h-100 d-flex flex-column">
                <img src={img} alt={title} className="blog-img" />
                <div className="p-4 d-flex flex-column flex-grow-1">
                  <p className="blog-date mb-2">{date}</p>
                  <h3 className="fs-6 mb-2 flex-grow-1">{title}</h3>
                  <p className="text-muted small mb-3">{excerpt}</p>
                  <span className="link-brand">
                    Read more <i className="fa-solid fa-arrow-right" />
                  </span>
                </div>
              </article>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
