import { Link } from 'react-router-dom'
import '../styles/gallery.css'

const galleryImages = Array.from({ length: 8 }, (_, i) => `/imgs/pexels${i + 1}.jpg`)

export default function GalleryPage() {
  return (
    <div className="gallery-page">
      <button className="homeButton">
        <Link to="/">HOME</Link>
      </button>
      <h1>GALLERY</h1>
      <div className="gallery-grid">
        {galleryImages.map((src, i) => (
          <img key={i} src={src} alt={`Gallery photo ${i + 1}`} loading="lazy" />
        ))}
      </div>
    </div>
  )
}
