document.getElementById("homeForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const formData = new FormData(e.target);
  const payload = Object.fromEntries(formData.entries());

  const resultDiv = document.getElementById("result");
  resultDiv.innerHTML = "Generating your plan...";

  try {
    const response = await fetch("/api/generate-home-plan", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });

    const data = await response.json();
    resultDiv.innerHTML = `<pre>${data.output}</pre>`;
  } catch (err) {
    resultDiv.innerHTML = "Something went wrong.";
  }
});
