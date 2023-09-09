

interface Props {
  name: string;
  username: string;
  age: number;
  isVerified: boolean;
}

export default function Latihan(props: Props) {
  console.log("props", props);
  return (
    <div className="flex justify-center items-center">
      <div className="container border mb-5  border-red-500 p-3 shadow-sm shadow-white/30 hover:scale-105 transition-all duration-300 drop-shadow-lg">
        <dl>
          <dt>Name: </dt>
          <dd>{props.name}</dd>
          <dt>Username: </dt>
          <dd>{props.username}</dd>
          <dt>Age: </dt>
          <dd>{props.age}</dd>
          <dt>Verified: </dt>
          <dd>{props.isVerified ? "yes" : "no"}</dd>
        </dl>
      </div>
    </div>
  );
}
