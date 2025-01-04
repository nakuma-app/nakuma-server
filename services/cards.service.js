const Card = require("../models/cards.model");
const Character = require("../models/characters.model");

async function savePack(packCards, userId) {
  try {
    let result = [];
    for (const card of packCards) {
      // 1. Create character if needed
      let savedChar = await Character.findOne({ apiId: card.id });
      if(!savedChar) {
        savedChar = await Character.create({
          apiId: card.id,
          name: card.name.full,
          media_title: card.media.nodes[0].title.english,
          image_url: card.image.large,
          nb_favorites: card.favourites
        });
      }
  
      // 2. Create card
      const newCard = await Card.create({
        owned_by: userId,
        character: savedChar._id,
        rarity: getCardRarity(savedChar.nb_favorites)
      });
      const populatedCard = await Card.findById(newCard._id)
        .populate('character', 'name media_title image_url');

      result.push(populatedCard);
    }
    
    return result;
  } catch (error) {
    console.log(error);
  }
}

function getCardRarity(nbFavorites) {
  if(nbFavorites < 10) {
    return 1;
  }
  else if (nbFavorites < 100) {
    return 2;
  }
  else if (nbFavorites < 1000) {
    return 3;
  }
  else if (nbFavorites < 8000) {
    return 4;
  }
  else {
    return 5;
  }
}

module.exports = {
  savePack
};