const Discord = require("discord.js");
const bot = new Discord.Client();
const fs = require('fs');
const moment = require('moment');
var wartungsarbeiten = "nein";
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
       msg.channel.send("Server Regeln\n§1 - Umgang mit Usern\nJeder Nutzer des Discord Servers ist stets freundlich zu behandeln. Es wird niemand wegen seiner Sexualität seiner Abstammung o.Ä. diskriminiert oder gar beleidigt.\n\n§2 - Störgeräusche\nJeder ist dazu verpflichtet, sein Mikrofon so einzustellen, dass man keine Stör- oder Hintergrundgeräusche hört. Das Abspielen von Sounds ist nur dann gestattet, wenn alle beteiligten im Channel damit einverstanden sind. Voice Changer sind ebenfalls verboten und werden ggf. mit einem Ban bestaft.\n\n§3 - Ausnutzung der Rechte\nEs wird niemand ohne einen bestimmten Grund vom Server gekickt, gebannt oder gemoved.\n\n§4 - Avatar\nAvatare dürfen keine pornographischen, rassistischen, beleidigenden oder andere gegen das deutsche Recht verstoßenden Inhalte beinhalten.\n\n§5 - Channel-hopping\nDas ständige betreten und verlassen eines Channels ist untersagt.\n\n§6 - Gespräche aufnehmen\nDas Aufnehmen von Gesprächen ist nur erlaubt, wenn alle beteiligten im Channel einverstanden sind.\n\n7. Abwesenheit\nJeder der länger als 15 Minuten abwesend ist, muss in den AFK-Channel gehen.\n\n8. Anweisungen\nDas verweigern von Anweisungen von Teammitgliedern werden mit einem kick oder Bann bestraft. @.everyone\n\n§9 - Namensgebung\nJeder Nutzer ist dazu verpflichtet seinen Name so zu wählen, das er nicht beleidigend ist. Das Faken eines Nutzers ist verboten. Jeder User muss seinen InGame Name auf dem Discord Server verwenden, wobei der Name keine Clantags enthalten sollte. Falls ein Clantag dringend benötigt wird, muss dies mit einem Teammitglied abgesprochen werden.\nDiese Regel gilt auch für die Spiele Nachricht.\nAlle Verstöße werden dementsprechend bestraft.\n\n§10 - Spam\nSpam in jeglicher Form ist untersagt und wird mit einem Kick oder Ban bestraft.\n\n§11 - Unwissenheit\nUnwissenheit schützt vor Strafe nicht.\n\n§12 - VPNs und IP-Blocker\nVPNs und sogenannte IP-Blocker sind strengstens untersagt und werden bestraft\n\n$13-Die Regeln\nAlle Regeln müssen eingehalten werden.\nMit betreten des Disocrd Servers werden die Regeln akzeptiert.\n\n$14- Admins/Owner\nDie Admin's und Owner haben immer Recht, ihren aussagen ist folge zu leisten.\n\n$15-Umfragen\nAlle unter Aktiv sind unbefugt Umfragen zu machen! Also für Alle unter diesem Rang ist es verboten und wird bestraft!\n\n$16-Taggen\nDas unnötige taggen von @.everyone und @.here sowie das durchgängige taggen @name u. ä. ist untersagt\n$17-  Das Anbetteln ist verboten und verstößt gegen die Regel es kann zu einen Kick oder BAN Kommen also benimmt euch bitte");
   }
}


});

bot.login(process.env.BOT_TOKEN);
