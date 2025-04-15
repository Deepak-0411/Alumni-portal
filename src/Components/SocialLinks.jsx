import {socialIcons} from "./Utils/svgs.jsx";
import styles from "./Page/Styles/Footer.module.css";
const SocialLinks = ({ className = "" }) => {
    const links = [
      { name: "x", icon: socialIcons.x, url: "#" },
      { name: "linkedin", icon: socialIcons.linkedin, url: "#" },
      { name: "instagram", icon: socialIcons.instagram, url: "#" },
      { name: "youtube", icon: socialIcons.youtube, url: "#" },
    ];
  
    return (
      <div className={`${styles.linkBox} ${className}`}>
        {links.map(({ name, icon, url }) => (
          <a key={name} href={url} target="_blank" rel="noopener noreferrer">
            {icon}
          </a>
        ))}
      </div>
    );
  };
  export default SocialLinks;