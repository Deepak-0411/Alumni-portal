import { Outlet } from "react-router-dom";
import styles from "../styles/modules/Navbar.module.css";
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
      name: "Membership",
      path: "/alumni/user/membership",
    },
    {
      name: "Contact Us",
      path: "/alumni/user/contactUs",
    },
  ];
  return (
    <div className={styles.navbar}>
      <div className={styles.navbarBtns}>
        {navItems.map(({ name, path}) => (
          <Link
          key={name}
          to={path}
          className={`${styles.navbarBtn} ${location.pathname === path ? styles.navbarBtnActive : ""}`}
        >
          {name}
        </Link>        
        ))}
      </div>
      </div>
  );
};
export default Navbar;
