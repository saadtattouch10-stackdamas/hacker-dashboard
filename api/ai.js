export default async function handler(req, res) {
  const { prompt } = req.body;
  
  const response = await fetch("https://ai.hackclub.com/chat/completions", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      messages: [{ role: "user", content: prompt }]
    })
  });

  const data = await response.json();
  
  // تأكد انك ترجع array أو object فيه [0]
  res.status(200).json({ 
    reply: data.choices?.[0]?.message?.content || "مافماش رد" 
  });
}
