export default async function handler(req, res) {
  if (req.method!== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const hackClubRes = await fetch('https://ai.hackclub.com/v1/chat/completions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: 'meta-llama/llama-3.1-8b-instruct', // هذا هو السطر الناقص
        messages: req.body.messages
      })
    });

    const data = await hackClubRes.json();
    
    // كان الـ API رجع Error نرجعوه
    if (data.error) {
      return res.status(500).json({ error: data.error.message });
    }
    
    res.status(200).json(data);
    
  } catch (error) {
    res.status(500).json({ error: 'AI Server Error: ' + error.message });
  }
}
