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
    childcarePlans = "not specified",
    leaveWeeks = "not specified"
  } = req.body;

  const prompt = `You are an expert financial planner specializing in family finances. Create a detailed, realistic financial plan for a couple or individual preparing for a new baby.

User details:
- Annual household income: $${annualIncome}
- Current savings/investments: $${currentSavings}
- Monthly expenses: $${monthlyExpenses}
- Location: ${location}
- Months until due date: ${monthsUntilDue}
- Childcare plans: ${childcarePlans}
- Maternity/paternity leave: ${leaveWeeks} weeks

Include in sections with clear headings:
1. Cost Estimates (one-time and ongoing, adjusted for location)
2. Budget Adjustments & Cash Flow Impact
3. Savings Goals (emergency fund, college, etc.)
4. Insurance & Benefits Updates (health, life, disability)
5. Leave & Income Impact
6. Tax Credits & Government Benefits
7. 12-Month Action Timeline

Be encouraging, realistic, and use bullet points. Format with **bold headings** and clear structure.`;

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.7,
      max_tokens: 2000,
    });

    res.status(200).json({ output: completion.choices[0].message.content });
  } catch (error) {
    console.error(error);
    res.status(500).json({ output: "Error generating plan. Please try again." });
  }
}
