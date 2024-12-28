export function ShopPicker() {
  return (
    <div>
      <ShopButton />
      <ShopButton />
      <ShopButton />
    </div>
  );
}

function ShopButton() {
  return <button className="w-32 h-32">Shop</button>;
}
