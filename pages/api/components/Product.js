export default function Product({ serial, type, location, status }) {
  return (
    <div>
      <h1>
        {serial} : {type}
      </h1>
    </div>
  );
}
