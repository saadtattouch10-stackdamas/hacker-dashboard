export default async function handler(req, res) {
  // نقبلو كان POST
  if (req.method!== 'POST') {
    return res.status(405).json({ error: 'Use POST only' });
  }

  try {
    // نكلمو HackClub
    const hackClubRes = await fetch('https://ai.hackclub.com/v1/chat/completions', {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'llama-3.1-8b-instant', // بدلنا الـ model هذا يخدم ديما
        messages: req.body.messages,
        max_tokens: 500
      })
    });

    const data = await hackClubRes.json();

    // كان HackClub رجع Error، نوريوها
    if (!hackClubRes.ok) {
      console.error('HackClub Error:', data);
      return res.status(hackClubRes.status).json({ 
        error: data.error?.message || 'HackClub API Error' 
      });
    }
    
    // كل شي تمام، نرجعو الجواب
    res.status(200).json(data);
    
  } catch (error) {
    // كان صار Crash في السارفر متاعنا
    console.error('Server Crash:', error);
    res.status(500).json({ error: 'Server crashed: ' + error.message });
  }
}
