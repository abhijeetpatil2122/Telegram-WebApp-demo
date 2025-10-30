/*CMD
  command: /start
  help: 
  need_reply: false
  auto_retry_time: 
  folder: 

  <<ANSWER

  ANSWER

  <<KEYBOARD

  KEYBOARD
  aliases: 
  group: 
CMD*/

// Command: /start

// This command shows both Inline and Keyboard button styles for WebApp

// Generate a single WebApp URL for the demo webapp
const demoUrl = WebApp.getUrl({
  command: "webappdemo" // This points to the command that will render the webapp
})

// Inline Button Style
Api.sendMessage({
  text:
    "🌐 <b>Telegram WebApp Demo</b>\n\nTap below to open via Inline button:",
  parse_mode: "HTML",
  reply_markup: {
    inline_keyboard: [
      [{ text: "🚀 Open Demo WebApp", web_app: { url: demoUrl } }]
    ]
  }
})

// Keyboard Button Style
Api.sendMessage({
  text: "🧭 Or open the same WebApp via Keyboard button:",
  parse_mode: "HTML",
  reply_markup: {
    resize_keyboard: true,
    keyboard: [[{ text: "🧪 Demo MiniApp", web_app: { url: demoUrl } }]]
  }
})

// with this inspect we get actual webapp URL
//Bot.inspect(demoUrl)

