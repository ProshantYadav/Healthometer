import React, { useState, useEffect, useMemo } from "react";
import MealCard from "../components/MealCard";
import { fetchMeals, deleteMeal } from "../services/api";
import "../styles/savemeal.css";

export default function SavedMeals() {
  const [meals, setMeals] = useState([]);
  const [search, setSearch] = useState("");
  const [activeFilter, setActiveFilter] = useState("all");

  // Fetching meals using the centralized API service
  useEffect(() => {
    fetchMeals()
      .then((res) => setMeals(res.data.meals || res.data))
      .catch((err) => console.error("Sync error", err));
  }, []);

  // filtered meals and stats without manual DOM updates
  const filteredMeals = useMemo(() => {
    return meals.filter((m) => {
      const matchesSearch = (m.name || m.title || "")
        .toLowerCase()
        .includes(search.toLowerCase());
      const matchesFilter =
        activeFilter === "all" ||
        m.diet === activeFilter ||
        m.region === activeFilter ||
        m.category === activeFilter;
      return matchesSearch && matchesFilter;
    });
  }, [meals, search, activeFilter]);

  const handleDelete = async (id) => {
    setMeals((prev) => prev.filter((m) => m._id !== id));
    await deleteMeal(id);
  };

  return (
    <div className="main-layout">
      <div className="left-col">
        {/* Filters */}
        <div className="filter-chips">
          <button
            className={`chip ${activeFilter === "all" ? "active" : ""}`}
            onClick={() => setActiveFilter("all")}
          >
            All
          </button>
          <button
            className={`chip ${activeFilter === "keto" ? "active" : ""}`}
            onClick={() => setActiveFilter("keto")}
          >
            🥑 Keto
          </button>
          {/* Add remaining filters */}
        </div>

        {/* Search */}
        <input
          type="text"
          className="search-wrap input"
          placeholder="Search saved meals..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        {/* Render List */}
        <div className="meals-list">
          {filteredMeals.length === 0 ? (
            <div className="empty-state show">No meals found.</div>
          ) : (
            filteredMeals.map((meal) => (
              <MealCard
                key={meal._id || meal.id}
                meal={meal}
                onDelete={handleDelete}
              />
            ))
          )}
        </div>
      </div>

      {/*SaveMealForm component here */}
    </div>
  );
}
