import { FaFacebook, FaLinkedin } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import styles from "./SocialLinks.module.css";
import { ImYoutube } from "react-icons/im";

const SocialLinks = ({ location = "low" }) => {
  const size = location === "low" ? 25 : 40;

  const links = [
    { name: "x", icon: <FaXTwitter size={size} />, url: "#" },
    { name: "linkedin", icon: <FaLinkedin size={size} />, url: "#" },
    { name: "facebook", icon: <FaFacebook size={size} />, url: "#" },
    { name: "youtube", icon: <ImYoutube size={size} />, url: "#" },
  ];

  return (
    <div className={`${styles.linkBox} ${styles[location]}`}>
      {links.map(({ name, icon, url }) => (
        <a key={name} href={url} target="_blank" rel="noopener noreferrer">
          {icon}
        </a>
      ))}
    </div>
  );
};

export default SocialLinks;
