import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export default async function (req, res) {
  if (req.method !== "POST") return res.status(405).end();

  const {
    annualIncome,
    currentSavings,
    monthlyExpenses,
    location,
    monthsUntilDue,
    childcarePlans = "not specified"
  } = req.body;

  const prompt = `You are an expert financial planner. Create a detailed, realistic financial plan for preparing for a new baby.

Details:
- Household income: $${annualIncome}
- Savings: $${currentSavings}
- Monthly expenses: $${monthlyExpenses}
- Location: ${location}
- Months until due: ${monthsUntilDue}
- Childcare: ${childcarePlans}

Cover: cost estimates (location-adjusted), budget changes, savings goals, insurance, leave impact, tax benefits, timeline. Use sections and bullets. Be encouraging.`;

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "system", content: prompt }],
      temperature: 0.7,
      max_tokens: 1500,
    });
    res.status(200).send(completion.choices[0].message.content);
  } catch (error) {
    res.status(500).send("Error: " + error.message);
  }
}
