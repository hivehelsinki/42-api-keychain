type LayoutProps = {
  children: React.ReactNode;
  modal: React.ReactNode;
};

export default function Layout({ children, modal }: LayoutProps) {
  return (
    <div className="container mt-10">
      {modal}
      {children}
    </div>
  );
}
