// games-model.js - A mongoose model
const GameClass = require('./games.class');
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.

module.exports = function (app) {
  const mongooseClient = app.get('mongooseClient');

  const playerSchema = new mongooseClient.Schema({
    userId: { type: mongooseClient.Schema.Types.ObjectId, ref: 'users' },
    points: { type: Number, default: 0 },

    riddle: [{ type: mongooseClient.Schema.Types.ObjectId, ref: 'riddles' }],
    question: [{ type: String }],
    won: [{ type: Boolean }]
  });

  const games = new mongooseClient.Schema({
    title: { type: String, required: true },
    winnerId: { type: mongooseClient.Schema.Types.ObjectId, ref: 'users' },
    started: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    players: [ playerSchema ],
  });
  games.loadClass(GameClass);
  return mongooseClient.model('games', games);
};
