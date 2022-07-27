import Cupcake from "@components/Cupcake";
import axios from "axios";
import { useEffect, useState } from "react";

export default function CupcakeList() {
  const [cupcakes, setCupcakes] = useState([]);

  const [accessories, setAccessories] = useState([]);

  const [filterSelect, setFilterSelect] = useState("");

  // récupérer la valeur du select pour incrémenter filterSelect - gérer le switch du filtre
  const handleChangeFilter = (event) => {
    setFilterSelect(event.target.value);
  };

  // Step 1: get all cupcakes
  useEffect(() => {
    axios
      .get(`http://localhost:4000/cupcakes`)
      .then((response) => response.data)
      .then((response) => setCupcakes(response));
  }, []);
  // Step 3: get all accessories
  useEffect(() => {
    axios
      .get(`http://localhost:4000/accessories`)
      .then((response) => response.data)
      .then((response) => setAccessories(response));
  }, []);

  return (
    <>
      <h1>My cupcakes</h1>
      <form className="center">
        <label htmlFor="cupcake-select">
          Filter by{" "}
          <select id="cupcake-select" onChange={handleChangeFilter}>
            <option value="">---</option>
            {accessories &&
              accessories.map((accessorie) => (
                <option key={accessorie.id} value={accessorie.id}>
                  {accessorie.name}
                </option>
              ))}
          </select>
          {/* Step 4: add an option for each accessory */}
        </label>
      </form>
      <ul className="cupcake-list" id="cupcake-list">
        {/* Step 2: repeat this block for each cupcake */}
        {cupcakes &&
          cupcakes
            .filter(
              (cupcake) =>
                !filterSelect || cupcake.accessory_id === filterSelect
            )
            .map((cupcake) => (
              <li key={cupcake.id} className="cupcake-item">
                <Cupcake cupcake={cupcake} />
              </li>
            ))}
        {/* end of block */}
      </ul>
    </>
  );
}
