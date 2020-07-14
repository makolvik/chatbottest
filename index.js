var TelegramBot = require("node-telegram-bot-api");

var token = "1305233407:AAH8GJwonU9jaLm_IqcNk1FISXQmzR1eMrI";
var apiKey = "b3d13142";
var bot = new TelegramBot(token, { polling: true });
var request = require("request");

bot.onText(/\/movie (.+)/, function (msg, match) {
  var chatId = msg.chat.id;
  var movie = match[1];
  request(`http://www.omdbapi.com/?apikey=${apiKey}&t=${movie}`, function (
    err,
    res,
    body
  ) {
    if (!err && res.statusCode == "200") {
      bot.sendMessage(chatId, "I'm looking this film").then(function (msg) {
        var res = JSON.parse(body);
        bot.sendPhoto(chatId, res.Poster, {
          caption: `Result: \nTitle: ${res.Title} \nRating: ${res.Ratings[0].Value}`,
        });
      });
    }
  });
});
