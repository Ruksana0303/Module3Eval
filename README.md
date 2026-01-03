import { useEffect, useRef } from "react";

const Navbar = ({ search, setSearch, type, setType, parking, setParking }) => {
  const searchRef = useRef();

  useEffect(() => {
    searchRef.current.focus();
  }, []);

  return (
    <div style={{ marginBottom: "10px" }}>
      <input
        ref={searchRef}
        placeholder="Search name or address"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <select value={type} onChange={(e) => setType(e.target.value)}>
        <option value="">All Types</option>
        <option>Rajasthani</option>
        <option>Gujarati</option>
        <option>Mughlai</option>
        <option>Jain</option>
        <option>Thai</option>
        <option>North Indian</option>
        <option>South Indian</option>
      </select>

      <select value={parking} onChange={(e) => setParking(e.target.value)}>
        <option value="">All Parking</option>
        <option value="true">Parking Yes</option>
        <option value="false">Parking No</option>
      </select>
    </div>
  );
};

export default Navbar;
