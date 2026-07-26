import ScrollOdometer from "./ScrollOdometer";

function parse(value: string) {
  const match = value.match(/^(\D*)([\d,]+)(.*)$/);
  if (!match) return null;
  const [, prefix, digits, suffix] = match;
  return {
    prefix,
    target: parseInt(digits.replace(/,/g, ""), 10),
    suffix,
  };
}

export default function Counter({
  value,
  className = "",
}: {
  value: string;
  className?: string;
}) {
  const parsed = parse(value);
  if (!parsed) return <span className={className}>{value}</span>;

  return (
    <span className={`inline-flex flex-nowrap items-baseline whitespace-nowrap ${className}`}>
      {parsed.prefix}
      <ScrollOdometer value={parsed.target} />
      {parsed.suffix}
    </span>
  );
}
