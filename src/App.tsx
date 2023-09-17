import Pagination from "./components/Pagination";

interface Item {
  id: number;
  name: string;
}

const items: Item[] = Array.from({ length: 100 }, (_, i) => ({
  id: i + 1,
  name: `Item ${i + 1}`,
}));
 
function App() {
  return (
    <div>
      <h1>Pagination Example</h1>
      <Pagination
        itemsPerPage={5}
        data={items}
        render={(item: Item) => <div>{item.name}</div>}
      />
    </div>
  );
}

export default App;
