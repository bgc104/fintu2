import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export default async function (req, res) {
  if (req.method !== "POST") return res.status(405).end();

  const {
    currentIncome,
    currentSavings,
    monthlyExpenses,
    startupCosts,
    monthlyBurn,
    monthsToRevenue,
    fundingSources = "not specified",
    location
  } = req.body;

  const prompt = `You are an expert startup financial planner. Create a detailed, realistic financial plan for someone starting a new business.

User details:
- Current personal income: $${currentIncome}
- Current savings/investments: $${currentSavings}
- Monthly personal expenses: $${monthlyExpenses}
- Estimated startup costs: $${startupCosts}
- Monthly business burn rate: $${monthlyBurn}
- Projected time to revenue: ${monthsToRevenue} months
- Funding sources: ${fundingSources}
- Location: ${location}

Include in sections with clear headings:
1. Financial Readiness Snapshot
2. Runway & Survival Analysis
3. Startup Cost Breakdown & Funding Plan
4. Cash Flow Forecast (first 12-24 months)
5. Personal Financial Safety Net
6. Risk Assessment & Contingencies
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
