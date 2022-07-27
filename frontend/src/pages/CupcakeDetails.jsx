import { useParams } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import Cupcake from "@components/Cupcake";

export default function CupcakeDetails() {
  const { id } = useParams();

  const [cupcake, setCupcake] = useState("");

  useEffect(() => {
    axios
      .get(`http://localhost:4000/cupcakes/${id}`)
      .then((response) => response.data)
      .then((response) => setCupcake(response));
  }, []);
  return (
    <ul className="cupcake-list" id="cupcake-list">
      <li className="cupcake-item">
        <Cupcake cupcake={cupcake} />
      </li>
    </ul>
  );
}
