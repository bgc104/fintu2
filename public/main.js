/*********************************
 * Drawer Navigation (Global)
 *********************************/
document.addEventListener("DOMContentLoaded", () => {
  const menuToggle = document.querySelector(".menu-toggle");
  const drawer = document.getElementById("drawer");
  const overlay = document.getElementById("drawerOverlay");

  if (menuToggle && drawer && overlay) {
    menuToggle.addEventListener("click", () => {
      drawer.classList.add("open");
      overlay.classList.add("show");
    });

    overlay.addEventListener("click", () => {
      drawer.classList.remove("open");
      overlay.classList.remove("show");
    });
  }

  /*********************************
   * Home Buying Form (Page-Specific)
   *********************************/
  const homeForm = document.getElementById("homeForm");

  if (homeForm) {
    homeForm.addEventListener("submit", async (e) => {
      e.preventDefault();

      const formData = new FormData(homeForm);
      const payload = Object.fromEntries(formData.entries());

      const resultDiv = document.getElementById("result");
      resultDiv.textContent = "Generating your plan...";

      try {
        const response = await fetch("/api/generate-home-plan", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload)
        });

        const data = await response.json();
        resultDiv.innerHTML = `<pre>${data.output}</pre>`;
      } catch (err) {
        resultDiv.textContent = "Something went wrong. Please try again.";
      }
    });
  }
});
