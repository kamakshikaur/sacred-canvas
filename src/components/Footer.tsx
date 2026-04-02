import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="fixed bottom-0 left-0 w-full z-40 pointer-events-none">
      <div className="flex items-center justify-center px-8 py-5 pointer-events-auto">
        <div
          className="flex flex-col items-center px-8 py-3"
          style={{
            background: "rgba(10, 5, 6, 0.6)",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            border: "1px solid rgba(212, 165, 116, 0.1)",
          }}
        >
          <Link
            to="/contact"
            className="font-body text-xs tracking-[0.25em] uppercase text-foreground/60 hover:text-secondary slow-transition"
          >
            Get in Touch
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
