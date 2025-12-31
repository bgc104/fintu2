export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const {
    income,
    savings,
    credit,
    price,
    timeline
  } = req.body;

  const prompt = `
You are a financial planning assistant.
Generate a structured, educational home-buying financial plan.

User inputs:
- Income range: ${income}
- Savings range: ${savings}
- Credit profile: ${credit}
- Home price range: ${price}
- Timeline: ${timeline}

Rules:
- Use ranges only
- No financial advice language
- Fixed sections:
1. Readiness Snapshot
2. Cost Reality
3. Risk Warnings
4. 12-Month Action Plan
5. Common Mistakes
`;

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "gpt-4.1-mini",
        messages: [
          { role: "system", content: "You are a careful financial educator." },
          { role: "user", content: prompt }
        ],
        temperature: 0.5
      })
    });

    const json = await response.json();
    res.status(200).json({ output: json.choices[0].message.content });

  } catch (error) {
    res.status(500).json({ error: "Failed to generate plan" });
  }
}
