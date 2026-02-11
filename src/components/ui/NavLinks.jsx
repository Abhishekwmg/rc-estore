import { NavLink } from "react-router-dom";

export default function NavLinks({ children, toPath }) {
  return (
    <NavLink
      to={toPath}
      className={({ isActive }) =>
        `relative inline-block transition-colors duration-300
     ${isActive ? "text-indigo-500" : "text-inherit"}
     after:content-[''] after:absolute after:left-0 after:-bottom-1
     after:h-[2px] after:w-full after:bg-indigo-500
     after:origin-left after:scale-x-0
     after:transition-transform after:duration-300
     hover:after:scale-x-100
     ${isActive ? "after:scale-x-100" : ""}`
      }
    >
      {children}
    </NavLink>
  );
}
