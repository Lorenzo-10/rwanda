// Navbar scroll effect
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 10) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Intersection Observer for scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('section-visible');
        }
    });
}, observerOptions);

document.querySelectorAll('.full-width-section').forEach(section => {
    observer.observe(section);
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

// Parallax effect for hero image
window.addEventListener('scroll', function() {
    const hero = document.querySelector('.hero');
    if (!hero) return;
    
    const scrollPosition = window.scrollY;
    const heroHeight = hero.offsetHeight;
    
    if (scrollPosition < heroHeight) {
        const parallaxValue = scrollPosition * 0.5;
        hero.style.backgroundPositionY = parallaxValue + 'px';
    }
});

// Image lazy loading
const lazyLoadImages = document.querySelectorAll('img[data-src]');
const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src;
            img.onload = () => {
                img.removeAttribute('data-src');
                img.classList.add('loaded');
            };
            observer.unobserve(img);
        }
    });
});

lazyLoadImages.forEach(img => imageObserver.observe(img));

// Form submission
const contactForm = document.querySelector('.contact-form form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Form submission logic would go here
        alert('Thank you for your message! We will get back to you soon.');
        this.reset();
    });
}

// Interactive Map Functionality
document.querySelectorAll('.province').forEach(province => {
    province.addEventListener('click', function() {
        // Remove active class from all provinces
        document.querySelectorAll('.province').forEach(p => p.classList.remove('active'));
        
        // Add active class to clicked province
        this.classList.add('active');
        
        // Get region data
        const region = this.dataset.region;
        const regionData = getRegionData(region);
        
        // Update info panel
        document.querySelector('.region-name').textContent = regionData.name;
        document.querySelector('.region-description').textContent = regionData.description;
        
        // Update highlights
        const highlightsContainer = document.querySelector('.region-highlights');
        highlightsContainer.innerHTML = regionData.highlights.map(h => `
            <div class="highlight-item">
                <h4>${h.title}</h4>
                <p>${h.content}</p>
            </div>
        `).join('');
    });
});

function getRegionData(region) {
    // This would typically come from an API or database
    const regions = {
        kigali: {
            name: "Kigali City",
            description: "The vibrant capital and economic hub of Rwanda, known for its cleanliness, safety, and growing tech scene.",
            highlights: [
                { title: "Kigali Genocide Memorial", content: "A powerful tribute to the victims of the 1994 genocide." },
                { title: "Kimironko Market", content: "The largest market in Kigali offering everything from fresh produce to traditional crafts." }
            ]
        },
        // Add other regions...
    };
    return regions[region] || {
        name: "Select a Region",
        description: "Click on any province to learn about its culture and attractions",
        highlights: []
    };
}
// Timeline Functionality
const timelineItems = document.querySelectorAll('.timeline-item');
const yearDisplay = document.getElementById('currentYear');
const prevBtn = document.querySelector('.timeline-prev');
const nextBtn = document.querySelector('.timeline-next');
let currentIndex = 0;

function updateTimeline() {
    timelineItems.forEach((item, index) => {
        if (index === currentIndex) {
            item.classList.add('active');
            yearDisplay.textContent = item.dataset.year;
        } else {
            item.classList.remove('active');
        }
        
        // Position items vertically based on index
        const position = (index / (timelineItems.length - 1)) * 100;
        item.style.top = `${position}%`;
    });
}

prevBtn.addEventListener('click', () => {
    currentIndex = Math.max(0, currentIndex - 1);
    updateTimeline();
});

nextBtn.addEventListener('click', () => {
    currentIndex = Math.min(timelineItems.length - 1, currentIndex + 1);
    updateTimeline();
});

// Initialize
updateTimeline();

// Lightbox Functionality
const galleryItems = document.querySelectorAll('.gallery-item');
const lightbox = document.querySelector('.gallery-lightbox');
const lightboxImage = document.querySelector('.lightbox-image');
const lightboxCaption = document.querySelector('.lightbox-caption');
const closeBtn = document.querySelector('.lightbox-close');
const prevBtn = document.querySelector('.lightbox-prev');
const nextBtn = document.querySelector('.lightbox-next');
let currentImageIndex = 0;

galleryItems.forEach((item, index) => {
    item.addEventListener('click', () => {
        currentImageIndex = index;
        openLightbox();
    });
});

function openLightbox() {
    const imgSrc = galleryItems[currentImageIndex].querySelector('img').src;
    const caption = galleryItems[currentImageIndex].querySelector('img').alt;
    
    lightboxImage.src = imgSrc;
    lightboxCaption.textContent = caption;
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeLightbox() {
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
}

function navigate(direction) {
    currentImageIndex += direction;
    
    if (currentImageIndex >= galleryItems.length) {
        currentImageIndex = 0;
    } else if (currentImageIndex < 0) {
        currentImageIndex = galleryItems.length - 1;
    }
    
    openLightbox();
}

closeBtn.addEventListener('click', closeLightbox);
prevBtn.addEventListener('click', () => navigate(-1));
nextBtn.addEventListener('click', () => navigate(1));

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('active')) return;
    
    if (e.key === 'Escape') {
        closeLightbox();
    } else if (e.key === 'ArrowLeft') {
        navigate(-1);
    } else if (e.key === 'ArrowRight') {
        navigate(1);
    }
});