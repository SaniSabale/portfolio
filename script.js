// DOM Elements
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-link');
const contactBtn = document.getElementById('contactBtn');
const learnMoreBtns = document.querySelectorAll('.learn-more-btn');
const navbar = document.querySelector('.navbar');
const themeToggle = document.getElementById('themeToggle');
const themeIcon = document.getElementById('themeIcon');

// Dark Mode Toggle
function initDarkMode() {
    // Check for saved theme preference or default to light mode
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
        enableDarkMode();
    }
}

function enableDarkMode() {
    document.body.classList.add('dark-mode');
    themeIcon.classList.remove('fa-moon');
    themeIcon.classList.add('fa-sun');
    localStorage.setItem('theme', 'dark');
}

function disableDarkMode() {
    document.body.classList.remove('dark-mode');
    themeIcon.classList.remove('fa-sun');
    themeIcon.classList.add('fa-moon');
    localStorage.setItem('theme', 'light');
}

// Theme toggle button click handler
themeToggle.addEventListener('click', () => {
    if (document.body.classList.contains('dark-mode')) {
        disableDarkMode();
    } else {
        enableDarkMode();
    }
    
    // Add a little animation effect
    themeToggle.style.transform = 'rotate(360deg) scale(1.2)';
    setTimeout(() => {
        themeToggle.style.transform = '';
    }, 500);
});

// Initialize dark mode on page load
initDarkMode();

// Mobile Menu Toggle
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a nav link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Smooth scroll with active link highlighting
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            const offsetTop = targetSection.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Navbar scroll effect
window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    // Update active navigation link based on scroll position
    updateActiveNavLink();
});

// Update active navigation link
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const scrollY = window.pageYOffset;

    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');
        
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}

// Contact button click - scroll to contact section
contactBtn.addEventListener('click', () => {
    const contactSection = document.getElementById('contact');
    const offsetTop = contactSection.offsetTop - 80;
    
    window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
    });
});

