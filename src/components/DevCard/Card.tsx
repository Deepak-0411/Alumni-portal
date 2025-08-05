import React from "react";
import { FaGithub, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";

export const DevCard = ({
  image,
  name,
  role,
  description,
  github,
  twitter,
  instagram,
  linkedin,
}) => {
  return (
    <div className="relative w-full max-w-xs sm:max-w-sm md:max-w-md rounded-[30px] overflow-hidden shadow-xl bg-white text-white mx-auto">
      <img
        src={image}
        alt={name}
        className="w-full h-72 sm:h-80 md:h-120 object-cover"
      />

      <div
        className="absolute bottom-0 w-full px-4 pt-10 pb-4 backdrop-blur-xs bg-black/20"
        style={{
          WebkitMaskImage:
            "linear-gradient(to top, black 80%, transparent 100%)",
          maskImage: "linear-gradient(to top, black 80%, transparent 100%)",
        }}
      >
        <h2 className="text-lg font-semibold flex items-center gap-1">
          {name}
        </h2>
        <p className="text-sm text-gray-200 mb-4 whitespace-pre-line">
          {description}
        </p>

        <div className="flex gap-4 mt-2">
          {instagram && (
            <a
              href={instagram}
              target="_blank"
              className="bg-white/20 hover:bg-white/30 text-white p-3 rounded-full text-xl transition"
              title="Instagram"
            >
              <FaInstagram />
            </a>
          )}
          {twitter && (
            <a
              href={twitter}
              target="_blank"
              className="bg-white/20 hover:bg-white/30 text-white p-3 rounded-full text-xl transition"
              title="Twitter"
            >
              <FaTwitter />
            </a>
          )}
          {linkedin && (
            <a
              href={linkedin}
              target="_blank"
              className="bg-white/20 hover:bg-white/30 text-white p-3 rounded-full text-xl transition"
              title="LinkedIn"
            >
              <FaLinkedin />
            </a>
          )}
          {github && (
            <a
              href={github}
              target="_blank"
              className="bg-white/20 hover:bg-white/30 text-white p-3 rounded-full text-xl transition"
              title="GitHub"
            >
              <FaGithub />
            </a>
          )}
        </div>
      </div>
    </div>
  );
};
