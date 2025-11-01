interface Props extends React.SVGProps<SVGSVGElement> {
  size?: number;
}

export const MoonIcon = ({ size = 100, ...props }: Props) => {
  return <svg viewBox="2 2 17 17" width={size} height={size} fill="currentColor" {...props}>
    <path d="m7.5.5c1.3280962 0 2.5698071.36985953 3.6277499 1.01219586-3.14075981.19184303-5.6277499 2.79938976-5.6277499 5.98780414 0 3.1884144 2.48699009 5.7959611 5.6269199 5.9885898-1.0571128.6415507-2.2988237 1.0114102-3.6269199 1.0114102-3.86599325 0-7-3.1340068-7-7 0-3.86599325 3.13400675-7 7-7z" strokeLinecap="round" strokeLinejoin="round" transform="translate(4 3)" />
  </svg>
};
