import React, { useState } from "react";
import ItemForm from "./ItemForm";
import Filter from "./Filter";
import Item from "./Item";

function ShoppingList({ items }) {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [search, setSearch] = useState(""); // new state for search
  const [itemList, setItemList] = useState(items); // local state to handle added items

  // handle category dropdown change
  function handleCategoryChange(event) {
    setSelectedCategory(event.target.value);
  }

  // handle new item submission
  function handleAddItem(newItem) {
    setItemList([...itemList, newItem]);
  }

  // filter items by category + search
  const itemsToDisplay = itemList.filter((item) => {
    const matchesCategory =
      selectedCategory === "All" || item.category === selectedCategory;
    const matchesSearch = item.name
      .toLowerCase()
      .includes(search.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="ShoppingList">
      {/* Form to add new items */}
      <ItemForm onItemFormSubmit={handleAddItem} />

      {/* Filter now supports category + search */}
      <Filter
        search={search}
        onSearchChange={setSearch}
        onCategoryChange={handleCategoryChange}
        selectedCategory={selectedCategory}
      />

      {/* Items list */}
      <ul className="Items">
        {itemsToDisplay.map((item) => (
          <Item key={item.id} name={item.name} category={item.category} />
        ))}
      </ul>
    </div>
  );
}

export default ShoppingList;
