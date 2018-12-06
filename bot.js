
const Discord = require("discord.js");//حقوق IiKaReeeM ...
const ytdl = require("ytdl-core");//حقوق IiKaReeeM ...
const { Client, Util } = require('discord.js');//حقوق IiKaReeeM ...
const fs = require('fs');//حقوق IiKaReeeM ...
const getYoutubeID = require('get-youtube-id');//حقوق IiKaReeeM ...
const moment = require('moment');//حقوق IiKaReeeM ...
const db = require('quick.db');//حقوق IiKaReeeM ...
const client = new Discord.Client();//حقوق IiKaReeeM ...  
const giphy = require('giphy-api')();//حقوق IiKaReeeM ...    
const googl = require('goo.gl');//حقوق IiKaReeeM ...  
const translate = require('google-translate-api');//حقوق IiKaReeeM ...  
const UserBlocked = new Set();//حقوق IiKaReeeM ...
const jimp = require('jimp');//حقوق IiKaReeeM ...  
const math = require('math-expression-evaluator');//حقوق IiKaReeeM ...
const stripIndents = require('common-tags').stripIndents;//حقوق IiKaReeeM ...
const figlet = require('figlet');//حقوق IiKaReeeM ...
const google = require('google-it');//حقوق IiKaReeeM ...
const queue = new Map();//حقوق IiKaReeeM ...
const zalgo = require('zalgolize');//حقوق IiKaReeeM ...  
const fetchVideoInfo = require('youtube-info');//حقوق IiKaReeeM ...
const YouTube = require('simple-youtube-api');//حقوق IiKaReeeM ...
const youtube = new YouTube("AIzaSyAdORXg7UZUo7sePv97JyoDqtQVi3Ll0b8");//حقوق IiKaReeeM ...
const sql = require("sqlite");//حقوق IiKaReeeM ...
 const dateFormat = require('dateformat');//حقوق IiKaReeeM ...
 const pretty = require('pretty-ms')
const sWlc = {}
const prefix = "*"


 
client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);//حقوق IiKaReeeM ...
    console.log(`in ${client.guilds.size} servers `)
    console.log(`[Codes] ${client.users.size}`)
    client.user.setStatus("idle")
});//حقوق IiKaReeeM ...
///////////////////////////////////////////////////////////////////////

