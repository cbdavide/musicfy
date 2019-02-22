// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

const { ActivityTypes } = require('botbuilder');

class MyBot {
    /**
     *
     * @param {TurnContext} on turn context object.
     */

    async onTurn(turnContext) {

      var msg = `Hello User, Welcome to Musicfy,
                please select one of the following options ( type the word )
                1 - Recommend a song (recommend) (artistName | mood)
                2 - Get information artist (info) (artistName)
                3 - Buy a song (buy)  (nameSong)
                `
        // See https://aka.ms/about-bot-activity-message to learn more about the message and other activity types.
        if (turnContext.activity.type === ActivityTypes.Message) {
          var res = turnContext.activity.text;
          var opt = res.split(" ")
          var type= opt[1]
          if( opt[0] == "recommend"){
            // request type
              await turnContext.sendActivity("We recomend you to hear this song")
          }else if( opt[0] =="info"){
              await turnContext.sendActivity("This is the information of the artist")
          }else if( opt[0] == "buy"){
              await turnContext.sendActivity("You can buy the song following this link")
          }
        } else {
            var opt  = turnContext.activity.type;
            if( opt == "conversationUpdate"){
              await turnContext.sendActivity(msg)
            }else{
                await turnContext.sendActivity(`[${  opt } event detected]`);
            }
        }

    }
}

module.exports.MyBot = MyBot;
