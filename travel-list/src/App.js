import React, { useState } from 'react';

export default function App() {
  const [items, setItems] = useState([]);
  function handleAddItems(item) {
    // Learning: we are lifting the state up, so that the parent component App can manage the state, and pass the state and the function to the child components
    setItems(items => [...items, item]);
    console.log(items);
  }

  function handleDeleteItem(id) {
    setItems(items => items.filter(item => item.id !== id));
  }

  function handleToggleItem(id) {
    setItems(items =>
      items.map(item =>
        item.id === id ? { ...item, packed: !item.packed } : item
      )
    );
  }

  function handleClearList() {
    const confirmed = window.confirm('Are you sure to clear all items');
    if (confirmed) setItems([]);
  }

  return (
    <div className='app'>
      <Logo />
      <Form onAddItems={handleAddItems} />
      <PackingList
        items={items}
        onDeleteItem={handleDeleteItem}
        onToggleItem={handleToggleItem}
        onClearList={handleClearList}
      />
      <Stats items={items} />
    </div>
  );
}

function Logo() {
  return <h1>🧳 Travel List 🏝️</h1>;
}

function Form({ onAddItems }) {
  const [description, setDescription] = useState('');
  const [quantity, setQuantity] = useState(1);

  const list_options = Array.from({ length: 20 }, (_, i) => i + 1);

  function handleSubmit(e) {
    e.preventDefault(); // prevent the form from submitting/reloading by default
    if (!description) return; // if the description is empty, do nothing
    const newItem = { description, quantity, packed: false, id: Date.now() };
    console.log(newItem);

    onAddItems(newItem);

    // reset the form
    setDescription('');
    setQuantity(1);
  }
  return (
    // <form className='add-form' onSubmit={e => handleSubmit(e)}> // equivalent to the next line
    <form className='add-form' onSubmit={handleSubmit}>
      <h3>What do you need for your 😍 trip?</h3>
      <select
        value={quantity}
        onChange={e => setQuantity(Number(e.target.value))}
      >
        {list_options.map(num => (
          <option key={num} value={num}>
            {num}
          </option>
        ))}
      </select>
      <input
        type='text'
        placeholder='Item...'
        value={description}
        onChange={e => {
          setDescription(e.target.value);
        }}
      />
      <button>Add</button>
    </form>
  );
}

function PackingList({ items, onDeleteItem, onToggleItem, onClearList }) {
  const [sortBy, setSortBy] = useState('input'); // ['input', 'description', 'packed'

  let sortedItems;

  if (sortBy === 'input') sortedItems = items;
  if (sortBy === 'description')
    sortedItems = [...items].sort((a, b) =>
      a.description.localeCompare(b.description)
    ); // we can also do items.slice()

  if (sortBy === 'packed')
    sortedItems = [...items].sort(
      (a, b) => Number(a.packed) - Number(b.packed)
    );

  return (
    <div className='list'>
      <ul>
        {sortedItems.map(item => (
          <Item
            item={item}
            key={item.id}
            onDeleteItem={onDeleteItem}
            onToggleItem={onToggleItem}
          />
        ))}
      </ul>

      <div className='actions'>
        <select value={sortBy} onChange={e => setSortBy(e.target.value)}>
          <option value='input'>Sort by input order</option>
          <option value='description'>Sort by description</option>
          <option value='packed'>Sort by packed status</option>
        </select>

        <button onClick={onClearList}>Clear list</button>
      </div>
    </div>
  );
}

function Item({ item, onDeleteItem, onToggleItem }) {
  return (
    <li>
      <input
        type='checkbox'
        value={item.packed}
        onChange={() => {
          onToggleItem(item.id);
        }}
      />
      <span style={item.packed ? { textDecoration: 'line-through' } : {}}>
        {item.quantity} {item.description}
      </span>
      <button onClick={() => onDeleteItem(item.id)}>❌&times;</button>
    </li>
  );
}

function Stats({ items }) {
  if (!items.length)
    return (
      <p className='stats'>
        <em>Start adding items into your list</em>
      </p>
    );
  const numItems = items.length;
  const numPackedItems = items.filter(item => item.packed).length;
  const percentage = (numPackedItems / numItems) * 100 || 0;
  return (
    <footer className='stats'>
      <em>
        {percentage ? (
          <strong>🎉 Congrats! You're {percentage}% packed! ✈️ </strong>
        ) : (
          `You have ${numItems} items in your list, you have already packed
        ${numPackedItems} items (${percentage}%)`
        )}
      </em>
    </footer>
  );
}
