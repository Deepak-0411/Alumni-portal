import getIcons from "../../utility/svgs";
import styles from "./SocialLinks.module.css";
const SocialLinks = ({ location = "" }) => {
  const { x, linkedin, instagram, youtube } = getIcons(
    location === "low" ? "small" : ""
  );

  const links = [
    { name: "x", icon: x, url: "#" },
    { name: "linkedin", icon: linkedin, url: "#" },
    { name: "instagram", icon: instagram, url: "#" },
    { name: "youtube", icon: youtube, url: "#" },
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
