// src/components/Footer.jsx
import { Link } from "react-router-dom";
import {
  Rotate3d,
  Github,
  Linkedin,
  Twitter,
  ShieldCheck,
  Facebook,
} from "lucide-react";

const Footer = () => {
  const footerNav = [
    ["Home", "/"],
    ["Product", "/products"],
    ["Contact", "/contact"],
  ];
  const footerLegal = [
    "Privacy Policy",
    "Terms of Service",
    "Cookie Policy",
    "Data Protection",
    "Security & Compliance",
  ];

  const footerSocial = [
    { Icon: Github, label: "GitHub" },
    { Icon: Linkedin, label: "LinkedIn" },
    { Icon: Twitter, label: "Twitter" },
    { Icon: Facebook, label: "Facebook" },
  ];

  return (
    <footer className="mt-20 border-t border-[var(--border-color)] bg-[var(--header-bg)]">
      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-14 md:grid-cols-[1.3fr_1fr_1fr_0.8fr]">
        {/* Brand / About */}
        <div className="flex flex-col gap-4 pr-4">
          <div className="flex items-center gap-2">
            <Rotate3d size={32} className="opacity-90" />
            <span className="font-logo text-2xl tracking-wide select-none">
              ORBIT
            </span>
          </div>

          <p className="text-sm opacity-80 leading-relaxed">
            ORBIT is an internal CRM platform designed to manage customers,
            leads, projects, and operations with clarity and speed.
          </p>

          <div className="text-sm opacity-70">
            <p>Orbit Technologies Pvt. Ltd.</p>
            <p>MG Road, Bengaluru</p>
            <p>Karnataka, India</p>
          </div>

          <p className="text-xs opacity-60 mt-2">
            © {new Date().getFullYear()} ORBIT CRM. All rights reserved.
          </p>
        </div>

        {/* Navigation */}
        <div className="flex flex-col gap-4">
          <h4 className="text-sm font-semibold uppercase tracking-wide opacity-90">
            Navigation
          </h4>

          <nav className="flex flex-col gap-2 text-sm">
            {footerNav.map(([label, path]) => (
              <Link
                key={label}
                to={path}
                className="relative w-fit opacity-75 transition-all hover:opacity-100
                  after:absolute after:left-0 after:-bottom-0.5 after:h-px after:w-0 after:bg-current after:opacity-40
                  after:transition-all after:duration-300 hover:after:w-full"
              >
                {label}
              </Link>
            ))}
          </nav>
        </div>

        {/* Legal */}
        <div className="flex flex-col gap-4">
          <h4 className="text-sm font-semibold uppercase tracking-wide opacity-90">
            Legal
          </h4>

          <nav className="flex flex-col gap-2 text-sm">
            {footerLegal.map((item) => (
              <Link
                key={item}
                to="#"
                className="relative w-fit opacity-75 transition-all hover:opacity-100
                  after:absolute after:left-0 after:-bottom-0.5 after:h-px after:w-0 after:bg-current after:opacity-40
                  after:transition-all after:duration-300 hover:after:w-full"
              >
                {item}
              </Link>
            ))}
          </nav>
        </div>

        {/* Social / Connect */}
        <div className="flex flex-col gap-4">
          <h4 className="text-sm font-semibold uppercase tracking-wide opacity-90">
            Connect
          </h4>

          <div className="flex gap-4">
            {footerSocial.map(({ Icon, label }) => (
              <a
                key={label}
                href="#"
                aria-label={label}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-[var(--border-color)]
                  opacity-75 transition-all hover:opacity-100 hover:scale-110 hover:bg-black/5 dark:hover:bg-white/10"
              >
                <Icon size={16} />
              </a>
            ))}
          </div>

          <p className="text-xs opacity-60 leading-relaxed">
            Follow ORBIT updates, releases, and internal tooling improvements.
          </p>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="border-t border-[var(--border-color)] px-6 py-4">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 text-xs opacity-70 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-2">
            <ShieldCheck size={14} />
            <span>System Status: Operational</span>
          </div>

          <div className="flex items-center gap-4">
            <span>Environment: Production</span>
            <span>Version: v1.0.0</span>
            <span className="opacity-60">Powered by ORBIT CRM</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
