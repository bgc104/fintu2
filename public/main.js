document.addEventListener("DOMContentLoaded", () => {
  /*********************************
   * Drawer Navigation (Global)
   *********************************/
  const menuToggle = document.querySelector(".menu-toggle");
  const drawer = document.querySelector(".drawer");
  const overlay = document.querySelector(".drawer-overlay");

  if (menuToggle && drawer && overlay) {
    // Open drawer
    menuToggle.addEventListener("click", () => {
      drawer.classList.add("open");
      overlay.classList.add("show");
      document.body.style.overflow = "hidden"; // Prevent background scroll
    });

    // Close drawer when clicking overlay
    overlay.addEventListener("click", () => {
      drawer.classList.remove("open");
      overlay.classList.remove("show");
      document.body.style.overflow = "";
    });

    // Close drawer with optional close button (if you have one)
    const closeBtn = document.querySelector(".close-drawer");
    if (closeBtn) {
      closeBtn.addEventListener("click", () => {
        drawer.classList.remove("open");
        overlay.classList.remove("show");
        document.body.style.overflow = "";
      });
    }

    // Optional: Close with Escape key
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && drawer.classList.contains("open")) {
        drawer.classList.remove("open");
        overlay.classList.remove("show");
        document.body.style.overflow = "";
      }
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
      const loadingText = "Generating your personalized financial plan...";
      resultDiv.textContent = loadingText;

      try {
        const response = await fetch("/api/generate-home-plan", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });

        if (!response.ok) {
          throw new Error(`Server error: ${response.status}`);
        }

        const data = await response.json();
        resultDiv.innerHTML = `<pre>${data.output || data}</pre>`;
      } catch (err) {
        console.error(err);
        resultDiv.textContent =
          "Sorry, something went wrong. Please check your connection and try again.";
      }
    });
  }

  /*********************************
   * Future form handlers can go here
   * (e.g., Having a Baby, Career Change, etc.)
   *********************************/
});
