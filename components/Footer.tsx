export default function Footer() {
  return (
    <footer>
      <div className="wrap">
        <div className="brand-f">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/assets/logo-mark.png"
            alt=""
            width={20}
            height={20}
            style={{ opacity: 0.85, width: 20, height: 20, objectFit: 'contain' }}
          />
          Somenta
        </div>

        <div className="links">
          <a href="#">Terms of Service</a>
          <a href="#">Privacy Policy</a>
          <a href="mailto:hello@joinsomenta.com">hello@joinsomenta.com</a>
        </div>

        <div className="copy">&copy; 2026 Somenta LLC</div>
      </div>
    </footer>
  )
}
