import type { MenuItem } from '../types'
import '../styles/imageModal.css'

interface Props {
  item: MenuItem | null
  onClose: () => void
}

export default function ImageModal({ item, onClose }: Props) {
  if (!item) return null

  return (
    <div
      className={`modal-overlay${item ? ' open' : ''}`}
      role="dialog"
      aria-modal="true"
      onClick={onClose}
    >
      <button
        className="modal-close"
        onClick={onClose}
        aria-label="Close modal"
      >
        &times;
      </button>
      <img
        className="modal-content"
        src={item.imagePath}
        alt={item.name}
        onClick={(e) => e.stopPropagation()}
      />
      <div className="modal-caption" onClick={(e) => e.stopPropagation()}>
        <strong>INGREDIENTS:</strong>
        {'\n\n'}
        {item.ingredients.map((ing, i) => (
          <span key={i}>
            - {ing}
            {'\n'}
          </span>
        ))}
      </div>
    </div>
  )
}
