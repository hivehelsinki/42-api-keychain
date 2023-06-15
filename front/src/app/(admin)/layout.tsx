export default function AdminLayout(props: {
  children: React.ReactNode;
  modal: React.ReactNode;
}) {
  return (
    <div className="container mt-10">
      {props.modal}
      {props.children}
    </div>
  );
}
