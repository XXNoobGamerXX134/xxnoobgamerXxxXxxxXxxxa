const Discord = require("discord.js");
const bot = new Discord.Client();
const fs = require('fs');
const moment = require('moment');
var wartungsarbeiten = "ja";
const prefix = "/";

//JSON
let userData = JSON.parse(fs.readFileSync("Storage/userData.json", 'utf8'));

bot.on('message', msg => {
    var sender = msg.author;

    if(!userData[sender.id]) userData[sender.id] = {};
    if(!userData[sender.id].tokens) userData[sender.id].tokens = 5000;
    if(!userData[sender.id].lastDaily) userData[sender.id].lastDaily = 'Noch nicht eingesammelt';
    //if(!userData[sender.id].username) userData[sender.id].username = msg.author;

    fs.writeFile('Storage/userData.json', JSON.stringify(userData));


if(msg.content === "%wartungsarbeiten on") {
    if(msg.author.id !== '315515278853406720') {
        return;
    } else {
    wartungsarbeiten = 'ja';
    msg.channel.send("Wartungsarbeiten sind jetzt aktiviert! Kein Kommando kann mehr benutzt werden");
}
}
if(msg.content === "%wartungsarbeiten off") {
    if(msg.content !== '315515278853406720') {
        return;
    } else {
    wartungsarbeiten = "nein";
    msg.channel.send("Wartungsarbeiten sind jetzt deaktiviert! Kein Kommando kann wieder benutzt werden");
}
}
   if(msg.content === prefix + "hilfe") {
      if(wartungsarbeiten === "ja") {
          msg.reply("Der Bot ist gerade in Wartungsarbeiten, bitte melde dich später wieder!");
      } else {
msg.channel.send({embed: {
    color: 3447003,
    author: {
      name: bot.user.username,
      icon_url: bot.user.avatarURL
    },
    title: "Kommandos/Commands",
    //url: "http://google.com",
    //description: "Zu dieser Zeit gibt es nur ein Kommando namens: " + prefix + "hilfe",
    fields: [{
        name: prefix + "hilfe",
        value: "Zeigt eine Liste von Kommandos an."
      },
      {
          name: prefix + "tokens",
          value: "Zeigt dir deine Tokens an."
      },
      {
          name: prefix + "täglich",
          value: "Gibt dir jeden Tag 1000 Tokens"
      }
      //{
      //  name: "Masked links",
      //  value: "You can put [masked links](http://google.com) inside of rich embeds."
      //}
    ],
    timestamp: new Date(),
    footer: {
      icon_url: bot.user.avatarURL,
      text: "© Sky-Lokation-Network"
    }
  }
});
   }
   }
   if(msg.content === prefix + "tokens") {
      if(wartungsarbeiten === "ja") {
          msg.reply("Der Bot ist gerade in Wartungsarbeiten, bitte melde dich später wieder!");
      } else {
       msg.channel.send({embed: {
    color: 3447003,
    author: {
      name: bot.user.username,
      icon_url: bot.user.avatarURL
    },
    //title: "Token-stand",
    //url: "http://google.com",
    //description: "Zu dieser Zeit gibt es nur ein Kommando namens: " + prefix + "hilfe",
    fields: [{
        name: "Token-stand",
        value: userData[sender.id].tokens
      }
      //{
      //  name: "Masked links",
      //  value: "You can put [masked links](http://google.com) inside of rich embeds."
      //}
    ],
    timestamp: new Date(),
    footer: {
      icon_url: bot.user.avatarURL,
      text: "© Sky-Lokation-Network"
    }
  }
});
   }
   }
   if(msg.content === prefix + 'täglich') {
      if(wartungsarbeiten === "ja") {
          msg.reply("Der Bot ist gerade in Wartungsarbeiten, bitte melde dich später wieder!");
      } else {
       if(userData[sender.id].lastDaily != moment().format('L')) {
           userData[sender.id].lastDaily = moment().format('L');
           userData[sender.id].tokens += 1000;
           msg.channel.send({embed: {
    color: 3447003,
    author: {
      name: bot.user.username,
      icon_url: bot.user.avatarURL
    },
    title: "Zu deinem Konto-Stand wurden 1000 Tokens hinzugefügt",
    //url: "http://google.com",
    //description: "Zu dieser Zeit gibt es nur ein Kommando namens: " + prefix + "hilfe",
    timestamp: new Date(),
    footer: {
      icon_url: bot.user.avatarURL,
      text: "© Sky-Lokation-Network"
    }
  }
});
       } else {
           msg.channel.send({embed: {
               title: "Du hast heute schon deine 1000 Tokens abgeholt! Du kannst deine nächsten Tokens " + moment().endOf('day').fromNow() + " abholenn!"
           }});
       }

       fs.writeFile('Storage/userData.json', JSON.stringify(userData));
   }
}
   if(msg.content === prefix + "regeln") {
      if(wartungsarbeiten === "ja") {
          msg.reply("Der Bot ist gerade in Wartungsarbeiten, bitte melde dich später wieder!");
      } else {
       msg.reply("Dieses Kommando kommt noch!");
   }
}


});

bot.login('NDI5MjUzOTI2MzI0NDA0MjI0.DZ-9kw.svx7TUZA8f7FkF3WRIu8Wmro03A');