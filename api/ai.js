export const config = {
  runtime: 'edge',
};

export default async function handler(req) {
  if (req.method!== 'POST') {
    return new Response(JSON.stringify({ error: 'Use POST only' }), {
      status: 405,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  try {
    const body = await req.json();

    const hackClubRes = await fetch('https://ai.hackclub.com/v1/chat/completions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: 'llama-3.3-70b-versatile',
        messages: body.messages,
        stream: false,
        temperature: 0.7
      }),
    });

    const data = await hackClubRes.json();

    if (data.error) {
      return new Response(JSON.stringify({ error: data.error.message }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    return new Response(JSON.stringify(data), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });

  } catch (error) {
    return new Response(JSON.stringify({ error: 'Server crashed: ' + error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
