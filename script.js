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

const lightbox = document.querySelector("[data-lightbox]");
const lightboxImage = document.querySelector("[data-lightbox-image]");
const lightboxClose = document.querySelector(".lightbox-close");

if (lightbox && lightboxImage && lightboxClose) {
  const openLightbox = (image) => {
    lightboxImage.src = image.currentSrc || image.src;
    lightboxImage.alt = image.alt;
    lightbox.hidden = false;
    lightboxClose.focus();
  };

  const closeLightbox = () => {
    lightbox.hidden = true;
    lightboxImage.src = "";
    lightboxImage.alt = "";
  };

  document.querySelectorAll("[data-lightbox-gallery] .gallery-image").forEach((item) => {
    const image = item.querySelector("img");

    if (!image) {
      return;
    }

    item.addEventListener("click", () => {
      if (!image.hidden) {
        openLightbox(image);
      }
    });

    item.addEventListener("keydown", (event) => {
      if ((event.key === "Enter" || event.key === " ") && !image.hidden) {
        event.preventDefault();
        openLightbox(image);
      }
    });
  });

  lightboxClose.addEventListener("click", closeLightbox);

  lightbox.addEventListener("click", (event) => {
    if (event.target === lightbox) {
      closeLightbox();
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && !lightbox.hidden) {
      closeLightbox();
    }
  });
}
