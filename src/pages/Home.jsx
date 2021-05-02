import Layout from "../layouts/Layout";

export default function Home() {
  return (
    <Layout>
      <h1 className="hero">Fabian Ferno</h1>
      <div
        style={{ letterSpacing: "7px" }}
        className="text-secondary text-uppercase"
      >
        Web Developer | Freelancer | Graphic Designer
      </div>
    </Layout>
  );
}
