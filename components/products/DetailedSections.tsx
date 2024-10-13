import { Element } from 'react-scroll';
import { Section } from './Detailed';

interface DetailedSectionsProps {
  sections: Section[];
}

const DetailedSections: React.FC<DetailedSectionsProps> = ({ sections }) => {
  return (
    <div>
      {sections.map((section, index) => {
        const sectionName = Object.keys(section)[0] as keyof Section;

        return (
          <Element key={index} name={sectionName} className="odd:bg-watch-gray3 odd:text-watch-white">
            <div className="pt-12 font-watch-secondary uppercase">
              <div className="container">{sectionName}:</div>
            </div>
            <div className="container pt-8 pb-20">{section[sectionName]}</div>
          </Element>
        );
      })}
    </div>
  );
};

export default DetailedSections;
