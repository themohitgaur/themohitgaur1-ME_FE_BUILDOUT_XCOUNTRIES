import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [countries, setCountries] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetch("https://countries-search-data-prod-812920491762.asia-south1.run.app/countries")
      .then((res) => {
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        return res.json();
      })
      .then((data) => {
        setCountries(data);
      })
      .catch((err) => {
        console.error("Error fetching country data:", err);
      });
  }, []);

const filteredCountries = countries.filter(
  (country) =>
    country.name &&
    country.name.toLowerCase().includes(searchTerm.toLowerCase())
);

  return (
    <div className="appContainer">
      <input
        type="text"
        placeholder="Search country..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="searchInput"
      />
      <div className="countryGrid">
        {filteredCountries.length > 0 ? (
          filteredCountries.map((country) => (
            <div key={country.name} className="countryCard">
              <img src={country.flag} alt={`${country.name} flag`} />
              <p>{country.name}</p>
            </div>
          ))
        ) : (
          <p>No countries found.</p>
        )}
      </div>
    </div>
  );
}

export default App;
