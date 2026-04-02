import { Link, useLocation } from "react-router-dom";

const Footer = () => {
  const location = useLocation();
  const isHome = location.pathname === "/";

  return (
    <footer className="fixed bottom-0 left-0 w-full z-40 pointer-events-none">
      <div className="flex items-center justify-center gap-8 px-8 py-5 pointer-events-auto">
        <div
          className="flex items-center gap-6 px-8 py-3 rounded-none"
          style={{
            background: "rgba(10, 5, 6, 0.6)",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            border: "1px solid rgba(212, 165, 116, 0.1)",
          }}
        >
          <Link
            to="/"
            className={`font-body text-xs tracking-[0.25em] uppercase slow-transition ${
              isHome ? "text-secondary" : "text-foreground/50 hover:text-foreground/80"
            }`}
          >
            Home
          </Link>
          <div className="w-px h-3 bg-foreground/15" />
          <Link
            to="/contact"
            className="font-body text-xs tracking-[0.25em] uppercase text-foreground/50 hover:text-secondary slow-transition"
          >
            Get in Touch
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
