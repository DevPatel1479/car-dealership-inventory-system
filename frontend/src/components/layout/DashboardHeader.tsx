type DashboardHeaderProps = {
    title: string;
    subtitle?: string;
};

export default function DashboardHeader({
    title,
    subtitle,
}: DashboardHeaderProps) {
    return (
        <header className="space-y-2">
            <h1 className="text-3xl font-bold text-gray-900">
                {title}
            </h1>

            {subtitle && (
                <p className="text-gray-600">
                    {subtitle}
                </p>
            )}
        </header>
    );
}