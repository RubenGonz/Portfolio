interface Props extends React.SVGProps<SVGSVGElement> {
  size?: number;
}

export const ChevronIcon = ({ size = 100, ...props }: Props) => {
  return <svg viewBox="0 0 10 6" width={size} height={size} fill="none" {...props}>
    <path stroke="currentColor" strokeWidth="1" d="m1 1 4 4 4-4" />
  </svg>
};
