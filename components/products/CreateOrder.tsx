'use client';

import ButtonPrimary from '@/components/UI/ButtonPrimary';

interface CreateOrderProps {
  name: string;
  sku: string;
  className?: string;
}

const CreateOrder: React.FC<CreateOrderProps> = ({ name, sku, className }) => {
  function handleButtonClick() {
    window.open(`mailto:example@example.com?subject=${name}&body=I%20want%20to%20order%20product%20${sku}`);
  }

  return (
    <div className={className}>
      <ButtonPrimary className="w-full" onClick={handleButtonClick}>
        <span>Create Order</span>
      </ButtonPrimary>
      <div className="mt-2 text-sm text-watch-gray2">
        <span>Orders available only by email</span>
      </div>
    </div>
  );
};

export default CreateOrder;
