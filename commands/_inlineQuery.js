/*CMD
  command: /inlineQuery
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

// Command: /inlineQuery

// This handler responds to all inline queries with a simple test article

if (!request.id) return // Safety check — must have inline_query_id

// Create a basic article object
const result = {
  type: "article",
  id: "test_" + Date.now(), // Unique ID for each response
  title: "✅ Inline Test Works",
  description: "Tap to send a test message",
  input_message_content: {
    message_text: "🚀 Inline mode is working perfectly!",
    parse_mode: "HTML"
  }
}

// Send the result back to Telegram
Api.answerInlineQuery({
  inline_query_id: request.id,
  results: [result],
  cache_time: 0, // Always send fresh result
  is_personal: true // Personalized for each user
})
