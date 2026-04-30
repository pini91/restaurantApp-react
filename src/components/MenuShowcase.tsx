import { Link } from 'react-router-dom'
import wineImg from '../assets/imgs/homePage/wine.jpg'

interface MenuItem {
  name: string
  desc: string
  price: string
}

interface MenuPanelProps {
  sectionLabel: string
  heading: string
  items: MenuItem[]
  img: string
  imgAlt: string
  reverse?: boolean
}

const LUNCH_ITEMS: MenuItem[] = [
  { name: 'Grilled Salmon',   desc: 'Lemon herb butter, seasonal vegetables',    price: '$28' },
  { name: 'Garden Risotto',   desc: 'Roasted asparagus, parmesan, truffle oil',  price: '$22' },
  { name: 'Braised Duck',     desc: 'Red wine reduction, creamy mash',           price: '$34' },
  { name: 'Burrata Salad',    desc: 'Heirloom tomatoes, basil oil, sea salt',    price: '$18' },
]

const DINNER_ITEMS: MenuItem[] = [
  { name: 'Beef Tenderloin',  desc: 'Mushroom demi-glace, roasted potatoes',    price: '$42' },
  { name: 'Sea Bass Fillet',  desc: 'Saffron beurre blanc, fennel salad',        price: '$38' },
  { name: 'Vegetable Tart',   desc: 'Goat cheese, caramelized onion confit',    price: '$24' },
  { name: 'Chocolate Fondant',desc: 'Vanilla ice cream, praline dust',           price: '$14' },
]

function MenuPanel({ sectionLabel, heading, items, img, imgAlt, reverse = false }: MenuPanelProps) {
  const textCol = (
    <div className="col-md-6 d-flex flex-column justify-content-center">
      <span className="label-tag">{sectionLabel}</span>
      <h2 className="mb-4">{heading}</h2>
      <div>
        {items.map((item) => (
          <div key={item.name} className="menu-item-row">
            <div className="flex-grow-1">
              <span className="menu-item-name">{item.name}</span>
              <span className="menu-item-desc">{item.desc}</span>
            </div>
            <span className="menu-item-price">{item.price}</span>
          </div>
        ))}
      </div>
    </div>
  )

  const imgCol = (
    <div className="col-md-6">
      <img src={img} alt={imgAlt} className="menu-showcase-img" />
    </div>
  )

  return (
    <div className="row align-items-center g-5 mb-5">
      {reverse ? <>{imgCol}{textCol}</> : <>{textCol}{imgCol}</>}
    </div>
  )
}

export default function MenuShowcase() {
  return (
    <section className="section-y bg-white">
      <div className="container-xl px-4">

        <div className="text-center mb-5">
          <span className="label-tag">What We Serve</span>
          <h2 className="fw-bold">A Menu Built Around You</h2>
        </div>

        <MenuPanel
          sectionLabel="Lunch Favourites"
          heading="Midday Plates"
          items={LUNCH_ITEMS}
          img="https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?auto=format&fit=crop&w=700&q=80"
          imgAlt="Colourful lunch dish"
        />

        <MenuPanel
          sectionLabel="Dinner Selection"
          heading="Evening Cuisine"
          items={DINNER_ITEMS}
          img={wineImg}
          imgAlt="Dinner and wine"
          reverse
        />

        <div className="text-center mt-2">
          <Link to="/menu" className="btn btn-primary rounded-pill px-5 py-2">
            View Full Menu <i className="fa-solid fa-arrow-right ms-2" />
          </Link>
        </div>

      </div>
    </section>
  )
}
