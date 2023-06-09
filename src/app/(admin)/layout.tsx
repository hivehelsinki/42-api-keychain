export default function AdminLayout(props: {
    children: React.ReactNode;
    modal: React.ReactNode;
}) {
    return (
    <>
        <p>layout</p>
        {props.modal}
        {props.children}
    </>
    )
}