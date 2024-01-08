const express = require("express");
const router = express.Router();
const {
  createUser,
  loginUserCtrl,
  getallUser,
  getaUser,
  deleteaUser,
  updateaUser,
  unblockUser,
  blockUser,
  handleRefreshToken,
  logout,
  updatePassword,
  forgotPasswordToken,
  resetPassword,
  loginAdmin,
  getWishlist,
  saveAddress,
  userCart,
  getUserCart,
  createOrder,
  removeProductFromCart,
  updateProductQuantityFromCart,
  getMyOrders,
  emptyCart,
  getMonthWiseOrderIncome,
  getYearlyTotalOrders,
  getAllOrders,
  getSingleOrder,
  updateOrder,
} = require("../controller/userCtrl");
const { authMiddleware, isAdmin } = require("../middlewares/authMiddleware");
const { checkOut, paymentVerification } = require("../controller/paymentCtrl");
router.post("/register", createUser);
router.post("/forgot-password-token", forgotPasswordToken);
router.put("/reset-password/:token", resetPassword);
// router.put(
//   "/order/update-order/:id",
//   authMiddleware,
//   isAdmin,
//   updateOrderStatus
// );

router.put("/password", authMiddleware, updatePassword);
router.post("/login", loginUserCtrl);
router.post("/admin-login", loginAdmin);
router.post("/cart", authMiddleware, userCart);
router.post("/order/checkout", authMiddleware, checkOut);
router.post("/order/paymentVerification", authMiddleware, paymentVerification);
// router.post("/cart/applycoupon", authMiddleware, applyCoupon);
router.post("/cart/create-order", authMiddleware, createOrder);
router.get("/all-users", getallUser);
router.get("/get-my-orders", authMiddleware, getMyOrders);
router.get("/get-all-orders", authMiddleware, isAdmin, getAllOrders);
router.get("/get-order/:id", authMiddleware, isAdmin, getSingleOrder);
router.put("/update-order/:id", authMiddleware, isAdmin, updateOrder);
// router.post("/get-order-by-user/:id", authMiddleware, isAdmin, getAllOrders);
router.get("/refresh", handleRefreshToken);
router.get("/logout", logout);
router.get("/wishlist", authMiddleware, getWishlist);
router.get("/cart", authMiddleware, getUserCart);
router.get("/getMonthWiseOrderIncome", authMiddleware, getMonthWiseOrderIncome);
router.get("/getYearlyOrders", authMiddleware, getYearlyTotalOrders);

router.get("/:id", authMiddleware, isAdmin, getaUser);
router.delete("/empty-cart", authMiddleware, emptyCart);
router.delete(
  "/delete-product-cart/:cartItemId",
  authMiddleware,
  removeProductFromCart
);
router.delete(
  "/update-product-cart/:cartItemId/:newQuantity",
  authMiddleware,
  updateProductQuantityFromCart
);
router.delete("/:id", authMiddleware, deleteaUser);

router.put("/edit-user", authMiddleware, updateaUser);
router.put("/save-address", authMiddleware, saveAddress);
router.put("/block-user/:id", authMiddleware, isAdmin, blockUser);
router.put("/unblock-user/:id", authMiddleware, isAdmin, unblockUser);
module.exports = router;
