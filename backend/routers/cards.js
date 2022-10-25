const routerCard = require('express').Router();
const { validateCardId, validateCreateCard } = require('../middlewares/validations');
const {
  getAllCards, createCard, deleteCard, setLike, deleteLike,
} = require('../controllers/cards');

routerCard.get('/cards', getAllCards);
routerCard.post('/cards', validateCreateCard, createCard);
routerCard.delete('/cards/:cardId', validateCardId, deleteCard);
routerCard.put('/cards/:cardId/likes', validateCardId, setLike);
routerCard.delete('/cards/:cardId/likes', validateCardId, deleteLike);

module.exports = routerCard;
