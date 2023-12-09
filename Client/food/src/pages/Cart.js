import React from "react";
import { useCart, useDispatchCart } from "../components/ContextReducer";
import Delete from '@material-ui/icons/Delete'

export default function Cart() {
    let data = useCart();
    console.log(data)
    let dispatch = useDispatchCart();
    console.log(data, "data here")
    if (data.length == 0) {
        return (
            <div>
                <div className="m-5 w-100 text-center fs-3">The Cart is Empty!</div>
            </div>
        )
    }

    const handleCheckOut = async () => {
        console.log(data[0]);
        let userEmail = localStorage.getItem("userEmail");
        console.log(userEmail)
        let response = await fetch("https://congenial-system-7jv4666vw6j3rg6w-3001.app.github.dev/api/v1/order/orderData", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                order_data: data,
                email: userEmail,
                order_date: new Date().toDateString()
            })
        })
        .then(response => response.json())
        if (response.success == true) {
            dispatch({ type: "DROP" });
        }
    }
    let totalprice = data.reduce((total, food) => total + food.price, 0);
    return (
        <div>
            <div className="container m-auto mt-5 table-responsive table-responsive-sm table-responsive-md">
                <table className="table table-hover">
                    <thead className="text-success fs-4">
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Name</th>
                            <th scope="col">Quantity</th>
                            <th scope="col">Option</th>
                            <th scope="col">Amount</th>
                            <th scope="col"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((food, index) =>
                        (
                            <tr>
                                <th scope="row">{index + 1}</th>
                                <td>{food.name}</td>
                                <td>{food.qty}</td>
                                <td>{food.size}</td>
                                <td>{food.price}</td>
                                <td><button type="button" className="btn p-0"><Delete onClick={() => { dispatch({ type: "REMOVE", index: index }) }} /></button></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div><h1 className="fs-2">Total Price: {totalprice}/-</h1></div>
                <div>
                    <button className="btn bg-success mt-5" onClick={handleCheckOut}>Check Out</button>
                </div>
            </div>
        </div>
    )
}