// Learn More button functionality for projects
learnMoreBtns.forEach((btn, index) => {
    btn.addEventListener('click', () => {
        const projectCard = btn.closest('.project-card');
        const projectTitle = projectCard.querySelector('h3').textContent;
        
        // Create modal overlay
        const modal = document.createElement('div');
        modal.className = 'modal-overlay';
        modal.innerHTML = `
            <div class="modal-content">
                <button class="modal-close">&times;</button>
                <h2>${projectTitle}</h2>
                <div class="modal-body">
                    ${getProjectDetails(index)}
                </div>
                <div class="modal-footer">
                    <button class="btn btn-primary close-modal-btn">Close</button>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
        document.body.style.overflow = 'hidden';
        
        // Animate modal in
        setTimeout(() => {
            modal.classList.add('active');
        }, 10);
        
        // Close modal functionality
        const closeModal = () => {
            modal.classList.remove('active');
            setTimeout(() => {
                document.body.removeChild(modal);
                document.body.style.overflow = 'auto';
            }, 300);
        };
        
        modal.querySelector('.modal-close').addEventListener('click', closeModal);
        modal.querySelector('.close-modal-btn').addEventListener('click', closeModal);
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeModal();
            }
        });
    });
});

// Get detailed project information
function getProjectDetails(index) {
    const projects = [
        {
            title: 'AI Mentor & Teaching Assistant Chatbots',
            details: `
                <p><strong>Overview:</strong> Developed a comprehensive AI-powered mentorship system using RAG-based Large Language Models (LLMs) that revolutionized how students and teachers interact with educational content.</p>
                
                <p><strong>Key Features:</strong></p>
                <ul>
                    <li>30+ specialized chatbots tailored for different subjects and learning contexts</li>
                    <li>RAG (Retrieval-Augmented Generation) architecture for accurate, context-aware responses</li>
                    <li>Real-time mentorship and guidance for students</li>
                    <li>Teaching assistance tools for educators</li>
                    <li>Scalable infrastructure serving 1M+ users</li>
                </ul>
                
                <p><strong>Impact:</strong></p>
                <ul>
                    <li>40% increase in student and teacher engagement</li>
                    <li>Created scalable mentorship model for millions of users</li>
                    <li>Reduced teacher workload while improving learning outcomes</li>
                    <li>Enabled personalized learning at scale</li>
                </ul>
                
                <p><strong>Technologies:</strong> RAG, LLMs (GPT models), NLP, Vector Databases, API Integration, Cloud Infrastructure</p>
                
                <p><strong>Role:</strong> Led end-to-end product development from ideation to launch, managed cross-functional team, defined AI strategy, and owned product roadmap.</p>
            `
        },
        {
            title: 'AI-Powered Evaluation & Feedback System',
            details: `
                <p><strong>Overview:</strong> Built an intelligent evaluation system that automatically assesses student submissions and generates personalized, actionable feedback using advanced AI/ML techniques.</p>
                
                <p><strong>Key Features:</strong></p>
                <ul>
                    <li>Automated submission evaluation using NLP and ML models</li>
                    <li>Instant, personalized feedback generation</li>
                    <li>Multi-criteria assessment (content quality, creativity, structure)</li>
                    <li>Actionable improvement suggestions</li>
                    <li>Integration with existing learning management systems</li>
                </ul>
                
                <p><strong>Impact:</strong></p>
                <ul>
                    <li>Significantly improved quality of student work</li>
                    <li>Instant feedback reduced iteration time from days to minutes</li>
                    <li>Freed up educators to focus on high-value interactions</li>
                    <li>Scaled personalized feedback to thousands of students</li>
                </ul>
                
                <p><strong>Technologies:</strong> NLP, Machine Learning, Prompt Engineering, LLMs, API Design, Cloud Computing</p>
                
                <p><strong>Role:</strong> Owned product vision and roadmap, collaborated with ML engineers and educators to build evaluation criteria, managed deployment and scaling.</p>
            `
        },
        {
            title: 'Microfinance Digital Platform',
            details: `
                <p><strong>Overview:</strong> Designed and launched a comprehensive digital platform for Shramik Bharti's Microfinance initiative, transforming operations for 50,000+ Self-Help Group (SHG) members from manual to digital processes.</p>
                
                <p><strong>Key Features:</strong></p>
                <ul>
                    <li>End-to-end digitization of microfinance operations</li>
                    <li>Member management system for 50,000+ SHG members</li>
                    <li>Financial tracking and reporting tools</li>
                    <li>Mobile-first design for accessibility in rural areas</li>
                    <li>Comprehensive training and onboarding system</li>
                </ul>
                
                <p><strong>Impact:</strong></p>
                <ul>
                    <li>Successfully digitized operations for 50,000+ members</li>
                    <li>Trained and onboarded 200+ staff members</li>
                    <li>Institutionalized digital practices across the organization</li>
                    <li>Improved operational efficiency and transparency</li>
                    <li>Enhanced financial inclusion for underserved communities</li>
                </ul>
                
                <p><strong>Technologies:</strong> Product Design, UX/UI, Database Management, Training Systems, Change Management</p>
                
                <p><strong>Role:</strong> Product Manager - Owned the entire software development lifecycle from requirements gathering to deployment, conducted user research with SHG members, designed training programs, and ensured successful platform adoption.</p>
            `
        }
    ];
    
    return projects[index].details;
}

// Scroll reveal animation
function revealOnScroll() {
    const reveals = document.querySelectorAll('.reveal');
    
    reveals.forEach(element => {
        const windowHeight = window.innerHeight;
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < windowHeight - elementVisible) {
            element.classList.add('active');
        }
    });
}

// Add reveal class to elements
window.addEventListener('DOMContentLoaded', () => {
    const elementsToReveal = document.querySelectorAll(
        '.skill-category, .timeline-item, .project-card, .award-card-new, .cert-card'
    );
    
    elementsToReveal.forEach(element => {
        element.classList.add('reveal');
    });
    
    revealOnScroll();
});

window.addEventListener('scroll', revealOnScroll);

// Typing effect for hero subtitle
function typeWriter(element, text, speed = 50) {
    let i = 0;
    element.textContent = '';
    
    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Initialize typing effect on page load
window.addEventListener('load', () => {
    const subtitle = document.querySelector('.hero-subtitle');
    const originalText = subtitle.textContent;
    typeWriter(subtitle, originalText, 50);
});

// Add smooth hover effects to buttons
document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-2px)';
    });
    
    button.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
    });
});

// Easter egg: Console message
console.log('%cWelcome to Sani Sabale\'s Portfolio!', 'font-size: 20px; font-weight: bold; color: #2563eb;');
console.log('%cBuilt with HTML, CSS, and JavaScript', 'font-size: 14px; color: #6b7280;');
console.log('%cInterested in connecting? Reach out at sani.sabale1@gmail.com', 'font-size: 14px; color: #10b981;');

// Parallax effect removed - keeping image fixed in place

// Add keyboard navigation
document.addEventListener('keydown', (e) => {
    // Press 'Escape' to close any open modals
    if (e.key === 'Escape') {
        const modal = document.querySelector('.modal-overlay.active');
        if (modal) {
            modal.querySelector('.modal-close').click();
        }
    }
});

// Add custom cursor effect on project cards
const projectCards = document.querySelectorAll('.project-card');
projectCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        card.style.setProperty('--mouse-x', `${x}px`);
        card.style.setProperty('--mouse-y', `${y}px`);
    });
});

// Analytics helper (can be extended with real analytics)
function trackEvent(category, action, label) {
    console.log(`Event tracked: ${category} - ${action} - ${label}`);
    // Add your analytics code here (Google Analytics, Mixpanel, etc.)
}

// Track button clicks
document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('click', () => {
        trackEvent('Button', 'Click', btn.textContent);
    });
});

// Add CSS for modal
const modalStyles = document.createElement('style');
modalStyles.textContent = `
    .modal-overlay {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.8);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10000;
        opacity: 0;
        transition: opacity 0.3s ease;
        padding: 20px;
    }
    
    .modal-overlay.active {
        opacity: 1;
    }
    
    .modal-content {
        background: white;
        border-radius: 16px;
        max-width: 800px;
        width: 100%;
        max-height: 90vh;
        overflow-y: auto;
        padding: 3rem;
        position: relative;
        transform: translateY(50px);
        transition: transform 0.3s ease;
    }
    
    .modal-overlay.active .modal-content {
        transform: translateY(0);
    }
    
    .modal-close {
        position: absolute;
        top: 1.5rem;
        right: 1.5rem;
        background: none;
        border: none;
        font-size: 2rem;
        cursor: pointer;
        color: #6b7280;
        transition: color 0.3s ease;
        width: 40px;
        height: 40px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 8px;
    }
    
    .modal-close:hover {
        color: #2563eb;
        background: #f3f4f6;
    }
    
    .modal-content h2 {
        color: #1f2937;
        margin-bottom: 1.5rem;
        padding-right: 40px;
    }
    
    .modal-body {
        color: #6b7280;
        line-height: 1.8;
    }
    
    .modal-body p {
        margin-bottom: 1rem;
    }
    
    .modal-body ul {
        margin: 1rem 0 1rem 1.5rem;
    }
    
    .modal-body li {
        margin-bottom: 0.5rem;
    }
    
    .modal-body strong {
        color: #1f2937;
    }
    
    .modal-footer {
        margin-top: 2rem;
        display: flex;
        justify-content: flex-end;
    }
    
    @media (max-width: 768px) {
        .modal-content {
            padding: 2rem 1.5rem;
        }
    }
`;
document.head.appendChild(modalStyles);

