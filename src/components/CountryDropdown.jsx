import React, { useState, useEffect, useRef } from "react";

const CustomDropdown = ({countries,value,onchangeMethod}) => {
    
    const [isOpen, setIsOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [filteredCountries, setFilteredCountries] = useState(countries);
    const [selectedCountry, setSelectedCountry] = useState(null);
    const dropdownRef = useRef(null);

    // Default value setup
    useEffect(() => {
        const defaultCountry = countries.find((country) => country.id === value?.id); 
        setSelectedCountry(defaultCountry);
    }, [value?.id]);

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    // Filter countries based on search term
    useEffect(() => {
        if (searchTerm.trim() === "") {
            setFilteredCountries(countries); 
        } else {
            setFilteredCountries(
                countries.filter((country) =>
                    country.name.toLowerCase().includes(searchTerm.toLowerCase())
                )
            );
        }
    }, [searchTerm,countries]);

    // Handle selection
    const handleSelect = (country) => {
        setSelectedCountry(country);
        setIsOpen(false);
        setSearchTerm("");
        onchangeMethod(country.id)
    };

    return (
        <div style={{ position: "relative" }} ref={dropdownRef}>
            {/* Selected Item */}
            <div
                onClick={() => setIsOpen((prev) => !prev)}
                style={{
                    padding: "10px",
                    display: "flex",
                    alignItems: "center",
                    cursor: "pointer",
                    justifyContent: "space-between",
                    height: '52px',
                    boxShadow: 'rgba(12, 57, 68, 0.06) 0px 4px 8px inset, rgba(81, 126, 184, 0.08) 0px 4px 8px',
                    backgroundBlendMode: 'overlay',
                    borderRadius: '10px',
                    border: '1px solid rgb(196, 215, 219)',
                    backgroundColor: 'rgb(255, 255, 255)'
                }}
            >
                {selectedCountry ? (
                    <div style={{ display: "flex", alignItems: "center" }}>
                        <img
                            src={selectedCountry.image}
                            alt={selectedCountry.name}
                            style={{ width: 20, height: 15, marginRight: 10 }}
                        />
                        <span>{selectedCountry.name}</span>
                    </div>
                ) : (
                    <span>Select Location</span>
                )}
                <span style={{ marginLeft: "auto" }}>▼</span>
            </div>

            {/* Dropdown Menu */}
            {isOpen && (
                <div
                    style={{
                        border: "1px solid #ccc",
                        borderRadius: "5px",
                        marginTop: "5px",
                        backgroundColor: "#fff",
                        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                        zIndex: 1000,
                        position: "absolute",
                        width: "100%",
                    }}
                >
                    {/* Search Input */}
                    <input
                        type="text"
                        placeholder="Search country..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        style={{
                            width: "100%",
                            padding: "10px",
                            border: "none",
                            borderBottom: "1px solid #ccc",
                            outline: "none",
                        }}
                    />
                    {/* Dropdown Items */}
                    <div style={{ maxHeight: 200, overflowY: "auto" }}>
                        {filteredCountries.length > 0 ? (
                            filteredCountries.map((country) => (
                                <div
                                    key={country.id}
                                    onClick={() => handleSelect(country)}
                                    style={{
                                        padding: "10px",
                                        display: "flex",
                                        alignItems: "center",
                                        cursor: "pointer",
                                        backgroundColor:
                                            selectedCountry &&
                                            selectedCountry.id === country.id
                                                ? "#f0f0f0"
                                                : "#fff",
                                    }}
                                >
                                    <img
                                        src={country.image}
                                        alt={country.name}
                                        style={{ width: 20, height: 15, marginRight: 10 }}
                                    />
                                    {country.name}
                                </div>
                            ))
                        ) : (
                            <div
                                style={{
                                    padding: "10px",
                                    textAlign: "center",
                                    color: "#aaa",
                                }}
                            >
                                No results found
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default CustomDropdown;
