'use client';

import DetailedPanel from './DetailedPanel';
import DetailedSections from './DetailedSections';

interface DetailedProps {
  description?: string;
  specification?: string;
}

export type Section = {
  description?: string;
  specification?: string;
};

const Detailed: React.FC<DetailedProps> = ({ description, specification }) => {
  const sections: Section[] = [];

  if (description) {
    sections.push({ description });
  }

  if (specification) {
    sections.push({ specification });
  }

  return (
    <>
      <DetailedPanel sections={sections} />
      <DetailedSections sections={sections} />
    </>
  );
};

export default Detailed;
