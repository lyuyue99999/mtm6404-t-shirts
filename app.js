const { useState } = React;

function App() {
  const [items, setItems] = useState(tshirts);

  const handleBuy = (index) => {
    const selected = items[index];
    const quantity = selected.quantity;

    const updatedItems = items.map((item, i) => {
      if (i === index) {
        return {
          ...item,
          stock: item.stock - quantity,
          quantity: 1, // reset quantity
        };
      }
      return item;
    });

    setItems(updatedItems);
  };

  const handleQuantityChange = (index, newQuantity) => {
    const updatedItems = [...items];
    updatedItems[index].quantity = parseInt(newQuantity);
    setItems(updatedItems);
  };

  return (
    <div>
      <h1>T-Shirts Store</h1>
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {items.map((shirt, index) => (
          <div key={index} style={{ border: '1px solid #ccc', margin: 10, padding: 10, width: 200 }}>
            <h3>{shirt.title}</h3>
            <img src={`images/${shirt.image}`} alt={shirt.title} style={{ width: '100%' }} />
            <p>Price: ${shirt.price.toFixed(2)}</p>
            <p>
              {shirt.stock > 0
                ? `Stock: ${shirt.stock}`
                : <strong style={{ color: 'red' }}>Out of Stock</strong>}
            </p>

            {shirt.stock > 0 && (
              <>
                <label>Qty: </label>
                <select
                  value={shirt.quantity}
                  onChange={(e) => handleQuantityChange(index, e.target.value)}
                >
                  {Array.from({ length: shirt.stock }, (_, i) => (
                    <option key={i + 1} value={i + 1}>{i + 1}</option>
                  ))}
                </select>
                <button onClick={() => handleBuy(index)}>Buy</button>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
