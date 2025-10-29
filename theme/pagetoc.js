// === mdbook-pagetoc dynamic generation ===

document.addEventListener("DOMContentLoaded", function () {
  const content = document.querySelector("main");
  const headings = content.querySelectorAll("h2, h3, h4");

  const toc = document.createElement("nav");
  toc.classList.add("pagetoc");

  headings.forEach(h => {
    if (h.classList.contains("toc-ignore")) return;

    const link = document.createElement("a");
    link.textContent = h.textContent;
    link.href = "#" + h.id;
    link.classList.add("pagelink", `pagelink-${h.tagName.toLowerCase()}`);

    toc.appendChild(link);
  });

  const wrapper = document.createElement("div");
  wrapper.classList.add("sidetoc");
  wrapper.appendChild(toc);
  document.body.appendChild(wrapper);

  // Highlight current section on scroll
  const links = toc.querySelectorAll("a");
  window.addEventListener("scroll", () => {
    let current = "";
    headings.forEach(h => {
      const top = h.getBoundingClientRect().top + window.scrollY;
      if (window.scrollY >= top - 100) current = h.id;
    });
    links.forEach(a => {
      a.classList.toggle("active", a.getAttribute("href") === "#" + current);
    });
  });
});