document.addEventListener("DOMContentLoaded", () => {
  /*********************************
   * Drawer Navigation (Global)
   *********************************/
  const menuToggle = document.querySelector(".menu-toggle");
  const drawer = document.querySelector(".drawer");
  const overlay = document.querySelector(".drawer-overlay");

  if (menuToggle && drawer && overlay) {
    menuToggle.addEventListener("click", () => {
      drawer.classList.add("open");
      overlay.classList.add("show");
      document.body.style.overflow = "hidden";
    });

    overlay.addEventListener("click", () => {
      drawer.classList.remove("open");
      overlay.classList.remove("show");
      document.body.style.overflow = "";
    });

    const closeBtn = document.querySelector(".close-drawer");
    if (closeBtn) {
      closeBtn.addEventListener("click", () => {
        drawer.classList.remove("open");
        overlay.classList.remove("show");
        document.body.style.overflow = "";
      });
    }

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && drawer.classList.contains("open")) {
        drawer.classList.remove("open");
        overlay.classList.remove("show");
        document.body.style.overflow = "";
      }
    });
  }

  /*********************************
   * Home Buying Form
   *********************************/
  const homeForm = document.getElementById("homeForm");
  if (homeForm) {
    homeForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      const payload = Object.fromEntries(new FormData(homeForm));
      const resultDiv = document.getElementById("result");
      resultDiv.textContent = "Generating your personalized financial plan...";
      try {
        const response = await fetch("/api/generate-home-plan", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        if (!response.ok) throw new Error(`Server error: ${response.status}`);
        const data = await response.json();
        resultDiv.innerHTML = `<pre>${data.output || data}</pre>`;
      } catch (err) {
        resultDiv.textContent = "Sorry, something went wrong. Please try again.";
      }
    });
  }

  /*********************************
   * Having a Baby Form
   *********************************/
  const babyForm = document.getElementById("babyForm");
  if (babyForm) {
    babyForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      const payload = Object.fromEntries(new FormData(babyForm));
      const resultDiv = document.getElementById("result");
      resultDiv.textContent = "Generating your personalized financial plan...";
      try {
        const response = await fetch("/api/generate-baby-plan", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        if (!response.ok) throw new Error(`Server error: ${response.status}`);
        const data = await response.json();
        resultDiv.innerHTML = `<pre>${data.output || data}</pre>`;
      } catch (err) {
        resultDiv.textContent = "Sorry, something went wrong. Please try again.";
      }
    });
  }

  /*********************************
   * Career Change Form
   *********************************/
  const careerForm = document.getElementById("careerForm");
  if (careerForm) {
    careerForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      const payload = Object.fromEntries(new FormData(careerForm));
      const resultDiv = document.getElementById("result");
      resultDiv.textContent = "Generating your personalized financial plan...";
      try {
        const response = await fetch("/api/generate-career-plan", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        if (!response.ok) throw new Error(`Server error: ${response.status}`);
        const data = await response.json();
        resultDiv.innerHTML = `<pre>${data.output || data}</pre>`;
      } catch (err) {
        resultDiv.textContent = "Sorry, something went wrong. Please try again.";
      }
    });
  }

  /*********************************
   * Divorce Form
   *********************************/
  const divorceForm = document.getElementById("divorceForm");
  if (divorceForm) {
    divorceForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      const payload = Object.fromEntries(new FormData(divorceForm));
      const resultDiv = document.getElementById("result");
      resultDiv.textContent = "Generating your personalized financial plan...";
      try {
        const response = await fetch("/api/generate-divorce-plan", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        if (!response.ok) throw new Error(`Server error: ${response.status}`);
        const data = await response.json();
        resultDiv.innerHTML = `<pre>${data.output || data}</pre>`;
      } catch (err) {
        resultDiv.textContent = "Sorry, something went wrong. Please try again.";
      }
    });
  }

  /*********************************
   * Starting a Business Form
   *********************************/
  const businessForm = document.getElementById("businessForm");
  if (businessForm) {
    businessForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      const payload = Object.fromEntries(new FormData(businessForm));
      const resultDiv = document.getElementById("result");
      resultDiv.textContent = "Generating your personalized financial plan...";
      try {
        const response = await fetch("/api/generate-business-plan", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        if (!response.ok) throw new Error(`Server error: ${response.status}`);
        const data = await response.json();
        resultDiv.innerHTML = `<pre>${data.output || data}</pre>`;
      } catch (err) {
        resultDiv.textContent = "Sorry, something went wrong. Please try again.";
      }
    });
  }

  /*********************************
   * Early Retirement Form
   *********************************/
  const retirementForm = document.getElementById("retirementForm");
  if (retirementForm) {
    retirementForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      const payload = Object.fromEntries(new FormData(retirementForm));
      const resultDiv = document.getElementById("result");
      resultDiv.textContent = "Generating your personalized financial plan...";
      try {
        const response = await fetch("/api/generate-retirement-plan", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        if (!response.ok) throw new Error(`Server error: ${response.status}`);
        const data = await response.json();
        resultDiv.innerHTML = `<pre>${data.output || data}</pre>`;
      } catch (err) {
        resultDiv.textContent = "Sorry, something went wrong. Please try again.";
      }
    });
  }
});

/*********************************
 * Global Print AI Plan Function
 *********************************/
window.printAIPlan = function () {
  const resultElement = document.getElementById("result");
  if (!resultElement || !resultElement.innerText.trim()) {
    alert("No plan generated yet. Please submit the form first.");
    return;
  }

  const resultContent = resultElement.innerText;

  const printWindow = window.open('', '_blank', 'height=700,width=900');
  printWindow.document.write('<html><head><title>fintu AI Financial Plan</title>');
  printWindow.document.write('<style>');
  printWindow.document.write('body { font-family: -apple-system, sans-serif; padding: 40px; line-height: 1.7; font-size: 14pt; color: #000; max-width: 800px; margin: 0 auto; }');
  printWindow.document.write('h1 { font-size: 24pt; text-align: center; margin-bottom: 40px; color: #0070f3; }');
  printWindow.document.write('pre { white-space: pre-wrap; word-wrap: break-word; font-size: 14pt; background: #f9fbff; padding: 20px; border-radius: 12px; }');
  printWindow.document.write('strong { color: #0070f3; }');
  printWindow.document.write('@page { margin: 1in; }');
  printWindow.document.write('</style></head><body>');
  printWindow.document.write('<h1>fintu AI Financial Plan</h1>');
  printWindow.document.write('<pre>' + resultContent.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;') + '</pre>');
  printWindow.document.write('</body></html>');
  printWindow.document.close();
  printWindow.focus();
  setTimeout(() => {
    printWindow.print();
  }, 500);
};