client.on('message', async msg => { 
    if (msg.author.bot) return undefined;//حقوق IiKaReeeM ...
    
    if (!msg.content.startsWith(prefix)) return undefined;//حقوق IiKaReeeM ...
    const args = msg.content.split(' ');//حقوق IiKaReeeM ...
    const searchString = args.slice(1).join(' ');//حقوق IiKaReeeM ...
    
    const url = args[1] ? args[1].replace(/<(.+)>/g, '$1') : '';//حقوق IiKaReeeM ...
    const serverQueue = queue.get(msg.guild.id);//حقوق IiKaReeeM ...

    let command = msg.content.toLowerCase().split(" ")[0];//حقوق IiKaReeeM ...
    command = command.slice(prefix.length)

    if (command === `p`) {
        const voiceChannel = msg.member.voiceChannel;//حقوق IiKaReeeM ...
        if (!voiceChannel) return msg.channel.send('يجب ان تكون بروم صوتي');//حقوق IiKaReeeM ...
        const permissions = voiceChannel.permissionsFor(msg.client.user);//حقوق IiKaReeeM ...
        if (!permissions.has('CONNECT')) {
            
            return msg.channel.send('**I Dont Have Permission** `CONNECT` **In the room**');//حقوق IiKaReeeM ...
        }
        if (!permissions.has('SPEAK')) {
            return msg.channel.send('**I Dont Have Permission** `SPEAK` **In the room');//حقوق IiKaReeeM ...
        }
 
        if (!permissions.has('EMBED_LINKS')) {
            return msg.channel.sendMessage("**I Dont Have Permission** `EMBED LINKS`")
        }
 
        if (url.match(/^https?:\/\/(www.youtube.com|youtube.com)\/playlist(.*)$/)) {
            const playlist = await youtube.getPlaylist(url);//حقوق IiKaReeeM ...
            const videos = await playlist.getVideos();//حقوق IiKaReeeM ...
            
            for (const video of Object.values(videos)) {
                const video2 = await youtube.getVideoByID(video.id);//حقوق IiKaReeeM ... 
                await handleVideo(video2, msg, voiceChannel, true);//حقوق IiKaReeeM ... 
            }
            return msg.channel.send(` **${playlist.title}** <a:pepe1:512762416157818890> تم الإضآفة إلى قأئمة التشغيل`);//حقوق IiKaReeeM ...
        } else {
            try {
 
                var video = await youtube.getVideo(url);//حقوق IiKaReeeM ...
            } catch (error) {
                try {
                    var videos = await youtube.searchVideos(searchString, 5);//حقوق IiKaReeeM ...
                    let index = 0;//حقوق IiKaReeeM ...
                    const embed1 = new Discord.RichEmbed()
                    .setDescription(`<a:dance:512761910714957854> **الرجآء من حضرتك إختيآر رقم المقطع** :
${videos.map(video2 => `[**${++index} **] \`${video2.title}\``).join('\n')}`)

                    .setFooter("Galaxy")
                    msg.channel.sendEmbed(embed1).then(message =>{message.delete(20000)})
                   
                   
                    try {
                        var response = await msg.channel.awaitMessages(msg2 => msg2.content > 0 && msg2.content < 11, {
                            maxMatches: 1,
                            time: 15000,
                            errors: ['time']
                        });//حقوق IiKaReeeM ...
                    } catch (err) {
                        console.error(err);//حقوق IiKaReeeM ...
                        return msg.channel.send('لم يتم إختيآر مقطع صوتي');//حقوق IiKaReeeM ...
                    }
                    const videoIndex = parseInt(response.first().content);//حقوق IiKaReeeM ...
                    var video = await youtube.getVideoByID(videos[videoIndex - 1].id);//حقوق IiKaReeeM ...
                } catch (err) {
                    console.error(err);//حقوق IiKaReeeM ...
                    return msg.channel.send(':X: لا يتوفر نتآئج بحث ');//حقوق IiKaReeeM ...
                }
            }
 
            return handleVideo(video, msg, voiceChannel);//حقوق IiKaReeeM ...
        }
    } else if (command === `s`) {
        if (!msg.member.voiceChannel) return msg.channel.send('أنت لست بروم صوتي .');//حقوق IiKaReeeM ...
        if (!serverQueue) return msg.channel.send('لا يتوفر مقطع لتجآوزه');//حقوق IiKaReeeM ...
        serverQueue.connection.dispatcher.end('تم تجآوز هذآ المقطع');//حقوق IiKaReeeM ...
        return undefined;//حقوق IiKaReeeM ...
    } else if (command === `stop`) {
        if (!msg.member.voiceChannel) return msg.channel.send('أنت لست بروم صوتي .');//حقوق IiKaReeeM ...
        if (!serverQueue) return msg.channel.send('لا يتوفر مقطع لإيقآفه');//حقوق IiKaReeeM ...
        serverQueue.songs = [];//حقوق IiKaReeeM ...
        serverQueue.connection.dispatcher.end('تم إيقآف هذآ المقطع');//حقوق IiKaReeeM ...
        return undefined;//حقوق IiKaReeeM ...
    } else if (command === `v`) {
        if (!msg.member.voiceChannel) return msg.channel.send('أنت لست بروم صوتي .');//حقوق IiKaReeeM ...
        if (!serverQueue) return msg.channel.send('لا يوجد شيء شغآل.');//حقوق IiKaReeeM ...
        if (!args[1]) return msg.channel.send(`:loud_sound: مستوى الصوت **${serverQueue.volume}**`);//حقوق IiKaReeeM ...
        serverQueue.volume = args[1];//حقوق IiKaReeeM ...
        serverQueue.connection.dispatcher.setVolumeLogarithmic(args[1] / 50);//حقوق IiKaReeeM ...
        return msg.channel.send(`:speaker: تم تغير الصوت الي <a:dance:512761910714957854> **${args[1]}**`);//حقوق IiKaReeeM ...
    } else if (command === `np`) {
        if (!serverQueue) return msg.channel.send('لا يوجد شيء حالي ف العمل.');//حقوق IiKaReeeM ...
        const embedNP = new Discord.RichEmbed()
    .setDescription(`:notes: الان يتم تشغيل : **${serverQueue.songs[0].title}**`)
        return msg.channel.sendEmbed(embedNP);//حقوق IiKaReeeM ...
    } else if (command === `q`) {
        if (!serverQueue) return msg.channel.send('لا يوجد شيء حالي ف العمل.<a:kiki:512711076937334784>');//حقوق IiKaReeeM ...
        let index = 0;//حقوق IiKaReeeM ...
        const embedqu = new Discord.RichEmbed()
.setDescription(`**Songs Queue**
${serverQueue.songs.map(song => `**${++index} -** ${song.title}`).join('\n')}
**الان يتم تشغيل** ${serverQueue.songs[0].title}`)
        return msg.channel.sendEmbed(embedqu);//حقوق IiKaReeeM ...
    } else if (command === `pause`) {
        if (serverQueue && serverQueue.playing) {
            serverQueue.playing = false;//حقوق IiKaReeeM ...
            serverQueue.connection.dispatcher.pause();//حقوق IiKaReeeM ...
            return msg.channel.send('تم إيقاف الموسيقى مؤقتا! <a:kiki:512711076937334784>');//حقوق IiKaReeeM ...
        }
        return msg.channel.send('<a:kiki:512711076937334784>لا يوجد شيء حالي ف العمل.');//حقوق IiKaReeeM ...
    } else if (command === "resume") {
        if (serverQueue && !serverQueue.playing) {
            serverQueue.playing = true;//حقوق IiKaReeeM ...
            serverQueue.connection.dispatcher.resume();//حقوق IiKaReeeM ...
            return msg.channel.send('<a:Dance:512758054195036160> استأنفت الموسيقى بالنسبة لك !');//حقوق IiKaReeeM ...
        }
        return msg.channel.send('لا يوجد شيء حالي في العمل. <a:kiki:512711076937334784> ');//حقوق IiKaReeeM ...
    }
 
    return undefined;//حقوق IiKaReeeM ...
});//حقوق IiKaReeeM ...
async function handleVideo(video, msg, voiceChannel, playlist = false) {
    const serverQueue = queue.get(msg.guild.id);//حقوق IiKaReeeM ...
    console.log(video);//حقوق IiKaReeeM ...
    
    const song = {
        id: video.id,
        title: Util.escapeMarkdown(video.title),
        url: `https://www.youtube.com/watch?v=${video.id}`
    };//حقوق IiKaReeeM ...
    if (!serverQueue) {
        const queueConstruct = {
            textChannel: msg.channel,
            voiceChannel: voiceChannel,
            connection: null,
            songs: [],
            volume: 5,
            playing: true
        };//حقوق IiKaReeeM ...
        queue.set(msg.guild.id, queueConstruct);//حقوق IiKaReeeM ...

        queueConstruct.songs.push(song);//حقوق IiKaReeeM ...

        try {
            var connection = await voiceChannel.join();//حقوق IiKaReeeM ...
            queueConstruct.connection = connection;//حقوق IiKaReeeM ...
            play(msg.guild, queueConstruct.songs[0]);//حقوق IiKaReeeM ...
        } catch (error) {
            console.error(`I could not join the voice channel: ${error}`);//حقوق IiKaReeeM ...
            queue.delete(msg.guild.id);//حقوق IiKaReeeM ...
            return msg.channel.send(`لا أستطيع دخول هذآ الروم ${error}`);//حقوق IiKaReeeM ...
        }
    } else {
        serverQueue.songs.push(song);//حقوق IiKaReeeM ...
        console.log(serverQueue.songs);//حقوق IiKaReeeM ...
        if (playlist) return undefined;//حقوق IiKaReeeM ...
        else return msg.channel.send(` **${song.title}**<a:Dance:512758054195036160>
        تم اضافه الاغنية الي القائمة!`);//حقوق IiKaReeeM ...
    }
    return undefined;//حقوق IiKaReeeM ...
}
 
function play(guild, song) {
    const serverQueue = queue.get(guild.id);//حقوق IiKaReeeM ...
 
    if (!song) {
        serverQueue.voiceChannel.leave();//حقوق IiKaReeeM ...
        queue.delete(guild.id);//حقوق IiKaReeeM ...
        return;//حقوق IiKaReeeM ...
    }
    console.log(serverQueue.songs);//حقوق IiKaReeeM ...

    const dispatcher = serverQueue.connection.playStream(ytdl(song.url))
        .on('end', reason => {
            if (reason === 'Stream is not generating quickly enough.') console.log('Song ended.');//حقوق IiKaReeeM ...
            else console.log(reason);//حقوق IiKaReeeM ...
            serverQueue.songs.shift();//حقوق IiKaReeeM ...
            play(guild, serverQueue.songs[0]);//حقوق IiKaReeeM ...
        })
        .on('error', error => console.error(error));//حقوق IiKaReeeM ...
    dispatcher.setVolumeLogarithmic(serverQueue.volume / 5);//حقوق IiKaReeeM ...
 
    serverQueue.textChannel.send(`بدء تشغيل : **${song.title}**`);//حقوق IiKaReeeM ...
}
 ////////////////////////////////////////////////////////////////////////////

const adminprefix = "*";//حقوق IiKaReeeM ...
const devs = ['488970510013693962'];//حقوق IiKaReeeM ...
client.on('message', message => {
  var argresult = message.content.split(` `).slice(1).join(' ');//حقوق IiKaReeeM ...
    if (!devs.includes(message.author.id)) return;//حقوق IiKaReeeM ...

if (message.content.startsWith(adminprefix + 'b')) {
  client.user.setGame(argresult);//حقوق IiKaReeeM ...
    message.channel.sendMessage(`**${argresult} تم تغيير بلاينق البوت إلى **`)
} else
  if (message.content.startsWith(adminprefix + 'z')) {
client.user.setUsername(argresult).then
    message.channel.sendMessage(`**${argresult}** : تم تغيير أسم البوت إلى`)
return message.reply("**لا يمكنك تغيير الاسم يجب عليك الانتظآر لمدة ساعتين . **");//حقوق IiKaReeeM ...
} else
  if (message.content.startsWith(adminprefix + 'g')) {
client.user.setAvatar(argresult);//حقوق IiKaReeeM ...
  message.channel.sendMessage(`**${argresult}** : تم تغير صورة البوت`);//حقوق IiKaReeeM ...
      } else
if (message.content.startsWith(adminprefix + 't')) {
  client.user.setGame(argresult, "https://www.twitch.tv/faresgameryt");//حقوق IiKaReeeM ...
    message.channel.sendMessage(`**تم تغيير تويتش البوت إلى  ${argresult}**`)
}


    });//حقوق IiKaReeeM ...
 ////////////////////////////////////////////////////////////////////////////////
 client.on('message',function(message) { 
    if(message.content === prefix + "invite") {
        if(!message.channel.guild) return;//حقوق IiKaReeeM ...
        var mmmmEmbed = new Discord.RichEmbed()
        .setAuthor(client.user.username)
        .setTitle('-  click here for invite !.')
        .setURL(`https://discordapp.com/api/oauth2/authorize?client_id=512729310059298836&permissions=2097152&scope=bot`)
        .setThumbnail(client.user.avatarURL)
        .setFooter(`- Requested By: ${message.author.tag}`,message.author.avatarURL);//حقوق IiKaReeeM ...
        message.channel.send(mmmmEmbed)
    }
 });//حقوق IiKaReeeM ...
 ////////////////////////////////////////////////////////////////////////////////////////
client.on('message', message => {
  var argresult = message.content.split(` `).slice(1).join(' ');//حقوق IiKaReeeM ...
    if (!devs.includes(message.author.id)) return;//حقوق IiKaReeeM ...

if (message.content.startsWith(adminprefix + 'setstreem')) {
    client.user.setGame(argresult, "https://www.twitch.tv/idk");//حقوق IiKaReeeM ...
      message.channel.sendMessage(`**تم تغيير تويتش البوت إلى  ${argresult}**`)
  }
  
  });//حقوق IiKaReeeM ...


client.on('message',function(message) {
    let args = message.content.split(" ").slice(1).join(" ");//حقوق IiKaReeeM ...
   if(message.content.startsWith(adminprefix + "setWatch")) {
       if(message.author.id !== '488970510013693962') return;//حقوق IiKaReeeM ...
       client.user.setActivity(args,{type: 'WATCHING'});//حقوق IiKaReeeM ...
       message.channel.send("**- :white_check_mark: Done!,**");//حقوق IiKaReeeM ...
   } 
});//حقوق IiKaReeeM ...
client.on('message',function(message) {
    let args = message.content.split(" ").slice(1).join(" ");//حقوق IiKaReeeM ...
   if(message.content.startsWith(adminprefix + "setListen")) {
       if(message.author.id !== '488970510013693962') return;//حقوق IiKaReeeM ...
       client.user.setActivity(args,{type: 'LISTENING'});//حقوق IiKaReeeM ...
       message.channel.send("**- :white_check_mark: Done!,**");//حقوق IiKaReeeM ...
   } 
});//حقوق IiKaReeeM ...

 ////////////////////////////////////////////////////////////////////////////////////////////////
   
   client.on("message", message => {
 if (message.content === "*help") {
  const embed = new Discord.RichEmbed() 
      .setColor("RANDOM")
      .setDescription(`
	  <a:Dance:512758054195036160> <a:dance:512761910714957854> <a:pepe1:512762416157818890>


${prefix}p ⇏ لتشغيل أغنية برآبط أو بأسم

${prefix}s ⇏ لتجآوز الأغنية الحآلية

${prefix}pause ⇏ إيقآف الأغنية مؤقتا

${prefix}resume ⇏ لموآصلة الإغنية بعد إيقآفهآ مؤقتا

${prefix}v ⇏ لتغيير درجة الصوت 100 - 0

${prefix}stop ⇏ لإخرآج البوت من الروم

${prefix}np ⇏ لمعرفة الأغنية المشغلة حآليا

${prefix}q ⇏ لمعرفة قآئمة التشغيل
${prefix}invite ⇏ لدعوة البوت لسيرفرك

•••【 أوامر خاصة بالبوت 】•••

${prefix}b ⇏ تغيير بلاينق البوت

${prefix}z ⇏ تغيير أسم البوت

${prefix}g ⇏ تغير صورة البوت

${prefix}t ⇏ تغيير تويتش البوت

`)
   message.channel.sendEmbed(embed)
    
   }
   });//حقوق IiKaReeeM ...
 
   
 //////////////////////////////////////////////////////////////////////////////
client.login(process.env.BOT_TOKEN)
