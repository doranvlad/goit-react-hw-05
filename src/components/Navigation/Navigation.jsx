import s from "./Navigation.module.css";
import { NavLink } from "react-router-dom";
import clsx from "clsx";

function Navigation() {
  const styleNav = ({ isActive }) => {
    return clsx(s.link, isActive && s.active);
  };
  return (
    <nav className={s.nav}>
      <NavLink to="/" className={styleNav}>
        Home
      </NavLink>
      <NavLink to="/movies" className={styleNav}>
        Movies
      </NavLink>
    </nav>
  );
}

export default Navigation;
