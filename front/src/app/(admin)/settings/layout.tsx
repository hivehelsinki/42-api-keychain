export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="container mt-10">
      <div className="pb-6 md:pb-0">
        <div id="header">
          <h2 className="text-3xl font-bold tracking-tight">Settings</h2>
          <p className="mt-3">
            Welcome to your dashboard where you can manage your keys and
            overwatch their validity
          </p>
        </div>
      </div>
      {children}
    </div>
  );
}
