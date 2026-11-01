import { BsStarFill, BsStarHalf } from 'react-icons/bs';

export default function Stars({ value = 5, size = 16, color = '#10b981' }) {
  const full = Math.floor(value);
  const half = value - full >= 0.5;
  return (
    <span className="stars" role="img" aria-label={`${value} out of 5 stars`}>
      {Array.from({ length: full }).map((_, i) => (
        <BsStarFill key={i} size={size} color={color} aria-hidden="true" />
      ))}
      {half && <BsStarHalf size={size} color={color} aria-hidden="true" />}
    </span>
  );
}
