import type { ReactNode } from 'react';

type PageContainerProps = {
  children: ReactNode;
};

export default function PageContainer({ children }: PageContainerProps) {
  return (
    <main className="flex-1 bg-gray-50 p-8">
      <div className="mx-auto max-w-7xl">{children}</div>
    </main>
  );
}
