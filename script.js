
document.addEventListener('DOMContentLoaded', () => {

    const header = document.getElementById('header');
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY;

        if (scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }

        sections.forEach(current => {
            const sectionHeight = current.offsetHeight;
            const sectionTop = current.offsetTop - 120;
            const sectionId = current.getAttribute('id');

            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    });

    const mobileNavToggle = document.getElementById('mobileNavToggle');
    const navMenu = document.getElementById('navMenu');

    if (mobileNavToggle && navMenu) {
        mobileNavToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            const icon = mobileNavToggle.querySelector('i');
            if (navMenu.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-xmark');
            } else {
                icon.classList.remove('fa-xmark');
                icon.classList.add('fa-bars');
            }
        });

        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                const icon = mobileNavToggle.querySelector('i');
                if (icon) {
                    icon.classList.remove('fa-xmark');
                    icon.classList.add('fa-bars');
                }
            });
        });
    }

    const counterNums = document.querySelectorAll('.counter-num');
    let hasAnimated = false;

    function animateCounters() {
        counterNums.forEach(counter => {
            const target = +counter.getAttribute('data-target');
            const duration = 1800;
            const step = target / (duration / 16);

            let current = 0;
            const updateCount = () => {
                current += step;
                if (current < target) {
                    counter.innerText = Math.ceil(current);
                    requestAnimationFrame(updateCount);
                } else {
                    counter.innerText = target;
                }
            };
            updateCount();
        });
    }

    const heroStatsBanner = document.querySelector('.hero-stats-banner-bottom') || document.querySelector('.hero-stats-row');
    if (heroStatsBanner) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !hasAnimated) {
                    animateCounters();
                    hasAnimated = true;
                }
            });
        }, { threshold: 0.3 });
        observer.observe(heroStatsBanner);
    }

    const monthlySpendInput = document.getElementById('monthlySpend');
    const spendVal = document.getElementById('spendVal');
    const estRevenue = document.getElementById('estRevenue');

    if (monthlySpendInput && spendVal && estRevenue) {
        monthlySpendInput.addEventListener('input', (e) => {
            const val = parseInt(e.target.value);
            spendVal.innerText = `₹${val.toLocaleString('en-IN')}`;
            const calculatedRev = val * 4.5;
            estRevenue.innerText = `₹${calculatedRev.toLocaleString('en-IN')}`;
        });
    }

    const tabBtns = document.querySelectorAll('.tab-btn');
    const portfolioCards = document.querySelectorAll('.portfolio-card');

    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            tabBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filter = btn.getAttribute('data-filter');

            portfolioCards.forEach(card => {
                const category = card.getAttribute('data-category');
                if (filter === 'all' || filter === category) {
                    card.classList.remove('hide');
                } else {
                    card.classList.add('hide');
                }
            });
        });
    });

    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        if (question) {
            question.addEventListener('click', () => {
                const isActive = item.classList.contains('active');
                faqItems.forEach(i => i.classList.remove('active'));
                if (!isActive) {
                    item.classList.add('active');
                }
            });
        }
    });

    const contactForm = document.getElementById('contactForm');
    const formStatus = document.getElementById('formStatus');

    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            let isValid = true;

            const name = document.getElementById('name');
            if (!name || !name.value.trim()) {
                if (name) name.parentElement.classList.add('error');
                isValid = false;
            } else {
                name.parentElement.classList.remove('error');
            }

            const email = document.getElementById('email');
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!email || !emailRegex.test(email.value.trim())) {
                if (email) email.parentElement.classList.add('error');
                isValid = false;
            } else {
                email.parentElement.classList.remove('error');
            }

            const phone = document.getElementById('phone');
            if (!phone || !phone.value.trim()) {
                if (phone) phone.parentElement.classList.add('error');
                isValid = false;
            } else {
                phone.parentElement.classList.remove('error');
            }

            const service = document.getElementById('service');
            if (!service || !service.value) {
                if (service) service.parentElement.classList.add('error');
                isValid = false;
            } else {
                service.parentElement.classList.remove('error');
            }

            const budget = document.getElementById('budget');
            const message = document.getElementById('message');
            if (!message || !message.value.trim()) {
                if (message) message.parentElement.classList.add('error');
                isValid = false;
            } else {
                message.parentElement.classList.remove('error');
            }

            if (isValid) {
                const submitBtn = document.getElementById('submitBtn');
                submitBtn.innerHTML = `<span>Sending...</span> <i class="fas fa-spinner fa-spin"></i>`;
                submitBtn.disabled = true;

                const nameVal = name.value.trim();
                const emailVal = email.value.trim();
                const phoneVal = phone ? phone.value.trim() : '';
                const serviceVal = service.value;
                const budgetVal = budget ? budget.value : 'N/A';
                const messageVal = message.value.trim();

                const targetNumber = '918949616673';
                const waText = `*New Enquiry - Shivora Digital Agency* 🔥\n\n` +
                    `👤 *Name:* ${nameVal}\n` +
                    `📧 *Email:* ${emailVal}\n` +
                    `📞 *Phone:* ${phoneVal}\n` +
                    `🛠️ *Service:* ${serviceVal}\n` +
                    `💰 *Budget:* ${budgetVal}\n` +
                    `📝 *Message:* ${messageVal}`;

                const waUrl = `https://wa.me/${targetNumber}?text=${encodeURIComponent(waText)}`;

                try {
                    const formData = new FormData();
                    formData.append('Name', nameVal);
                    formData.append('Email', emailVal);
                    formData.append('Phone Number', phoneVal);
                    formData.append('Service Needed', serviceVal);
                    formData.append('Monthly Budget', budgetVal);
                    formData.append('Message', messageVal);
                    formData.append('_subject', `New Website Enquiry from ${nameVal}`);
                    formData.append('_template', 'table');

                    await fetch('https://formsubmit.co/ajax/shivoradigitalagency@gmail.com', {
                        method: 'POST',
                        body: formData
                    });
                } catch (err) {
                    console.log('Email dispatch attempted:', err);
                }

                window.open(waUrl, '_blank');

                formStatus.className = 'form-status success';
                formStatus.innerHTML = `<i class="fas fa-check-circle"></i> Thank you! Message sent to Gmail & WhatsApp (+91 89496 16673). We'll respond shortly.`;
                contactForm.reset();
                submitBtn.innerHTML = `<span>Send Message</span> <i class="fas fa-paper-plane"></i>`;
                submitBtn.disabled = false;

                setTimeout(() => {
                    formStatus.innerHTML = '';
                }, 6000);
            } else {
                formStatus.className = 'form-status error';
                formStatus.innerHTML = `Please fill out all required fields correctly.`;
            }
        });
    }

    const newsletterForm = document.getElementById('newsletterForm');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const input = newsletterForm.querySelector('input');
            if (input && input.value.trim()) {
                alert('Thank you for subscribing to Shivora Digital Agency updates!');
                input.value = '';
            }
        });
    }
});


