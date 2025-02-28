document.addEventListener('contextmenu', function(e) {
  e.preventDefault();
});

document.addEventListener('keydown', function(e) {
  if (e.key === 'F12' || (e.ctrlKey && e.shiftKey && e.key === 'I')) {
      e.preventDefault();
  }
});

const dropdown = document.getElementById("zone-select");
const imageContainer = document.getElementById("image-container");
const prevBtn = document.getElementById("prev-btn");
const nextBtn = document.getElementById("next-btn");
const viewAllBtn = document.getElementById("view-all-btn");
const allImagesContainer = document.getElementById("all-images-container");

let currentZone = "";
let currentIndex = 0;
let isViewingAll = false;
let images = [];

async function loadImages(zone) {
  try {
    const response = await fetch(zone);
    const text = await response.text();
    const imageUrls = text.trim().split("\n");
    return imageUrls;
  } catch (error) {
    console.error("Error loading images:", error);
    return [];
  }
}

function updateImages() {
  imageContainer.innerHTML = "";

  images.forEach((src, index) => {
    const img = document.createElement("img");
    img.src = src;
    img.classList.toggle("active", index === currentIndex);
    imageContainer.appendChild(img);
  });
}

function showAllImages() {
  allImagesContainer.innerHTML = "";

  images.forEach((src) => {
    const img = document.createElement("img");
    img.src = src;
    allImagesContainer.appendChild(img);
  });

  imageContainer.style.display = "none";
  allImagesContainer.style.display = "flex";
}

function showSingleImage() {
  updateImages();
  imageContainer.style.display = "flex";
  allImagesContainer.style.display = "none";
}

function toggleViewButton() {
  const infoSections = document.querySelectorAll("body > div:not(.dropdown):not(.image-container):not(.button-container):not(.all-images-container)");

  if (isViewingAll) {
    viewAllBtn.textContent = "ดูทั้งหมด";
    showSingleImage();
    infoSections.forEach(section => section.style.display = "block");
  } else {
    viewAllBtn.textContent = "ดูรูปเดียว";
    showAllImages();
    infoSections.forEach(section => section.style.display = "none");
  }
  isViewingAll = !isViewingAll;
}

dropdown.addEventListener("change", async (e) => {
  currentZone = e.target.value;
  currentIndex = 0;
  images = await loadImages(currentZone);
  isViewingAll = false;
  viewAllBtn.textContent = "ดูทั้งหมด";
  showSingleImage();
});

prevBtn.addEventListener("click", () => {
  currentIndex = (currentIndex - 1 + images.length) % images.length;
  updateImages();
});

nextBtn.addEventListener("click", () => {
  currentIndex = (currentIndex + 1) % images.length;
  updateImages();
});

viewAllBtn.addEventListener("click", () => {
  toggleViewButton();
});

document.getElementById("scroll-to-top").addEventListener("click", function () {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

dropdown.dispatchEvent(new Event("change"));
