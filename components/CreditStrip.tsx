export default function CreditStrip() {
  return (
    <div className="credit-strip">
      <div className="wrap">
        <div>
          Grounded practice{' '}
          <span className="credit-dot">◈</span>
          Real relationships{' '}
          <span className="credit-dot">◈</span>
          Consistent rhythm
        </div>
        <div
          style={{
            fontFamily: 'var(--sans)',
            fontSize: '12px',
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            color: 'var(--gold-soft)',
          }}
        >
          Est. with founding members, 2024
        </div>
      </div>
    </div>
  )
}
