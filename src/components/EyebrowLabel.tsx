interface Props {
  text: string
  /** Extra classes on the flex wrapper — use 'justify-content-center' to centre. */
  className?: string
}

/**
 * Small eyebrow label used above section headings.
 * Renders an orange pip + uppercase brand text.
 */
export default function EyebrowLabel({ text, className = '' }: Props) {
  return (
    <div className={`eyebrow-label d-flex align-items-center gap-2 mb-3 ${className}`}>
      <span className="eyebrow-pip" aria-hidden="true" />
      <span className="text-brand-orange text-uppercase fw-semibold extra-small letter-spacing-wide">
        {text}
      </span>
    </div>
  )
}
