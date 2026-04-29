import { Link } from 'react-router-dom'
import '../styles/gallery.css'

import pexels1 from '../assets/imgs/gallery/pexels1.jpg'
import pexels2 from '../assets/imgs/gallery/pexels2.jpg'
import pexels3 from '../assets/imgs/gallery/pexels3.jpg'
import pexels4 from '../assets/imgs/gallery/pexels4.jpg'
import pexels5 from '../assets/imgs/gallery/pexels5.jpg'
import pexels6 from '../assets/imgs/gallery/pexels6.jpg'
import pexels7 from '../assets/imgs/gallery/pexels7.jpg'
import pexels8 from '../assets/imgs/gallery/pexels8.jpg'

const galleryImages = [pexels1, pexels2, pexels3, pexels4, pexels5, pexels6, pexels7, pexels8]

export default function GalleryPage() {
  return (
    <div className="gallery-page">
      <div className="gallery-header">
        <Link to=".." className="homeButton">
          <i className="fa-solid fa-arrow-left" /> Back
        </Link>
        <h1>Gallery</h1>
      </div>
      <div className="gallery-grid">
        {galleryImages.map((src, i) => (
          <img key={i} src={src} alt={`Gallery photo ${i + 1}`} loading="lazy" />
        ))}
      </div>
    </div>
  )
}
