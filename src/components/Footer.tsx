// src/components/Footer.tsx
export default function Footer() {
  return (
    <footer className="footer footer-center p-4 bg-base-100 text-base-content border-t">
      <div>
        <p>
          © {new Date().getFullYear()} Movie Explorer — Built with Next.js,
          Tailwind, DaisyUI
        </p>
      </div>
    </footer>
  )
}