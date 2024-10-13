import { ReactNode, AnchorHTMLAttributes } from 'react';
import Link from 'next/link';

interface StyledLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
  className?: string;
  children: ReactNode;
}

const StyledLink: React.FC<StyledLinkProps> = ({ children, href, className, ...props }) => {
  return (
    <Link
      href={href}
      className={`hover:text-watch-gray2 transition-colors transition-watch
        ${className || ''}`}
      {...props}
    >
      {children}
    </Link>
  );
};

export default StyledLink;
