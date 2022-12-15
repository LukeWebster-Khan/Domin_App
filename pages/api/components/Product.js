export default function Product(obj) {
  // const something = JSON.parse(obj);
  const RoutedComponent = () => {
    useEffect(() => {
      const { data } = getQueryParams(window.location.search);
    }, []);
  };
  return (
    <div>
      <h1>hi{console.log(obj)}</h1>;{console.log(obj)}
    </div>
  );
}
