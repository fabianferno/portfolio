export default function Layout(props) {
  return (
    <section className="bg-dark " style={{ height: "100vh" }}>
      <div className="container">{props.children}</div>
    </section>
  );
}
