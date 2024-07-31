type ArrowWithTailProps = {
  stroke: string;
  className?: string;
};

const ArrowWithTail = ({ className, stroke = '#787878' }: ArrowWithTailProps) => (
  <svg className={className} width={14} height={12} viewBox="0 0 14 12" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M8.35 1L13 6M13 6L8.35 11M13 6H1"
      stroke={stroke}
      strokeWidth={1.2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
export default ArrowWithTail;
