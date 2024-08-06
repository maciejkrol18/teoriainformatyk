interface DonutProps {
  value: number
  size: number
}

export default function Donut({ value, size }: DonutProps) {
  return (
    <svg width={`${size}px`} height={`${size}px`} viewBox="0 0 42 42">
      <circle
        cx="21"
        cy="21"
        r="15.91549430918954"
        fill="transparent"
        stroke="hsl(var(--background-bright))"
        strokeWidth="5"
      ></circle>

      <circle
        cx="21"
        cy="21"
        r="15.91549430918954"
        fill="transparent"
        strokeWidth="5"
        stroke="hsl(var(--primary))"
        strokeDasharray={`${value} ${100 - value}`}
        strokeDashoffset="25"
      ></circle>
    </svg>
  )
}
