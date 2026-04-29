interface DishCardProps {
  img: string
  title: string
  description: string
  /** Featured card gets an elevated white panel with stronger shadow */
  featured?: boolean
}

export default function DishCard({ img, title, description, featured = false }: DishCardProps) {
  return (
    <div className={`dish-card${featured ? ' dish-card--featured' : ''}`}>
      <div className="dish-card-img-wrapper">
        <img src={img} alt={title} />
      </div>
      <h3 className="dish-card-title">{title}</h3>
      <p className="dish-card-desc">{description}</p>
    </div>
  )
}
