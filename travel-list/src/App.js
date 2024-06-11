import React, { useState } from 'react';
const initialItems = [
  { id: 1, description: 'Passports', quantity: 2, packed: false },
  { id: 2, description: 'Socks', quantity: 12, packed: true },
  { id: 2, description: 'Charger', quantity: 2, packed: false },
];

export default function App() {
  return (
    <div className='app'>
      <Logo />
      <Form />
      <PackingList />
      <Stats />
    </div>
  );
}

function Logo() {
  return <h1>🧳 Travel List 🏝️</h1>;
}

function Form() {
  const [description, setDescription] = useState('');
  const [quantity, setQuantity] = useState(1);

  const list_options = Array.from({ length: 20 }, (_, i) => i + 1);
  function handleSubmit(e) {
    e.preventDefault(); // prevent the form from submitting/reloading by default
    if (!description) return; // if the description is empty, do nothing
    const newItem = { description, quantity, packed: false, id: Date.now() };
    console.log(newItem);
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

function PackingList() {
  return (
    <div className='list'>
      <ul>
        {initialItems.map(item => (
          <Item item={item} key={item.id} />
        ))}
      </ul>
    </div>
  );
}

function Item({ item }) {
  return (
    <li>
      <span style={item.packed ? { textDecoration: 'line-through' } : {}}>
        {item.quantity} {item.description}
      </span>
      <button>❌&times;</button>
    </li>
  );
}

function Stats() {
  return (
    <footer className='stats'>
      <em>You have X items in your list, you have already packed X items</em>
    </footer>
  );
}
