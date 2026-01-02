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
​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​
