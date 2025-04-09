import { IPurchasedItem } from "../interfaces/IPurhcasedItem";

export const PurchasedProductCard = ({ item }: { item: IPurchasedItem }) => {
  return (
    <div
      key={item.id}
      className="rounded-2xl overflow-hidden shadow-lg bg-white p-4 flex flex-col justify-between"
    >
      <img
        className="w-full h-48 object-contain rounded-lg"
        src={item.image}
        alt={item.name}
      />
      <div className="px-2 py-3">
        <h2 className="text-xl font-bold mb-1">{item.name}</h2>
        <p className="text-gray-600 text-sm mb-2">{item.category}</p>
        <p className="text-gray-700">Quantity: {item.quantity}</p>
        <span className="text-lg font-semibold text-green-600">
          {(item.price * item.quantity).toFixed(2)} Kr
        </span>
      </div>
    </div>
  );
};
