// Mobile Menu Toggle
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const mobileMenu = document.getElementById('mobile-menu');
const mobileMenuCloseBtn = document.getElementById('mobile-menu-close-btn');
const navLinks = document.querySelectorAll('.nav-link');

// Function to open mobile menu
function openMobileMenu() {
    mobileMenu.classList.remove('hidden');
    mobileMenuBtn.querySelector('i').classList.remove('fa-bars');
    mobileMenuBtn.querySelector('i').classList.add('fa-times');
}

// Function to close mobile menu
function closeMobileMenu() {
    mobileMenu.classList.add('hidden');
    mobileMenuBtn.querySelector('i').classList.remove('fa-times');
    mobileMenuBtn.querySelector('i').classList.add('fa-bars');
}

// Toggle mobile menu on button click
mobileMenuBtn.addEventListener('click', () => {
    if (mobileMenu.classList.contains('hidden')) {
        openMobileMenu();
    } else {
        closeMobileMenu();
    }
});

// Close mobile menu when close button is clicked
mobileMenuCloseBtn.addEventListener('click', closeMobileMenu);

// Close mobile menu when clicking outside (optional, depending on desired behavior with overlay)
// document.addEventListener('click', (e) => {
//     if (!mobileMenu.contains(e.target) && !mobileMenuBtn.contains(e.target) && !mobileMenu.classList.contains('hidden')) {
//         closeMobileMenu();
//     }
// });

// Smooth scrolling for navigation links
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        // Close mobile menu
        closeMobileMenu();

        // Calculate offset for fixed header
        const headerOffset = 80; // Adjust this value based on your fixed header height
        const elementPosition = targetSection.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        // Smooth scroll to section
        window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
        });
    });
});

// Update active link on scroll
const sections = document.querySelectorAll('section[id]');

function updateActiveLink() {
    const scrollY = window.pageYOffset;
    const headerOffset = 80; // Adjust this value based on your fixed header height

    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - headerOffset;
        const sectionId = section.getAttribute('id');
        
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            document.querySelector(`.nav-link[href="#${sectionId}"]`)?.classList.add('text-accent');
        } else {
            document.querySelector(`.nav-link[href="#${sectionId}"]`)?.classList.remove('text-accent');
        }
    });
}

window.addEventListener('scroll', updateActiveLink);
window.addEventListener('load', updateActiveLink);

// Form submission handling
const contactForm = document.getElementById('contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const formData = new FormData(this);
        const data = Object.fromEntries(formData);
        console.log('Form submitted:', data);
        
        // Show success message
        const successMessage = document.createElement('div');
        successMessage.className = 'fixed bottom-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg transform transition-all duration-300 translate-y-0 opacity-100';
        successMessage.textContent = 'Message sent successfully!';
        document.body.appendChild(successMessage);
        
        // Remove success message after 3 seconds
        setTimeout(() => {
            successMessage.style.transform = 'translateY(100%)';
            successMessage.style.opacity = '0';
            setTimeout(() => successMessage.remove(), 300);
        }, 3000);
        
        // Reset form
        this.reset();
    });
}

// Intersection Observer for scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all sections
document.querySelectorAll('section').forEach(section => {
    observer.observe(section);
});

// Observe project cards
document.querySelectorAll('.project-card').forEach(card => {
    observer.observe(card);
});

// Add hover effect to project cards
document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-10px)';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0)';
    });
});

// Add typing effect to the hero section
const heroTitle = document.querySelector('.hero h1');
if (heroTitle) {
    const text = heroTitle.textContent;
    heroTitle.textContent = '';
    let i = 0;
    
    function typeWriter() {
        if (i < text.length) {
            heroTitle.textContent += text.charAt(i);
            i++;
            setTimeout(typeWriter, 100);
        }
    }
    
    // Start typing effect when the page loads
    window.addEventListener('load', typeWriter);
} 