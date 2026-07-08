import Icon from '@/components/UI/Icon';
import StyledLink from '@/components/UI/StyledLink';
import { buildBreadcrumbHrefBySlugs } from '@/helpers/breadcrumbHelpers';
import { BreadcrumbItemModel } from '@/models/breadcrumb';

interface BreadcrumbsProps {
  slugs?: BreadcrumbItemModel[];
}

const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ slugs }) => {
  if (!slugs || !slugs.length) return (
    <nav className="container mb-6 text-sm uppercase">
      <ul className="flex flex-wrap gap-x-2 gap-y-1">
        <li>
          <StyledLink href="/">Home</StyledLink>
        </li>
      </ul>
    </nav>
  )

  return (
    <nav className="container mb-6 text-sm uppercase">
      <ul className="flex flex-wrap gap-x-2 gap-y-1">
        <li>
          <StyledLink href="/">Home</StyledLink>
        </li>
        {slugs.map((crumb, index) => (
          <li key={crumb.slug} className="flex items-center">
            <span className="mr-2">
              <Icon name="arrow-right" className="w-2"/>
            </span>
            {index === slugs.length - 1 || !crumb.slug ? (
              <span className="text-watch-gray2">{crumb.name}</span>
            ) : (
              <StyledLink
                href={buildBreadcrumbHrefBySlugs(slugs, index)}
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
