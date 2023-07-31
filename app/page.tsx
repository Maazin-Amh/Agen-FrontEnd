import Latihan from "./component/latihan";
import Button from "./component/button";

const Home = () => {
  return (
    <main>
      <h1 className="m-3 text-center">Hello, World</h1>
      <Latihan name="ariiq" username="AMH" age={16} isVerified={true} />
      <Latihan name="hilmi" username="hilmi" age={16} isVerified />
      <Latihan name="ariiq" username="AMH" age={16} isVerified={false} />

      <Button title="Simpan" isDisabled={false} />
      <Button title="Cancel" />
    </main>
  );
};

export default Home;
