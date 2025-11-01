interface Props extends React.SVGProps<SVGSVGElement> {
  size?: number;
}

export const UserIcon = ({ size = 100, ...props }: Props) => {
  return <svg viewBox="6 3 12 17" width={size} height={size} fill="none" stroke="currentColor"  {...props}>
    <circle cx="12" cy="8" r="4"></circle>
    <path d="M6 20c0-3.31 2.69-6 6-6s6 2.69 6 6"></path>
  </svg>
};