const { request, gql } = require('graphql-request');
const config = require("../config");

const ANILIST_API_URL = config.anilistAPI.url;
const CHARACTER_COUNT = 42000;
const DEFAULT_IMAGE = "https://s4.anilist.co/file/anilistcdn/character/large/default.jpg";

async function openPack() {
  try {
    const packCards = await getPackCards();
    return packCards.sort((a, b) => a.favourites - b.favourites);
  } catch (error) {
    console.log(error);
  }
}

async function getPackCards() {
  var packCards = [];
  var characterIds = [];

  const query = gql`
    query getChar($charId: Int!, $excludeIds: [Int]) {
      Character (id: $charId, id_not_in: $excludeIds) {
        id
        name {
          full
        }
        image {
          large
        }
        media(sort:FAVOURITES_DESC, page: 1, perPage: 1) {
          nodes {
            title {
              english
            }
          }
        }
        favourites
      }
    }
  `;

  while(packCards.length < 5) { // Generate 5 random cards
    let charId = Math.floor(Math.random() * CHARACTER_COUNT);
    let res;

    while(!res) {
      try {
        res = await request(ANILIST_API_URL, query, {charId: charId++, excludeIds: characterIds});
        res = res.Character;
      } catch (error) {console.log(error);}
    }

    if(res.id && res.name.full && res.image.large && (res.image.large != DEFAULT_IMAGE) && res.media.nodes[0].title.english) {
      packCards.push(res);
      characterIds.push(res.id);
    }
  }
  return packCards;
}

module.exports = {
  openPack
};