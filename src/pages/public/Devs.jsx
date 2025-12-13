import { DevCard } from "../../components/DevCard/DevCard";
import { Particles } from "../../components/DevCard/particals";
import dhruv from "../../assets/devs/dhruv.webp";
import ansh from "../../assets/devs/ansh.webp";
import deepak from "../../assets/devs/deepak.webp";
import harsh from "../../assets/devs/harsh.webp";

function Devs() {
  const developers = [
    {
      image: ansh,
      name: "Nikku Ansh",
      role: "UI Designer",
      description: "B.Tech CSE\n235/UCS/026",
      github: "",
      linkedin: "https://www.linkedin.com/in/ansh-gusain-aa8880290/",
      instagram: "https://www.instagram.com/anshstable/",
    },
    {
      image: deepak,
      name: "Deepak Kumar",
      role: "Frontend Developer",
      description: "B.Tech CSE\n235/UCS/050",
      github: "https://github.com/Deepak-0411/",
      linkedin: "https://www.linkedin.com/in/deepak-kumar-a49559369/",
      instagram: "https://www.instagram.com/___de.epak/",
    },
    {
      image: harsh,
      name: "Harsh Singh",
      role: "Backend Developer",
      description: "B.Tech CSE\n235/UCS/058",
      github: "https://github.com/harshuh/",
      linkedin: "https://www.linkedin.com/in/harshuh/",
      instagram: "https://www.instagram.com/harshexist/",
    },
    {
      image: dhruv,
      name: "Daksh Verma",
      description: "B.Tech CSE Int.\n225/ICS/013",
      github: "https://github.com/DakshVerma0001",
      linkedin: "https://www.linkedin.com/in/daksh-verma-210189248",
      instagram: "https://www.instagram.com/__dakshx",
    },
  ];

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center bg-black/90 px-4 py-10 overflow-hidden">
      {/* Background Particles */}
      <div className="absolute inset-0 z-0">
        <Particles />
      </div>

      {/* Section Heading */}
      <h2 className="relative z-10 mb-12 lg:mb-20 text-3xl sm:text-4xl font-bold text-white tracking-wide text-center">
        Meet Our Developers
      </h2>

      {/* Developer Cards */}
      <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 justify-items-center">
        {developers.map((dev, idx) => (
          <DevCard key={idx} {...dev} />
        ))}
      </div>
    </div>
  );
}

export default Devs;
