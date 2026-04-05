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
    const savedTheme = localStorage.getItem('theme');
    
    if (savedTheme === 'light') {
        disableDarkMode();
    } else {
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
            title: 'AI Mentor & Teaching Assistants with Automated Submission Evaluation & Feedback',
            details: `
                <p><strong>Overview:</strong> Developed a comprehensive AI-powered mentorship platform combining 30+ RAG-based LLM chatbots with an intelligent evaluation system. This integrated solution revolutionizes student and teacher engagement while providing instant, actionable feedback at scale.</p>
                
                <p><strong>Key Features:</strong></p>
                <ul>
                    <li>30+ specialized AI mentor chatbots tailored for different subjects and learning contexts</li>
                    <li>RAG (Retrieval-Augmented Generation) architecture for accurate, context-aware responses</li>
                    <li>Automated submission evaluation using NLP and ML models</li>
                    <li>Instant, personalized feedback generation for student work</li>
                    <li>Real-time mentorship and guidance for students</li>
                    <li>Teaching assistance tools for educators</li>
                    <li>Scalable infrastructure serving 1M+ users</li>
                </ul>
                
                <p><strong>Impact:</strong></p>
                <ul>
                    <li>40% increase in student and teacher engagement</li>
                    <li>1M+ users reached with scalable mentorship model</li>
                    <li>Instant feedback reduced iteration time from days to minutes</li>
                    <li>Significantly improved quality of student work</li>
                    <li>Reduced teacher workload while improving learning outcomes</li>
                    <li>Enabled personalized learning and feedback at scale</li>
                </ul>
                
                <p><strong>Technologies:</strong> RAG, LLMs (GPT models), NLP, Prompt Engineering, Vector Databases, Machine Learning, API Integration, Cloud Infrastructure</p>
                
                <p><strong>Recognition (2026):</strong></p>
                <ul>
                    <li><strong>Casebook author:</strong> Authored a case study on Udhyam Saathi for the Government of India&rsquo;s <em>Real-World Impact of AI in Education</em> casebook, launched at the <strong>India AI Impact Summit</strong> in New Delhi&mdash;<strong>36 AI solutions</strong> selected from <strong>270+ global applications</strong>.</li>
                    <li><strong>Summit showcase:</strong> Presented the product at the Summit&rsquo;s <strong>South-South</strong> programme to policymakers, researchers, and global development partners (<a href="https://udhyam.org/2026/02/26/udhyam-at-the-india-ai-impact-summit-2026/" target="_blank" rel="noopener noreferrer">summit recap</a>).</li>
                </ul>
                <p class="modal-resource-links"><a href="https://d19ob9sqegt2wc.cloudfront.net/stage/uploads/India_AI_Impact_Summit2026_Compendium_Real_World_Impactof_Ai_In_Education_Updated_compressed_5d742de5a3.pdf" target="_blank" rel="noopener noreferrer"><strong>Official casebook (PDF)</strong></a> &middot; <a href="https://udhyam.org/2026/02/26/udhyam-at-the-india-ai-impact-summit-2026/" target="_blank" rel="noopener noreferrer"><strong>Udhyam: India AI Impact Summit 2026</strong></a></p>
                <div class="modal-recognition-gallery" aria-label="India AI Impact Summit and casebook photos">
                    <figure class="modal-recognition-figure">
                        <img src="summit-presentation.png" alt="Presenting Udhyam Saathi at India AI Impact Summit 2026" loading="lazy" width="640" height="360">
                        <figcaption>Presenting at India AI Impact Summit</figcaption>
                    </figure>
                    <figure class="modal-recognition-figure">
                        <img src="summit-booth.png" alt="Udhyam Saathi booth at India AI Impact Summit South-South event" loading="lazy" width="640" height="360">
                        <figcaption>South-South showcase booth</figcaption>
                    </figure>
                </div>
                
                <p><strong>Role:</strong> Led end-to-end product development from ideation to launch, managed cross-functional team, defined AI strategy, collaborated with ML engineers to build evaluation criteria, and owned product roadmap.</p>
            `
        },
        {
            title: 'DentoTrust Bot',
            details: `
                <p><strong>Overview:</strong> An AI intelligence platform built for dentists to speed up diagnostic workflows and standardize case documentation. Think of it as a smart assistant that sits in your pocket, organizing patient symptoms, suggesting relevant clinical questions, and analyzing X-rays to draft provisional case summaries.</p>
                
                <p><strong>Key Features:</strong></p>
                <ul>
                    <li>Smart conversational assistant for clinical workflows</li>
                    <li>Organizes patient symptoms and suggests relevant clinical questions</li>
                    <li>X-ray analysis and image processing capabilities</li>
                    <li>Automatic draft of provisional case summaries for review</li>
                    <li>Voice-to-text documentation (turn voice notes into structured case sheets)</li>
                    <li>Evidence-based differential diagnosis suggestions</li>
                    <li>Zero-friction setup with no complex configuration required</li>
                </ul>
                
                <p><strong>Performance & Impact:</strong></p>
                <ul>
                    <li>Ultra-fast response time: 433ms (faster than standard AI tools like ChatGPT)</li>
                    <li>Instant documentation: Turn voice notes into structured case sheets</li>
                    <li>Decision support: Get evidence-based differential suggestions instantly</li>
                    <li>Enables dentists to focus more on patients and less on typing notes</li>
                    <li>Standardizes case documentation across practices</li>
                    <li>Speeds up diagnostic workflow for solo dentists</li>
                </ul>
                
                <p><strong>Technologies:</strong> AI/ML, Computer Vision, NLP, Voice Processing, Image Analysis, Healthcare AI, Real-time Processing</p>
                
                <p><strong>Goal:</strong> Focus more on the patient, less on typing notes. Built for clinical speed and efficiency.</p>
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

// Scroll reveal animation with stagger support
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
            revealObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });

window.addEventListener('DOMContentLoaded', () => {
    const groupSelectors = [
        { parent: '.skills-grid', child: '.skill-category' },
        { parent: '.projects-grid', child: '.project-card' },
        { parent: '.awards-grid-new', child: '.award-card-new' },
        { parent: '.certifications-grid', child: '.cert-card' },
    ];

    groupSelectors.forEach(({ parent, child }) => {
        document.querySelectorAll(parent).forEach(container => {
            const children = container.querySelectorAll(child);
            children.forEach((el, i) => {
                el.classList.add('reveal');
                el.setAttribute('data-delay', String(Math.min(i, 4)));
                revealObserver.observe(el);
            });
        });
    });

    document.querySelectorAll('.timeline-item').forEach((el, i) => {
        el.classList.add('reveal');
        el.setAttribute('data-delay', String(Math.min(i, 4)));
        revealObserver.observe(el);
    });
});

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
        background: rgba(0, 0, 0, 0.6);
        backdrop-filter: blur(8px);
        -webkit-backdrop-filter: blur(8px);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10000;
        opacity: 0;
        transition: opacity 0.35s cubic-bezier(0.4, 0, 0.2, 1);
        padding: 20px;
    }
    
    .modal-overlay.active {
        opacity: 1;
    }
    
    .modal-content {
        background: white;
        border-radius: 24px;
        max-width: 800px;
        width: 100%;
        max-height: 90vh;
        overflow-y: auto;
        padding: 2.5rem;
        position: relative;
        transform: translateY(30px) scale(0.97);
        transition: transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
        box-shadow: 0 32px 80px rgba(0, 0, 0, 0.15);
        border: 1px solid rgba(0, 0, 0, 0.06);
    }
    
    .modal-overlay.active .modal-content {
        transform: translateY(0) scale(1);
    }
    
    .modal-close {
        position: absolute;
        top: 1.25rem;
        right: 1.25rem;
        background: none;
        border: none;
        font-size: 1.75rem;
        cursor: pointer;
        color: #94a3b8;
        transition: all 0.25s ease;
        width: 40px;
        height: 40px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 12px;
    }
    
    .modal-close:hover {
        color: #1a1a2e;
        background: #f1f5f9;
    }
    
    .modal-content h2 {
        color: #1a1a2e;
        margin-bottom: 1.5rem;
        padding-right: 40px;
        font-weight: 700;
        letter-spacing: -0.02em;
    }
    
    .modal-body {
        color: #64748b;
        line-height: 1.8;
        font-size: 0.95rem;
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
        color: #1a1a2e;
    }
    
    .modal-footer {
        margin-top: 2rem;
        display: flex;
        justify-content: flex-end;
    }
    
    @media (max-width: 768px) {
        .modal-content {
            padding: 2rem 1.5rem;
            border-radius: 20px;
        }
    }
`;
document.head.appendChild(modalStyles);

