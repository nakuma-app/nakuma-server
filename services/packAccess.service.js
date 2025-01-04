const PackAccess = require("../models/packAccess.model");

async function initPackAccess(userId) {
  try {
    await PackAccess.create({ user: userId });
  } catch (error) {
    console.log(error);
  }
}

async function getPackAccess(userId) {
  try {
    let packAccess = await PackAccess.findOne({ user: userId });
    return packAccess;
  } catch (error) {
    console.log(error);
  }
}

async function updateAccessTime(userId) {
  try {
    const updateTime = { free_pack_access_time: new Date(Date.now() + (3600 * 1000 * 24)) };
    await PackAccess.findOneAndUpdate({ user: userId }, updateTime);
  } catch (error) {
    console.log(error);
  }
}

async function addPaidPack(userId) {
  try {
    await PackAccess.findOneAndUpdate({ user: userId }, { $inc: { 'nb_paid_packs_available': 1 } });
  } catch (error) {
    console.log(error);
  }
}

async function removePaidPack(userId) {
  try {
    await PackAccess.findOneAndUpdate({ user: userId }, { $inc: { 'nb_paid_packs_available': -1 } });
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  initPackAccess,
  getPackAccess,
  updateAccessTime,
  addPaidPack,
  removePaidPack
};