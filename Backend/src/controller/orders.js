const orderModel = require("../model/orders");

const orderData = async (req, res) => {
    let data = req.body.order_data
    await data.splice(0, 0, { order_date: req.body.order_date })
    let eId = await orderModel.findOne({ 'email': req.body.email })
    if (eId === null) {
        try {
            const a = await orderModel.create({
                email: req.body.email,
                order_data: [data]
            })
            return res.status(201).json({ success: true })
        } catch (error) {
            console.log(error.message)
            res.send("Server Error", error.message)

        }
    }
    else {
        try {
            await orderModel.findOneAndUpdate({ email: req.body.email }, { $push: { order_data: data } })
            return res.status(200).json({ success: true })
        } catch (error) {
            console.log(error.message)
            res.send("Server Error", error.message)
        }
    }
}

const myOrder = async (req, res) => {
    try {
        let order = await orderModel.findOne({email: req.body.email});
        console.log(order, "order is here")
        res.status(200).json({message: order});
    } catch (error) {
        console.log(error,"error")
        res.status(404).json({success: false});
    }
}

module.exports = { orderData, myOrder }