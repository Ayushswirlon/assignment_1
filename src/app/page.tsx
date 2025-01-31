"use client";
import { useState, useEffect } from "react";
import ProductCard from "../components/ProductCard";
import { useSearch } from "@/context/SearchContext";
// Define Product type for type safety
type Product = {
  id: number;
  title: string;
  price: number;
  image: string;
  category: string; // Added category to the Product type
  rating: {
    rate: number;
    count: number;
  };
  discount?: number;
};

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const [priceFilter, setPriceFilter] = useState<string>("all");
  const [ratingFilter, setRatingFilter] = useState<number>(0); // Store the rating threshold
  const { query } = useSearch();
  useEffect(() => {
    // Fetch product data with error handling
    const fetchProducts = async () => {
      try {
        const response = await fetch("https://fakestoreapi.com/products");
        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }
        const data = await response.json();
        setProducts(data);
        setFilteredProducts(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchProducts();
  }, []);

  // Handle filtering logic
  useEffect(() => {
    let filtered = products;

    // Filter by category
    if (categoryFilter !== "all") {
      filtered = filtered.filter(
        (product) => product.category === categoryFilter
      );
    }

    // Filter by price
    if (priceFilter === "lowToHigh") {
      filtered = filtered.sort((a, b) => a.price - b.price);
    } else if (priceFilter === "highToLow") {
      filtered = filtered.sort((a, b) => b.price - a.price);
    }

    // Filter by rating (greater than or equal to selected rating)
    if (ratingFilter > 0) {
      filtered = filtered.filter(
        (product) => product.rating.rate >= ratingFilter
      );
    }

    setFilteredProducts(filtered);
  }, [categoryFilter, priceFilter, ratingFilter, products]);

  return (
    <div className="min-h-screen p-8 sm:p-20 bg-gray-100">
      <h1 className="text-3xl font-bold text-center mb-10">Our Products</h1>

      {/* Filter Section */}
      <div className="flex justify-between mb-6">
        <div>
          <select
            className="p-2 border rounded"
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
          >
            <option value="all">All Categories</option>
            <option value="electronics">Electronics</option>
            <option value="jewelery">Jewelery</option>
            <option value="men's clothing">Men&lsquo;s Clothing</option>
            <option value="women's clothing">Women&lsquo;s Clothing</option>
          </select>
        </div>

        <div>
          <select
            className="p-2 border rounded"
            value={priceFilter}
            onChange={(e) => setPriceFilter(e.target.value)}
          >
            <option value="all">All Prices</option>
            <option value="lowToHigh">Price: Low to High</option>
            <option value="highToLow">Price: High to Low</option>
          </select>
        </div>

        {/* Rating Filter */}
        <div>
          <select
            className="p-2 border rounded"
            value={ratingFilter}
            onChange={(e) => setRatingFilter(Number(e.target.value))}
          >
            <option value={0}>All Ratings</option>
            <option value={1}>Rating ≥ 1</option>
            <option value={2}>Rating ≥ 2</option>
            <option value={3}>Rating ≥ 3</option>
            <option value={4}>Rating ≥ 4</option>
            <option value={5}>Rating ≥ 5</option>
          </select>
        </div>
      </div>

      {/* Product List */}
      {/* Product List */}
      {filteredProducts.filter((prod) =>
        prod.title.toLowerCase().includes(query.toLowerCase())
      ).length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {filteredProducts
            .filter((prod) =>
              prod.title.toLowerCase().includes(query.toLowerCase())
            )
            .map((prod) => (
              <div key={prod.id} className="flex justify-center">
                <ProductCard product={prod} />
              </div>
            ))}
        </div>
      ) : (
        <p className="text-center">No products available</p>
      )}
    </div>
  );
}
