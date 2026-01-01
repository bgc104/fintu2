import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export default async function (req, res) {
  if (req.method !== "POST") return res.status(405).end();

  const {
    currentSalary,
    currentSavings,
    monthlyExpenses,
    targetSalary,
    retrainingCosts = "0",
    transitionMonths,
    location,
    riskTolerance = "moderate"
  } = req.body;

  const prompt = `You are an expert career and financial planner. Create a detailed, realistic financial plan for someone making a career change.

User details:
- Current salary: $${currentSalary}
- Savings/investments: $${currentSavings}
- Monthly expenses: $${monthlyExpenses}
- Target salary in new career: $${targetSalary}
- Retraining/education costs: $${retrainingCosts}
- Expected transition period (months off/reduced income): ${transitionMonths}
- Location: ${location}
- Risk tolerance: ${riskTolerance}

Include in sections with clear headings:
1. Financial Readiness Snapshot
2. Runway & Cash Flow Analysis
3. Cost of Transition (retraining, lost income)
4. Income Gap & Recovery Timeline
5. Risk Assessment & Emergency Planning
6. Investment & Savings Strategy During Transition
7. 12-Month Action Plan

Be encouraging but realistic. Use bullet points and bold key numbers.`;

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
