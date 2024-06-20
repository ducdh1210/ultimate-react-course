export default function Stats({ items }) {
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
