// import RecordsCollection from "../model/recordschema.js";
//  import OrdersCollection from "../model/ordersschema.js";
// import UsersCollection from "../model/usersschema.js";

// const getOrders = (req, res) => {
//     //send response
//     res.send('hello from getreq after middleware on Order');
// }

// const getSingleOrder = (req, res) => {
//     //send response
//     res.send('we have received single Order');
// }

// const postOrder =  (req, res) => {
//     //send response
//     res.send('hello from postreq after middlewareon Order' );
// }

// const patchOrder =  (req, res) => {
//     //send response
//     res.send('hello from patchreq after middleware on Order');
// }

// const deleteOrder = (req, res) => {
//     //send response
//     res.send('hello from deletereq after middleware on Order');
// }

// export { getOrders, getSingleOrder, patchOrder, postOrder, deleteOrder };

/* import RecordsCollection from "../models/recordsschema.js"*/
import OrdersCollection from "../model/ordersschema.js";
import UsersCollection from "../model/usersschema.js";
/* import UsersCollection from "../models/usersschema.js" */

export const getOrders = async (req, res, next) => {
  //Controller // request handler
  try {
    //populate method to display all the details from the record and user collection
    /*  const orders = await OrdersCollection.find().select('-_id records totalPrice').populate('records userId'); */
    const orders = await OrdersCollection.find()
      .select("-_id records totalPrice")
      .populate("records userId", "-_id -title -email -password");
    res.json(orders);
  } catch (err) {
    next(err);
  }
};

export const getSingleOrder = async (req, res, next) => {
  "/orders/:id";
  "/orders/123";
  try {
    const id = req.params.id;
    const singleOrder = await OrdersCollection.findById(id);
    res.json({ success: true, data: singleOrder });
  } catch (err) {
    next(err);
  }
};

export const createOrder = async (req, res, next) => {
  //POST request to create Order
  try {
    const order = new OrdersCollection(req.body);
    await order.save();
    //to push  the order to user collection
    /* const user = await UsersCollection.findById(order.userId);
        user.orders.push(order._id);
        await user.save(); */
    //another method :to push  the order to user collection
    const updatedUser = await UsersCollection.findByIdAndUpdate(
      order.userId,
      { $push: { orders: order._id } },
      { new: true }
    ).populate("orders");
    res.json({ success: true, data: updatedUser });
  } catch (err) {
    next(err);
  }
};

export const updateOrder = async (req, res, next) => {
  // Patch request /orders/:id
  try {
    const id = req.params.id;
    const updatedOrder = await OrdersCollection.findByIdAndUpdate(
      id,
      req.body,
      { new: true }
    );
    res.json({ success: true, data: updatedOrder });
  } catch (err) {
    next(err);
  }
};

export const deleteOrder = async (req, res, next) => {
  //Delete request /orders/:id
  try {
    const { id } = req.params;
    //findByIdAndDelete
    /*         const deletedItem = await OrdersCollection.findByIdAndRemove(id) */
    console.log("deleteid", id);
    const existingOrder = await OrdersCollection.findById(id);

    if (existingOrder) {
      const deleteStatus = await OrdersCollection.deleteOne({
        _id: existingOrder._id,
      });
      //delete order from user orders as well
      const updatedUser = await UsersCollection.findByIdAndUpdate(
        req.user._id,
        { $pull: { orders: id } },
        { new: true }
      );
      res.json({ success: true, data: updatedUser }).populate("orders");
    } else {
      throw new Error("order id doesn't exist ! ");
    }
  } catch (err) {
    next(err);
  }
};
