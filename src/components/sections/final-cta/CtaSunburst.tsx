// Every ray starts at an outer point of the same sixteen-point silhouette.
// Keeping the rays and silhouette in one group preserves their alignment as it turns.
const tips = [
  [290, 158], [313, 163], [332, 176], [349, 196],
  [354, 220], [349, 244], [332, 264], [313, 277],
  [290, 282], [267, 277], [248, 264], [231, 244],
  [226, 220], [231, 196], [248, 176], [267, 163],
];

export default function CtaSunburst({ className }: { className?: string }) {
  return (
    <g data-cta-sunburst className={className}>
      <g fill="none" stroke="currentColor" strokeOpacity=".18" strokeWidth="0.8">
        {tips.map(([x, y]) => (
          <path
            key={`${x}-${y}`}
            data-cta-ray
            d={`M${x} ${y}L${290 + (x - 290) * 12} ${220 + (y - 220) * 12}`}
          />
        ))}
      </g>
      <path
        fill="currentColor"
        d="M290 158Q302 174 313 163Q317 182 332 176Q331 195 349 196Q338 211 354 220Q338 229 349 244Q331 245 332 264Q317 258 313 277Q302 266 290 282Q278 266 267 277Q263 258 248 264Q249 245 231 244Q242 229 226 220Q242 211 231 196Q249 195 248 176Q263 182 267 163Q278 174 290 158Z"
      />
    </g>
  );
}
