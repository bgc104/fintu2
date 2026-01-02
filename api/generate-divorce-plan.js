import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export default async function (req, res) {
  if (req.method !== "POST") return res.status(405).end();

  const {
    combinedIncome,
    currentSavings,
    monthlyExpenses,
    totalAssets,
    totalDebts,
    numChildren = "0",
    alimonyMonths = "0",
    location
  } = req.body;

  const prompt = `You are an expert financial planner specializing in divorce and separation. Create a detailed, realistic financial plan for someone going through a divorce.

User details:
- Combined household income: $${combinedIncome}
- Current savings/investments: $${currentSavings}
- Monthly household expenses: $${monthlyExpenses}
- Total assets: $${totalAssets}
- Total debts: $${totalDebts}
- Number of children: ${numChildren}
- Expected alimony duration: ${alimonyMonths} months
- Location: ${location}

Include in sections with clear headings:
1. Financial Snapshot & Asset Division
2. Cash Flow & Income Changes
3. Alimony/Child Support Estimates
4. Housing & Living Expenses Post-Divorce
5. Debt & Liability Management
6. Retirement & Long-Term Savings Impact
7. 12-Month Action Plan & Next Steps

Be empathetic, encouraging, and realistic. Use bullet points and bold key figures.`;

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
