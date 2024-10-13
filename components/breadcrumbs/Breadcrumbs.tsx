import { BreadcrumbItemModel } from '@/models/breadcrumb';
import StyledLink from '@/components/UI/StyledLink';
import Icon from '@/components/UI/Icon';

interface BreadcrumbsProps {
  slugs: BreadcrumbItemModel[];
}

const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ slugs }) => {
  return (
    <nav className="container mb-6 text-sm uppercase">
      <ul className="flex flex-wrap gap-x-2 gap-y-1">
        <li>
          <StyledLink href="/">Home</StyledLink>
        </li>
        {slugs.map((crumb, index) => (
          <li key={index} className="flex items-center">
            <span className="mr-2">
              <Icon name="arrow-right" className="w-2" />
            </span>
            {index === slugs.length - 1 || !crumb.slug ? (
              <span className="text-watch-gray2">{crumb.name}</span>
            ) : (
              <StyledLink
                href={`${slugs
                  .slice(0, index + 1)
                  .map((c) => c.slug)
                  .join('/')}`}
              >
                {crumb.name}
              </StyledLink>
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Breadcrumbs;
