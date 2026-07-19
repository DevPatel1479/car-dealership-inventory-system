type DashboardHeaderProps = {
  title: string;
  subtitle?: string;
};

export default function DashboardHeader({ title, subtitle }: DashboardHeaderProps) {
  return (
    <header
      className="
mb-8
"
    >
      <h1
        className="
text-4xl
font-bold
text-gray-900
"
      >
        {title}
      </h1>

      {subtitle && (
        <p
          className="
mt-2
text-gray-500
max-w-2xl
"
        >
          {subtitle}
        </p>
      )}
    </header>
  );
}
