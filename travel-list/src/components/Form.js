import React, { useState } from 'react';

export default function Form({ onAddItems }) {
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
