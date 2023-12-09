import React, { useEffect, useRef, useState } from "react";
import { useDispatchCart, useCart } from "./ContextReducer";

export default function Card(props) {
  let dispatch = useDispatchCart();
  let data = useCart();
  let priceRef = useRef();
  let option = props.options;
  let priceOptions = Object.keys(option);
  const [qty, setQty] = useState(1);
  const [size, setSize] = useState("");
  const handleCart = async () => {
    let food = []
    for (const item of data) {
      if ((item.id == props.foodItem._id)&&(item.size==size)) {
        food = item;
        break;
      }
    }
    if (food != []) {
      if (food.size == size) {
        await dispatch({ type: "UPDATE", id: props.foodItem._id, price: finalPrice, qty: qty,size: size })
        return;
      } else if (food.size != size) {
        await dispatch({ type: "ADD", id: props.foodItem._id, name: props.foodItem.name, price: finalPrice, qty: qty, size: size });
        return;
      }
    }
    await dispatch({ type: "ADD", id: props.foodItem._id, name: props.foodItem.name, price: finalPrice, qty: qty, size: size })
  }

  useEffect(() => {
    setSize(priceRef.current.value)
  }, [])

  let finalPrice = qty * parseInt(option[size]);
  return (
    <div>
      <div>
        <div
          className="card mt-3"
          style={{ width: "15rem", maxHeight: "360px" }}
        >
          <img
            className="card-img-top"
            src={props.foodItem.img}
            alt="Card image cap"
            style={{ height: "120px", objectFit: "fill" }}
          />
          <div className="card-body">
            <h5 className="card-title">{props.foodItem.name}</h5>
            <p className="card-text">This is food website.</p>
            <div className="container w-100">
              <select className="m-2 h-100 bg-success rounded" onChange={(e) => setQty(e.target.value)}>
                {Array.from(Array(6), (e, i) => {
                  return (
                    <option key={i + 1} value={i + 1}>
                      {" "}
                      {i + 1}
                    </option>
                  );
                })}
              </select>
              <select className="m-2 h-100 bg-success rounded" ref={priceRef} onChange={(e) => setSize(e.target.value)}>
                {priceOptions.map(data => {
                  if (data != '_id') {
                    return <option key={data} value={data}>{data}</option>
                  }
                })}
              </select>
              <div className="d-inline h-100 fs-5">${finalPrice}\-</div>
            </div>
            <hr></hr>
            <button className="btn btn-success justify-center ms-2" onClick={handleCart}>Add to cart</button>
          </div>
        </div>
      </div>
    </div>
  );
}
