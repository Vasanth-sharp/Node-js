const usersmodel = require("../models/users");
const mongoose = require("mongoose");

const post = async (req, res) => {
  const { name, password, email, phone } = req.body;

  try {
    const create = await usersmodel.create({ name, password, email, phone });
    res.status(200).json(create);
  } catch (e) {
    res.status(500).json({ Error: e });
  }
};

const getall = async (req, res) => {
  try {
    const readall = await usersmodel.find({});
    res.status(200).json(readall);
  } catch (e) {
    res.status(500).json({ Error: e });
  }
};

const get = async (req, res) => {
  const encryptedname = req.params.name;
  function decrypt(encryptedText, shift) {
    return encryptedText
      .split("")
      .map((char) => {
        if (char.match(/[a-z]/i)) {
          const code = char.charCodeAt(0);
          const isUpperCase = char === char.toUpperCase();
          const shiftAmount = isUpperCase ? 65 : 97;
          return String.fromCharCode(
            ((code - shiftAmount - shift + 26) % 26) + shiftAmount
          );
        } else {
          return char;
        }
      })
      .join("");
  }
  const decryptedWord = decrypt(encryptedname, 3);
  try {
    const read = await usersmodel.findOne({ name: decryptedWord });
    res.status(200).json(read);
  } catch (e) {
    res.status(500).json({ Error: e });
  }
};

const put = async (req, res) => {
  const { name, password } = req.body;
  try {
    const update = await usersmodel.findOneAndUpdate({ name }, { password });
    res.status(200).json(update);
  } catch (e) {
    res.status(500).json({ Error: e });
  }
};

const delet = async (req, res) => {
  const encryptedname = req.params.name;
  function decrypt(encryptedText, shift) {
    return encryptedText
      .split("")
      .map((char) => {
        if (char.match(/[a-z]/i)) {
          const code = char.charCodeAt(0);
          const isUpperCase = char === char.toUpperCase();
          const shiftAmount = isUpperCase ? 65 : 97;
          return String.fromCharCode(
            ((code - shiftAmount - shift + 26) % 26) + shiftAmount
          );
        } else {
          return char;
        }
      })
      .join("");
  }
  const decryptedWord = decrypt(encryptedname, 3);

  try {
    const del = await usersmodel.findOneAndDelete({ name: decryptedWord });
    res.status(200).json(del);
  } catch (e) {
    res.status(500).json({ Error: e });
  }
};

module.exports = { post, getall, get, put, delet };
