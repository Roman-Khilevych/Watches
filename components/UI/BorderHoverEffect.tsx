interface BorderHoverEffectProps {
  groupName?: string;
}
interface ElementClasses {
  [key: string]: string;
}

const elementClasses: ElementClasses = {
  default:
    'absolute bottom-2 left-0 h-0.5 w-0 bg-transparent group-hover:w-full group-hover:bg-watch-white transition-all transition-watch',
  category:
    'absolute bottom-2 left-0 h-0.5 w-0 bg-transparent group-hover/category:w-full group-hover/category:bg-watch-white transition-all transition-watch',
  subcategory:
    'absolute bottom-2 left-0 h-0.5 w-0 bg-transparent group-hover/subcategory:w-full group-hover/subcategory:bg-watch-white transition-all transition-watch',
};

const BorderHoverEffect: React.FC<BorderHoverEffectProps> = ({ groupName }) => {
  return (
    <div
      className={groupName && elementClasses[groupName] ? elementClasses[groupName] : elementClasses['default']}
    ></div>
  );
};

export default BorderHoverEffect;
