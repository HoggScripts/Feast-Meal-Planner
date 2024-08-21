import React from "react";

const ShoppingList = ({ shoppingList, isNextWeek }) => {
  const filteredShoppingList = shoppingList.filter((item) =>
    isNextWeek ? item.week === "nextWeek" : item.week === "currentWeek"
  );

  return (
    <div className="p-4 bg-white h-full flex flex-col justify-between">
      <ul className="list-disc pl-5 flex-1 overflow-y-auto">
        {Array.isArray(filteredShoppingList) &&
        filteredShoppingList.length > 0 ? (
          filteredShoppingList.map((item, index) => (
            <li key={index} className="text-sm">
              {item.name}
            </li>
          ))
        ) : (
          <p className="text-sm text-black">No items yet.</p>
        )}
      </ul>
    </div>
  );
};

export default ShoppingList;
