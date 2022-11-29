import OrdersCollection from "../model/ordersschema.js";

export const isAdminOrder = async (req, res, next) => {
  try {
    console.log(req.user._id);

    if (req.user.role !== "admin") {
      const order = await OrdersCollection.find({ userId: req.user._id });
      res.json({ success: true, order: order });
    } else {
      next();
    }
  } catch (err) {
    next(err);
  }
};
