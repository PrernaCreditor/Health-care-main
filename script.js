// Preloader
        const preloader = document.getElementById('preloader');
        const progressBar = document.getElementById('progressBar');
        
        // Simulate loading progress
        let progress = 0;
        const interval = setInterval(() => {
            progress += 1;
            progressBar.style.width = `${progress}%`;
            
            if (progress >= 100) {
                clearInterval(interval);
                setTimeout(() => {
                    preloader.classList.add('fade-out');
                    setTimeout(() => {
                        preloader.style.display = 'none';
                    }, 800);
                }, 500);
            }
        }, 30);
        
        // Stats Counter Animation
        const clientsCount = document.getElementById('clientsCount');
        const programsCount = document.getElementById('programsCount');
        const expertsCount = document.getElementById('expertsCount');
        const successRate = document.getElementById('successRate');
        
        const animateCounters = () => {
            if (isElementInViewport(clientsCount)) {
                animateCounter(clientsCount, 0, 5000, 1500);
                animateCounter(programsCount, 0, 12, 1500);
                animateCounter(expertsCount, 0, 35, 1500);
                animateCounter(successRate, 0, 98, 1500);
                window.removeEventListener('scroll', animateCounters);
            }
        };
        
        window.addEventListener('scroll', animateCounters);
        
        function animateCounter(element, start, end, duration) {
            let startTimestamp = null;
            const step = (timestamp) => {
                if (!startTimestamp) startTimestamp = timestamp;
                const progress = Math.min((timestamp - startTimestamp) / duration, 1);
                const value = Math.floor(progress * (end - start) + start);
                element.textContent = value === end ? `${value}+` : value;
                if (progress < 1) {
                    window.requestAnimationFrame(step);
                }
            };
            window.requestAnimationFrame(step);
        }
        
        function isElementInViewport(el) {
            const rect = el.getBoundingClientRect();
            return (
                rect.top >= 0 &&
                rect.left >= 0 &&
                rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
                rect.right <= (window.innerWidth || document.documentElement.clientWidth)
            );
        }
        
        // Mobile Menu Toggle
        const mobileMenuBtn = document.getElementById('mobileMenuBtn');
        const navLinks = document.getElementById('navLinks');
        
        mobileMenuBtn.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            mobileMenuBtn.innerHTML = navLinks.classList.contains('active') ? 
                '<i class="fas fa-times"></i>' : '<i class="fas fa-bars"></i>';
        });
        
        // Close mobile menu when clicking on a link
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
            });
        });
        
        // Header scroll effect
        const header = document.getElementById('header');
        window.addEventListener('scroll', () => {
            if (window.scrollY > 100) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
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
        
        // Back to Top Button
        const backToTopBtn = document.getElementById('backToTop');
        
        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 300) {
                backToTopBtn.classList.add('active');
            } else {
                backToTopBtn.classList.remove('active');
            }
        });
        
        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
        
        // Video Modal
        const videoThumbnail = document.getElementById('videoThumbnail');
        const videoModal = document.getElementById('videoModal');
        const videoFrame = document.getElementById('videoFrame');
        const closeVideo = document.getElementById('closeVideo');
        
        videoThumbnail.addEventListener('click', () => {
            videoFrame.src = 'https://www.youtube.com/embed/9No-FiEInLA?autoplay=1';
            videoModal.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
        
        closeVideo.addEventListener('click', () => {
            videoModal.classList.remove('active');
            videoFrame.src = '';
            document.body.style.overflow = 'auto';
        });
        
        // Close modal when clicking outside
        videoModal.addEventListener('click', (e) => {
            if (e.target === videoModal) {
                videoModal.classList.remove('active');
                videoFrame.src = '';
                document.body.style.overflow = 'auto';
            }
        });
        
        // Program Tabs
        const tabBtns = document.querySelectorAll('.tab-btn');
        const tabContents = document.querySelectorAll('.tab-content');
        
        tabBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const tabId = btn.getAttribute('data-tab');
                
                // Update active tab button
                tabBtns.forEach(btn => btn.classList.remove('active'));
                btn.classList.add('active');
                
                // Show corresponding tab content
                tabContents.forEach(content => {
                    content.classList.remove('active');
                    if (content.id === tabId) {
                        content.classList.add('active');
                    }
                });
            });
        });
        
        // Testimonials Slider
        const track = document.querySelector('.testimonials-track');
        const slides = document.querySelectorAll('.testimonial-slide');
        const dots = document.querySelectorAll('.slider-dot');
        let currentSlide = 0;
        const slideWidth = slides[0].getBoundingClientRect().width;
        
        // Set initial position
        track.style.transform = `translateX(-${currentSlide * slideWidth}px)`;
        
        // Update slider position
        const updateSlider = () => {
            track.style.transform = `translateX(-${currentSlide * slideWidth}px)`;
            
            // Update active dot
            dots.forEach(dot => dot.classList.remove('active'));
            dots[currentSlide].classList.add('active');
        };
        
        // Dot navigation
        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                currentSlide = index;
                updateSlider();
            });
        });
        
        // Auto slide
        setInterval(() => {
            currentSlide = (currentSlide + 1) % slides.length;
            updateSlider();
        }, 5000);
        
        // FAQ Accordion
        const faqQuestions = document.querySelectorAll('.faq-question');
        
        faqQuestions.forEach(question => {
            question.addEventListener('click', () => {
                const item = question.parentElement;
                item.classList.toggle('active');
                
                // Close other items
                faqQuestions.forEach(q => {
                    if (q !== question) {
                        q.parentElement.classList.remove('active');
                    }
                });
            });
        });
        
        // Form Submission
        const contactForm = document.getElementById('contactForm');
    const newsletterForm = document.getElementById('newsletterForm');
    const successModal = document.getElementById('successModal');
    const closeModal = document.getElementById('closeModal');

    // Contact form submission with backend integration
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const name = document.getElementById("contactName").value.trim();
        const email = document.getElementById("contactEmail").value.trim();
        const phone = document.getElementById("contactPhone").value.trim();
        const program = document.getElementById("contactProgram").value;
        const message = document.getElementById("contactMessage").value.trim();

        if (!name || !email || !message) {
            alert("❌ Name, Email, and Message are required.");
            return;
        }

        const data = { name, email, phone, program, message };
        console.log("📤 Sending:", data);

        try {
            const res = await fetch("http://localhost:8000/api/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data)
            });

            const result = await res.json();

            if (res.ok) {
                console.log("✅ Submitted:", result);
                successModal.classList.add('active');
                document.body.style.overflow = 'hidden';
                contactForm.reset();
            } else {
                alert("❌ Error: " + (result.message || "Server error"));
            }
        } catch (error) {
            console.error("❌ Submit error:", error);
            alert("❌ Failed to send message. Try again later.");
        }
    });

    // Newsletter form (optional)
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', (e) => {
            e.preventDefault();
            successModal.classList.add('active');
            document.body.style.overflow = 'hidden';
            newsletterForm.reset();
        });
    }

    // Modal close logic
    closeModal.addEventListener('click', () => {
        successModal.classList.remove('active');
        document.body.style.overflow = 'auto';
    });

    window.addEventListener('click', (e) => {
        if (e.target === successModal) {
            successModal.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    });
    
        
        // Close modal when clicking outside
        window.addEventListener('click', (e) => {
            if (e.target === successModal) {
                successModal.classList.remove('active');
                document.body.style.overflow = 'auto';
            }
        });
        
        // Animation on scroll
        const animateElements = () => {
            const elements = document.querySelectorAll('.animate');
            
            elements.forEach(element => {
                const elementPosition = element.getBoundingClientRect().top;
                const screenPosition = window.innerHeight / 1.3;
                
                if (elementPosition < screenPosition) {
                    element.style.opacity = '1';
                    element.style.transform = 'translateY(0)';
                }
            });
        };
        
        // Run once on page load
        animateElements();
        
        // Run on scroll
        window.addEventListener('scroll', animateElements);

        //chatbot functionality

        document.addEventListener('DOMContentLoaded', function() {
    const chatbotContainer = document.getElementById('chatbot-container');
    const chatbotToggle = document.getElementById('chatbot-toggle');
    const chatbotClose = document.getElementById('chatbot-close');
    const chatbotInput = document.getElementById('chatbot-input');
    const chatbotSend = document.getElementById('chatbot-send');
    const chatbotMessages = document.getElementById('chatbot-messages');
    
    let isChatbotOpen = false;
    
    // Toggle chatbot visibility
    chatbotToggle.addEventListener('click', function() {
      isChatbotOpen = !isChatbotOpen;
      if (isChatbotOpen) {
        chatbotContainer.classList.remove('chatbot-hidden');
        chatbotInput.focus();
      } else {
        chatbotContainer.classList.add('chatbot-hidden');
      }
    });
    
    // Close chatbot
    chatbotClose.addEventListener('click', function() {
      isChatbotOpen = false;
      chatbotContainer.classList.add('chatbot-hidden');
    });
    
    // Send message on button click
    chatbotSend.addEventListener('click', sendMessage);
    
    // Send message on Enter key
    chatbotInput.addEventListener('keypress', function(e) {
      if (e.key === 'Enter') {
        sendMessage();
      }
    });
    
    function sendMessage() {
      const message = chatbotInput.value.trim();
      if (message === '') return;
      
      // Add user message to chat
      addMessage(message, 'user');
      chatbotInput.value = '';
      
      // Show typing indicator
      showTypingIndicator();
      
      // Simulate bot response after a short delay
      setTimeout(() => {
        removeTypingIndicator();
        const botResponse = getBotResponse(message);
        addMessage(botResponse, 'bot');
      }, 1000 + Math.random() * 2000);
    }
    
    function addMessage(text, sender) {
      const messageElement = document.createElement('div');
      messageElement.classList.add('chatbot-message', sender + '-message');
      messageElement.textContent = text;
      chatbotMessages.appendChild(messageElement);
      chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
    }
    
    function showTypingIndicator() {
      const typingElement = document.createElement('div');
      typingElement.classList.add('typing-indicator');
      typingElement.id = 'typing-indicator';
      typingElement.innerHTML = '<span></span><span></span><span></span>';
      chatbotMessages.appendChild(typingElement);
      chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
    }
    
    function removeTypingIndicator() {
      const typingElement = document.getElementById('typing-indicator');
      if (typingElement) {
        typingElement.remove();
      }
    }
    
    // Simple response logic - you can replace this with actual API calls to an AI service
    function getBotResponse(userMessage) {
      const lowerMessage = userMessage.toLowerCase();
      
      // Product-related questions
      if (lowerMessage.includes('product') || lowerMessage.includes('supplement')) {
        return "VitaPure+ offers premium, all-natural supplements. Our products are carefully formulated with organic ingredients to support your health and wellness goals.";
      }
      if (lowerMessage.includes('vitamin') || lowerMessage.includes('mineral')) {
        return "We have a range of vitamins and minerals including Vitamin D3, Magnesium Complex, and our bestselling Multivitamin Blend. Each is designed for optimal absorption.";
      }
      
      // Shipping/ordering questions
      if (lowerMessage.includes('ship') || lowerMessage.includes('deliver')) {
        return "We offer free shipping on orders over $50. Most orders ship within 1-2 business days and delivery typically takes 3-5 business days in the US.";
      }
      if (lowerMessage.includes('order') || lowerMessage.includes('purchase')) {
        return "You can order directly from our website. Just select your products, proceed to checkout, and choose your payment method. We accept all major credit cards and PayPal.";
      }
      
      // Health questions
      if (lowerMessage.includes('benefit') || lowerMessage.includes('help')) {
        return "Our supplements support various aspects of health including immunity, energy, digestion, and overall wellness. For specific recommendations, please consult with your healthcare provider.";
      }
      
      // General questions
      if (lowerMessage.includes('hello') || lowerMessage.includes('hi') || lowerMessage.includes('hey')) {
        return "Hello! I'm the VitaPure+ assistant. How can I help you today?";
      }
      if (lowerMessage.includes('thank')) {
        return "You're welcome! Is there anything else I can help you with?";
      }
      
      // Default response
      const defaultResponses = [
        "I'm not sure I understand. Could you rephrase that?",
        "I'm here to help with questions about VitaPure+ products and services.",
        "For more detailed assistance, you might want to contact our customer service team.",
        "That's an interesting question! Let me check our resources... I recommend visiting our FAQ page for more information."
      ];
      return defaultResponses[Math.floor(Math.random() * defaultResponses.length)];
    }
    
    // Add welcome message when first opened
    chatbotToggle.addEventListener('click', function firstOpen() {
      if (!isChatbotOpen) return;
      addMessage("Welcome to VitaPure+! I'm your wellness assistant. How can I help you today?", 'bot');
      chatbotToggle.removeEventListener('click', firstOpen);
    }, { once: true });
  });

