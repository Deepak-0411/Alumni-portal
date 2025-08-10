import { DevCard } from "../components/DevCard/Card";
import { Particles } from "../components/DevCard/particals";

function Devs() {
  return (
    <div className="relative min-h-screen flex items-center justify-center bg-black/90 px-4 py-10 overflow-hidden">
      <div className="absolute inset-0 z-0">
        <Particles />
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex flex-row gap-20">
        <DevCard
          image="https://images.pexels.com/photos/33209129/pexels-photo-33209129.jpeg"
          name="Nikku Ansh"
          role="Figma"
          description={"B.Tech CSE\n235/UCS/026"}
          instagram
          linkedin
          twitter
          github
        />
        <DevCard
          image="https://images.pexels.com/photos/262391/pexels-photo-262391.jpeg"
          name="Deepak Kumar"
          role="Figma"
          description={"B.Tech CSE\n235/UCS/050"}
          instagram
          linkedin
          twitter
          github
        />
        <DevCard
          image="https://images.pexels.com/photos/904332/pexels-photo-904332.jpeg"
          name="Harsh Singh"
          role="Figma"
          description={"B.Tech CSE\n235/UCS/058"}
          instagram
          linkedin
          twitter
          github
        />
        {/* <DevCard
          image="https://images.pexels.com/photos/977796/pexels-photo-977796.jpeg"
          name="Daksh Verma"
          role="Figma"
          description={"B.Tech CSE Int.\n225/ICS/013"}
          instagram
          linkedin
          twitter
          github
        /> */}
      </div>
    </div>
  );
}

export default Devs;
