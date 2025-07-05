import styles from "./Navbar.module.css";
import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const location = useLocation();

  const navItems = [
    {
      name: "Profile",
      path: "/alumni/user/profile",
    },
    {
      name: "Events",
      path: "/alumni/user/events",
    },
    {
      name: "Membership Card",
      path: "/alumni/user/membershipCard",
    },
    {
      name: "Contact Us",
      path: "/alumni/user/contactUs",
    },
  ];
  return (
    <nav className={styles.navbar}>
      <div className={styles.navbarBtns}>
        {navItems.map(({ name, path }) => (
          <Link
            key={name}
            to={path}
            className={`${styles.navbarBtn} ${
              location.pathname === path ? styles.navbarBtnActive : ""
            }`}
          >
            {name}
          </Link>
        ))}
      </div>
    </nav>
  );
};
export default Navbar;
