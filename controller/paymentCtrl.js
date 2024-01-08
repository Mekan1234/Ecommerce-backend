const Razorpay = require("razorpay");

const instance = new Razorpay({
  key_id: "rzp_test_p6QMI5MkJundzn",
  key_secret: "NcgYuwhats5VtZXDpH48GlsP",
});

const checkOut = async (req, res) => {
  const { amount } = req.body;
  console.log(amount);
  try {
    const option = {
      amount: amount * 100,
      currency: "INR",
    };
    const order = await instance.orders.create(option);
    console.log(order);
    res.json({
      success: true,
      order,
    });
  } catch (error) {
    throw new Error(error);
  }
};

const paymentVerification = async (req, res) => {
  const { razorpayOrderId, razorPayPaymentId } = req.body;
  res.json({ razorpayOrderId, razorPayPaymentId });
};

module.exports = {
  checkOut,
  paymentVerification,
};
