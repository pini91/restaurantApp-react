import { Link } from 'react-router-dom'
import fruitsImg from '../assets/imgs/homePage/fruits.jpg'
import saladsImg from '../assets/imgs/homePage/salads.jpg'
import meatsImg  from '../assets/imgs/homePage/meats.jpg'

const CATEGORIES = [
  {
    label:   'Breakfast',
    path:    '/breakfast',
    img:     fruitsImg,
    alt:     'Fresh fruit breakfast',
    desc:    'Morning classics and healthy seasonal starts',
  },
  {
    label:   'Lunch',
    path:    '/lunch',
    img:     saladsImg,
    alt:     'Lunch salads',
    desc:    'Light bites and hearty midday plates',
  },
  {
    label:   'Dinner',
    path:    '/dinner',
    img:     meatsImg,
    alt:     'Dinner meats',
    desc:    'An evening of refined flavours',
  },
] as const

export default function CategoryCards() {
  return (
    <section className="section-y bg-beige">
      <div className="container-xl px-4">

        <div className="text-center mb-5">
          <span className="label-tag">Our Menu</span>
          <h2 className="fw-bold">Cuisines for Every Hour</h2>
        </div>

        <div className="row g-4 justify-content-center">
          {CATEGORIES.map(({ label, path, img, alt, desc }) => (
            <div key={label} className="col-sm-10 col-md-6 col-lg-4">
              <div className="card-brand p-4 text-center h-100 d-flex flex-column align-items-center">
                <div className="category-circle">
                  <img src={img} alt={alt} />
                </div>
                <h3 className="fs-5 mb-2">{label}</h3>
                <p className="text-muted small mb-3 flex-grow-1">{desc}</p>
                <Link to={path} className="link-brand">
                  Explore <i className="fa-solid fa-arrow-right" />
                </Link>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
