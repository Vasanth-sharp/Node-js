const mongoose = require("mongoose");
const customModel = require("./model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const razorpay = require("razorpay");
require("dotenv").config();
const crypto = require("crypto");
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "vasanthakumarotp@gmail.com",
    pass: "fzrk ktqm bmaa nnmk",
  },
});

const razorpayInstance = new razorpay({
  key_id: process.env.RAZOR_ID,
  key_secret: process.env.RAZOR_SECRET,
});

const signin = async (req, res) => {
  const { name, phone, email, pass } = req.body;
  try {
    const hashedpass = await bcrypt.hash(pass, 5);
    const response = await customModel.create({
      name,
      phone,
      email,
      password: hashedpass,
    });

    let senderData = {
      from: "V-cart",
      to: response.email,
      subject: "Account confirmation",
      html: `
          <html>
          <body>
              <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
                  <h2 style="color: #4CAF50;">Welcome to V-cart, ${response.name}!</h2>
                  <p>Thank you for signing in and partnering with V-cart. We are thrilled to have you on board.</p>
                  <p>Please take a moment to provide feedback about our app. Your feedback is invaluable to us and helps us improve our services.</p>
                  <p>Here is your password: <strong>${pass}</strong></p>
                  <p>We look forward to your active participation and hope you have a great experience with our app.</p>
                  <p>Best Regards,</p>
                  <p>The V-cart Team</p>
              </div>
          </body>
          </html>
      `,
    };

    transporter.sendMail(senderData);

    res.status(200).json(response);
  } catch (err) {
    res.status(400).json(err);
  }
};

const login = async (req, res) => {
  const { name, pass } = req.body;
  try {
    const response = await customModel.findOne({ name });
    if (response) {
      const match = await bcrypt.compare(pass, response.password);
      if (match) {
        const token = jwt.sign(
          JSON.stringify({
            name: response.name,
            email: response.email,
          }),
          "vinoth"
        );

        let senderData = {
          from: "V-cart",
          to: response.email,
          subject: "Account Login Confirmation",
          html: `
              <html>
              <body>
                  <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
                      <h2 style="color: #4CAF50;">Welcome Back, ${response.name}!</h2>
                      <p>We are excited to see you logging into your V-cart account.</p>
                      <p>We value your feedback and would love to hear about your experience with our app. Please let us know if you have any suggestions or comments.</p>
                      <p>Best Regards,</p>
                      <p>The V-cart Team</p>
                  </div>
              </body>
              </html>
          `,
        };
        transporter.sendMail(senderData);

        res.status(200).json({ token });
      } else {
        res.status(404).json({ message: "Invalid password" });
      }
    } else {
      res.status(404).json({ message: "Invalid username" });
    }
  } catch (err) {
    res.status(400).json(err);
  }
};

const createOrderId = async (req, res) => {
  const { price } = req.body;
  const token = req.header("token");
  try {
    const payload = jwt.verify(token, "vinoth");
    const data = {
      amount: price * 100,
      currency: "INR",
    };
    razorpayInstance.orders.create(data, (err, order) => {
      if (order) {
        res.status(200).json(order);
      } else {
        res.status(404).json(err);
      }
    });
  } catch (err) {
    res.status(400).json(err);
  }
};

const verifyOrder = async (req, res) => {
  const { product, price, sign, orderId, paymentId, paymentMethod } = req.body;
  const token = req.header("token");
  let hmac = crypto.createHmac("sha256", process.env.RAZOR_SECRET);
  hmac.update(orderId + "|" + paymentId);
  const generatedSign = hmac.digest("hex");
  if (sign === generatedSign) {
    try {
      const payload = jwt.verify(token, "vinoth");
      const response = await customModel.findOneAndUpdate(
        { name: payload.name },
        {
          $push: {
            purchasedProducts: {
              product,
              price,
              paymentMethod,
              paymentId,
            },
          },
        }
      );


      let senderData = {
        from: "V-cart",
        to: response.email,
        subject: "Order Confirmation",
        html: `
            <html>
            <body>
                <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
                    <h2 style="color: #4CAF50;">Hi, ${response.name}!</h2>
                    <p>Your order has been confirmed. Below are the details:</p>
                    <ul>
                        <li><strong>Product:</strong> ${product}</li>
                        <li><strong>Price:</strong> ${price}</li>
                        <li><strong>Payment Method:</strong> ${paymentMethod}</li>
                        <li><strong>Payment ID:</strong> ${paymentId}</li>
                    </ul>
                    <p>Thank you for choosing V-cart. If you have any questions or concerns regarding your order, feel free to contact us.</p>
                    <p>Best Regards,</p>
                    <p>The V-cart Team</p>
                </div>
            </body>
            </html>
        `
    };
    
      transporter.sendMail(senderData);

      res.status(200).json({ message: "Sinature verified" });
    } catch (err) {
      res.status(400).json(err);
    }
  } else {
    res.status(404).json({ message: "Signature does not match" });
  }
};

const purcahsedHistory = async (req, res) => {
  const token = req.header("token");
  try {
    const payload = jwt.verify(token, "vinoth");
    const response = await customModel.findOne({ name: payload.name });
    res
      .status(200)
      .json({ name: response.name, his: response.purchasedProducts });
  } catch (err) {
    res.status(400).json(err);
  }
};

const getAll = async (req, res) => {
  customModel
    .find({})
    .then((resp) => res.status(200).json(resp))
    .catch((err) => res.status(400).json(err));
};
module.exports = {
  signin,
  login,
  createOrderId,
  verifyOrder,
  purcahsedHistory,
  getAll,
};
