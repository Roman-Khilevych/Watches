'use client';

import { ReactNode, useEffect, useState } from 'react';
import Icon from '@/components/UI/Icon';

interface ModalSideProps {
  children: ReactNode;
  title: string;
  buttonClasses?: string;
}

const ModalSide: React.FC<ModalSideProps> = ({ children, title, buttonClasses }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  function toggleModal(open?: boolean) {
    const newState = typeof open === 'boolean' ? open : !isModalOpen;
    setIsModalOpen(newState);
  }

  useEffect(() => {
    if (isModalOpen) {
      document.body.classList.add('overflow-hidden');
    } else {
      document.body.classList.remove('overflow-hidden');
    }

    return () => {
      document.body.classList.remove('overflow-hidden');
    };
  }, [isModalOpen]);

  return (
    <>
      <div className={`lg:hidden flex justify-between items-center ${buttonClasses || ''}`}>
        <button onClick={() => toggleModal()} className="text-watch-white uppercase">
          {title}
        </button>
      </div>

      <div
        className={`z-40 lg:hidden fixed top-0 right-0 h-full w-full bg-watch-gray3 bg-opacity-50 transition-opacity transition-watch ${
          isModalOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => toggleModal()}
      ></div>
      <div
        className={`z-40 lg:hidden fixed top-0 right-0 h-full flex flex-col w-5/6 bg-watch-white transform transition-transform transition-watch ${
          isModalOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex p-4 bg-watch-primary">
          <button onClick={() => toggleModal()} className="text-watch-white">
            <Icon name="close" className="w-4" />
          </button>
          <span className="ml-4 text-watch-white uppercase">{title}</span>
        </div>
        <div className="bg-watch-white px-4 pt-8 overflow-y-auto">{children}</div>
      </div>
    </>
  );
};

export default ModalSide;
