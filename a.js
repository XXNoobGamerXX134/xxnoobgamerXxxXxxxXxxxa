const Discord = require("discord.js");
const bot = new Discord.Client();
const fs = require('fs');
const moment = require('moment');
const mysql = require("mysql");
var wartungsarbeiten = "nein";
const prefix = "/";

//JSON
let userData = JSON.parse(fs.readFileSync("Storage/userData.json", 'utf8'));

bot.on("ready", () => {
if(wartungsarbeiten === 'ja') {
bot.user.setGame("Wartungsarbeiten");
} else {
bot.user.setGame("Sage /hilfe für eine liste von Kommandos!");   
}
});

bot.on('message', msg => {
    
    bot.on("ready", () => {
       msg.guild.channels.get("403602677113683968").send("Ich über die Nacht in Wartungsarbeiten bleiben. Entschuldigt!"); 
    });
    
    const args = msg.content.slice(prefix.length).trim().split(/ +/g);
    var sender = msg.author;

    if(!userData[sender.id]) userData[sender.id] = {};
    if(!userData[sender.id].tokens) userData[sender.id].tokens = 5000;
    if(!userData[sender.id].lastDaily) userData[sender.id].lastDaily = 'Noch nicht eingesammelt';
    //if(!userData[sender.id].username) userData[sender.id].username = msg.author;

    fs.writeFile('Storage/userData.json', JSON.stringify(userData));


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

    //if(msg.content.startsWith(prefix + "eco set")) {
    //  const user = msg.mentions.users.first();
    //  const oof = user.id;
    //  const tok = args.splice(1, args.length).join(' ')
    //  
    //  userData[oof].tokens = tok;
    //}
    
    if(msg.content.startsWith("%setgame")) {
     let sayMessage = args.slice(1).join(' ');
     bot.user.setGame(sayMessage);   
    }

});

bot.login(process.env.BOT_TOKEN);
