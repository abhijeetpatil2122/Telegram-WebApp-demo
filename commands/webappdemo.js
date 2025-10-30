/*CMD
  command: webappdemo
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

// Command: webappdemo

// This command renders our demo webapp made in HTML, CSS and VueJS (single file)

WebApp.render({
  template: "webapp.html"
})

