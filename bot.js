// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

const { ActivityTypes } = require('botbuilder');

const { recommentadion } = require('./lastfm_api')

class MyBot {
    /**
     *
     * @param {TurnContext} on turn context object.
     */

    async onTurn(turnContext) {

      var msg = `Hello User, Welcome to Musicfy,
                please select one of the following options ( type the word )
                1 - Recommend a similar artist (recommend) (artistName | mood)
                2 - Get information artist (info) (artistName)
                3 - Buy a song (buy)  (nameSong)
                4 - Best albums of an artist (bestof) (artistName)
                `
        // See https://aka.ms/about-bot-activity-message to learn more about the message and other activity types.
        if (turnContext.activity.type === ActivityTypes.Message) {
          var res = turnContext.activity.text;
          var opt = res.split(" ")
          var type= opt[1]
          if( opt[0] == "recommend"){
            // request type
              let data = await recommentadion(type)
              await turnContext.sendActivity("We have found a similar artist to " + type + ": " + data.name)
              await turnContext.sendActivity("You can know more about " + data.name + " here: " +  data.url)
          }else if( opt[0] =="info"){
              await turnContext.sendActivity("This is the information of "+type)
          }else if( opt[0] == "buy"){
              await turnContext.sendActivity("You can buy the song "+type+" following this link")
          }
          else if( opt[0] == "bestof"){
              await turnContext.sendActivity("The best song of  "+type+" are: ")
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
