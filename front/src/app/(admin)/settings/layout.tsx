import Header from '@/components/header';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="mt-10">
      <div className="pb-6 md:pb-0">
        <Header heading="Settings" />
      </div>
      {children}
    </div>
  );
}
