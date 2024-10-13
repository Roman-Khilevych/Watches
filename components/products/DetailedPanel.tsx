import { Link } from 'react-scroll';
import { Section } from './Detailed';

interface DetailedPanelProps {
  sections: Section[];
}

const DetailedPanel: React.FC<DetailedPanelProps> = ({ sections }) => {
  return (
    <div className="sticky top-14 md:top-20 left-0 right-0 bg-watch-primary px-4 py-2 z-40">
      <nav className="container flex justify-center gap-x-4">
        {sections.map((section, index) => {
          const sectionName = Object.keys(section)[0] as keyof Section;

          return (
            <Link
              key={index}
              className="group relative block py-2 mx-4 cursor-pointer uppercase font-watch-secondary text-watch-white hover:text-watch-gray2 transition-colors transition-watch"
              activeClass="active"
              to={sectionName}
              spy={true}
              smooth={true}
              offset={-128}
              duration={500}
            >
              {sectionName}
              <span className="block absolute bottom-0 left-0 h-0.5 w-0 bg-transparent group-[.active]:w-full group-[.active]:bg-watch-white transition-all transition-watch"></span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
};

export default DetailedPanel;
