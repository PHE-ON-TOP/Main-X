const dropdown = document.getElementById('zone-select');
const imageContainer = document.getElementById('image-container');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');
const viewAllBtn = document.getElementById('view-all-btn');
const allImagesContainer = document.getElementById('all-images-container');

let currentZone = 'zone1';
let currentIndex = 0;
let isViewingAll = false;

function updateImages() {
  const allImages = document.querySelectorAll('img');
  allImages.forEach((img) => {
    img.classList.remove('active');
  });

  const selectedImages = document.querySelectorAll(`.${currentZone}`);
  selectedImages.forEach((img, index) => {
    img.classList.toggle('active', index === currentIndex);
  });
}

function showAllImages() {
  allImagesContainer.innerHTML = '';

  const allImages = document.querySelectorAll(`.${currentZone}`);

  if (allImages.length > 0) {
    allImages.forEach((img) => {
      const clonedImg = img.cloneNode();
      allImagesContainer.appendChild(clonedImg);
    });
  }

  imageContainer.style.display = 'none';
  allImagesContainer.style.display = 'flex';
}

function showSingleImage() {
  const selectedImages = document.querySelectorAll(`.${currentZone}`);
  selectedImages.forEach((img, index) => {
    img.classList.toggle('active', index === currentIndex);
  });

  imageContainer.style.display = 'flex';
  allImagesContainer.style.display = 'none';
}

function toggleViewButton() {
  if (isViewingAll) {
    viewAllBtn.textContent = 'ดูทั้งหมด';
    showSingleImage();
  } else {
    viewAllBtn.textContent = 'ดูรูปเดียว';
    showAllImages();
  }
  isViewingAll = !isViewingAll;
}

dropdown.addEventListener('change', (e) => {
  currentZone = e.target.value;
  currentIndex = 0;
  updateImages();
  if (isViewingAll) {
    toggleViewButton();
  }
});

prevBtn.addEventListener('click', () => {
  const images = document.querySelectorAll(`.${currentZone}`);
  currentIndex = (currentIndex - 1 + images.length) % images.length;
  updateImages();
});

nextBtn.addEventListener('click', () => {
  const images = document.querySelectorAll(`.${currentZone}`);
  currentIndex = (currentIndex + 1) % images.length;
  updateImages();
});

viewAllBtn.addEventListener('click', () => {
  toggleViewButton();
});

updateImages();