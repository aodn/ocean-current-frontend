import { Link } from 'react-router';
import { ExpandMapIcon } from '@/components/Shared/Icons';

export interface ProductMapLinkProps {
  to: string;
  label: string;
}

export default function ProductMapLink({ to, label }: ProductMapLinkProps) {
  return (
    <Link
      to={to}
      aria-label={label}
      title={label}
      className="hover:bg-imos-cloud-tint focus-visible:outline-imos-calypso-blue flex size-10 shrink-0 items-center justify-center rounded-md bg-white shadow-sm focus-visible:outline-2 focus-visible:outline-offset-2"
    >
      <ExpandMapIcon size="base" color="imos-deep-blue" aria-hidden="true" />
    </Link>
  );
}
