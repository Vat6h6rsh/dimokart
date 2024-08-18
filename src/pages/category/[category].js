"use client";

import { useRouter } from 'next/router';
import Enav from '../../components/navbar';
import products from '../../components/products';

export default function CategoryPage() {
  const router = useRouter();
  const { category } = router.query;

  if (!category) return <div>Loading...</div>; // Handle loading state or case when category is not available

  return (
    <div>
      <Enav />
      <h1 className="text-2xl font-bold m-4">{category}</h1>
      <Eproducts category={category} /> {/* Pass the category to Eproducts */}
    </div>
  );
}
