export default function AdminLayout({
  children,
  modal,
}: {
  children: React.ReactNode;
  modal: React.ReactNode;
}) {
  return (
    <div className="container mt-10">
      {modal}
      {children}
    </div>
  );
}
