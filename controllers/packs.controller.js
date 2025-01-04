const PackAccessService = require("../services/packAccess.service");
const AnilistService = require("../services/anilist.service");
const CardsService = require("../services/cards.service");
const StripeService = require("../services/stripe.service");

const PACK_PRICE_IN_CENTS = 200;

var controller = {
  openPack: async (req, res, next) => {
    try {
      const { userId, isFreePack } = req.body;
      const accessPack = await PackAccessService.getPackAccess(userId);

      if(isFreePack) {
        if(accessPack.free_pack_access_time < Date.now()) {
          // 1. Get the cards
          const packCards = await AnilistService.openPack();

          // 2. Save cards for user
          const resultPack = await CardsService.savePack(packCards, userId);

          // 3. Update pack availability time
          await PackAccessService.updateAccessTime(userId);

          res.json(resultPack);
        }
        else {
          return res.status(400).send({ error: "Free pack is not available" });
        }
      }
      else {
        if(accessPack.nb_paid_packs_available > 0) {
          // 1. Get the cards
          const packCards = await AnilistService.openPack();

          // 2. Save cards for user
          const resultPack = await CardsService.savePack(packCards, userId);

          // 3. Decrease nb paid packs
          await PackAccessService.removePaidPack(userId);

          res.json(resultPack);
        }
        else {
          return res.status(400).send({ error: "No paid packs" });
        }
      }
    } catch (error) {
      console.log(error);
      next(error);
    }
  },

  buyPack: async (req, res, next) => {
    try {
      const item = { priceInCents: PACK_PRICE_IN_CENTS, name: 'Pack Nakuma', quantity: 1 };
      const redirectUrl = await StripeService.initiatePayment(item);
      res.json({ url: redirectUrl });
    } catch (error) {
      console.log(error);
      next(error);
    }
  },

  addPack: async (req, res, next) => {
    try {
      const userId = req.body.userId;
      await PackAccessService.addPaidPack(userId);
      res.json("Pack ajouté");
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
};

module.exports = controller;