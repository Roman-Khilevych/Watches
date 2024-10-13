interface IconProps {
  name: 'hamburger' | 'close' | 'expand' | 'collapse' | 'arrow-right' | 'arrow-left' | 'grid-small' | 'grid-big';
  className?: string;
}

const Icon: React.FC<IconProps> = ({ name, className }) => {
  switch (name) {
    case 'hamburger':
      return (
        <svg className={`h-auto ${className || ''}`} role="presentation" viewBox="0 0 20 14">
          <path d="M0 14v-1h20v1H0zm0-7.5h20v1H0v-1zM0 0h20v1H0V0z" fill="currentColor"></path>
        </svg>
      );
    case 'close':
      return (
        <svg className={`h-auto ${className || ''}`} role="presentation" viewBox="0 0 16 14">
          <path d="M15 0L1 14m14 0L1 0" stroke="currentColor" fill="none" fillRule="evenodd"></path>
        </svg>
      );
    case 'expand':
      return (
        <svg className={`h-auto ${className || ''}`} viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
        </svg>
      );
    case 'collapse':
      return (
        <svg className={`h-auto ${className || ''}`} viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 12H4" />
        </svg>
      );
    case 'arrow-right':
      return (
        <svg className={`h-auto ${className || ''}`} role="presentation" viewBox="0 0 6 9">
          <path d="M1 8.5l4-4-4-4" stroke="currentColor" fill="none" fillRule="evenodd" strokeLinecap="square"></path>
        </svg>
      );
    case 'arrow-left':
      return (
        <svg className={`h-auto ${className || ''}`} role="presentation" viewBox="0 0 6 9">
          <path d="M5 8.5l-4-4 4-4" stroke="currentColor" fill="none" fillRule="evenodd" strokeLinecap="square"></path>
        </svg>
      );
    case 'grid-small':
      return (
        <svg className={`h-auto ${className || ''}`} role="presentation" viewBox="0 0 36 36">
          <path
            fill="currentColor"
            d="M28 36v-8h8v8h-8zm0-22h8v8h-8v-8zm0-14h8v8h-8V0zM14 28h8v8h-8v-8zm0-14h8v8h-8v-8zm0-14h8v8h-8V0zM0 28h8v8H0v-8zm0-14h8v8H0v-8zM0 0h8v8H0V0z"
          ></path>
        </svg>
      );
    case 'grid-big':
      return (
        <svg className={`h-auto ${className || ''}`} role="presentation" viewBox="0 0 36 36">
          <path fill="currentColor" d="M21 36V21h15v15H21zm0-36h15v15H21V0zM0 21h15v15H0V21zM0 0h15v15H0V0z"></path>
        </svg>
      );
    default:
      return null;
  }
};

export default Icon;
