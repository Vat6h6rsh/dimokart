"use client";

import { useState } from "react";
import Eproducts from "@/components/products";
import Enav from "../components/navbar";

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState("mens-shirts");

  // Optionally, you could update `selectedCategory` based on user input
  // For example, if a user selects a category from `Enav`, update `selectedCategory`

  return (
    <div>
      <Enav />
      <Eproducts category={selectedCategory} />
    </div>
  );
}
