const router = require("express").Router();
const Order_Schema = require("../../models/Order_Schema");


// get all orders
router.get("/", async (req, res) => {
  try {
    const orders = await Order_Schema.find();
    res.json(orders);
  } catch (err) {
    res.json({ message: err });
  }
});

// code to count all orders
router.get("/count/allorders", async (req, res) => {
  try {
    const orders = await Order_Schema.find();
    res.json({
      message: "Total Orders are : " + orders.length,
      total_orders: orders.length,
    });
  } catch (err) {
    res.json({ message: err });
  }
});

// code to count total sale of orders
router.get("/count/total_sale", async (req, res) => {
  try {
    const orders = await Order_Schema.find();
    let product_price = 0;
    orders.forEach((order) => {
      product_price += order.total_price;
    });
    res.json({
      message: "Total Sale is : " + product_price,
      product_price: product_price,
    });
  } catch (err) {
    res.json({ message: err });
  }
});

// get order by id
router.get("/:id", async (req, res) => {
  try {
    const order = await Order_Schema.findById(req.params.id);
    res.json(order);
  } catch (err) {
    res.json({ message: err });
  }
});

// code to get order payment is success
router.get("/payment_Status/success", async (req, res) => {
  try {
    const order = await Order_Schema.find({ payment_Status: "success" });
    res.json(order);
  } catch (err) {
    res.json({ message: err });
  }
});

// code to get order payment is pending
router.get("/payment_Status/pending", async (req, res) => {
  try {
    const order = await Order_Schema.find({ payment_Status: "pending" });
    res.json(order);
  } catch (err) {
    res.json({ message: err });
  }
});

// code to get order payment is failed
router.get("/payment_Status/failed", async (req, res) => {
  try {
    const order = await Order_Schema.find({ payment_Status: "failed" });
    res.json(order);
  } catch (err) {
    res.json({ message: err });
  }
});

// code to get order by order_status
router.get("/order_status/:order_status", async (req, res) => {
  try {
    const order = await Order_Schema.find({
      order_status: req.params.order_status,
    });
    res.json(order);
  } catch (err) {
    res.json({ message: err });
  }
});

// code to delete order by id
router.delete("/:id", async (req, res) => {
  try {
    await Order_Schema.findByIdAndDelete(req.params.id);
    res.json({ message: "Order deleted", status: "success" });
  } catch (error) {
    res.status(500).json({ message: err.message, status: "error" });
  }
});

// code to post orders
router.post("/", async (req, res) => {
  const order_id = Math.floor(Math.random() * 10000);

  const order = new Order_Schema({
    order_id: order_id,
    order_by: req.body.order_by,
    status: req.body.status,
    requested_delivery_type: req.body.requested_delivery_type,
    delivery_times: req.body.delivery_times,
    phone_number: req.body.phone_number,
    email: req.body.email,
    payment_Status: req.body.payment_Status,
    payment_method: req.body.payment_method,
    product_id: req.body.product_id,
    product_price: req.body.product_price,
    product_quantity: req.body.product_quantity,
    delivery_address: req.body.delivery_address,
    delivery_city: req.body.delivery_city,
    delivery_state: req.body.delivery_state,
    delivery_zip_code: req.body.delivery_zip_code,
    order_status: req.body.order_status,
  });
  try {
    const savedOrder = await order.save();
    res.json(savedOrder);
  } catch (err) {
    res.json({ message: err });
  }
});

//  code to update order status and payment status by id
router.patch("/update/status/:id", async (req, res) => {
  try {
    const order = await Order_Schema.findById(req.params.id);
    order.order_status = req.body.order_status;
    order.payment_Status = req.body.payment_Status;
    const updatedOrder = await order.save();
    res.json(updatedOrder);
  } catch (err) {
    res.json({ message: err });
  }
});

module.exports = router;
