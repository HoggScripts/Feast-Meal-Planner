import React from "react";

const ShoppingList = ({ shoppingList }) => {
  return (
    <div className="row-span-7 p-4 border-2 border-gray-200 rounded overflow-auto">
      <h3 className="text-center font-bold mb-2">Shopping List</h3>
      <ul className="list-disc pl-5">
        {shoppingList.length > 0 ? (
          shoppingList.map((item, index) => (
            <li key={index} className="text-sm">
              {item}
            </li>
          ))
        ) : (
          <p className="text-sm text-gray-600">No items yet.</p>
        )}
      </ul>
    </div>
  );
};

export default ShoppingList;
