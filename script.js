const yearElement = document.querySelector("[data-current-year]");

if (yearElement) {
  yearElement.textContent = new Date().getFullYear();
}

document.querySelectorAll("img[data-optional-image]").forEach((image) => {
  const markMissing = () => {
    image.hidden = true;
    image.closest(".image-frame")?.classList.add("is-missing");
  };

  image.addEventListener("error", markMissing);

  if (image.complete && image.naturalWidth === 0) {
    markMissing();
  }
});
