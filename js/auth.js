document.addEventListener('DOMContentLoaded', function () {
    // DOM Elements
    const loginTab = document.getElementById('loginTab');
    const signupTab = document.getElementById('signupTab');
    const loginForm = document.getElementById('loginForm');
    const signupForm = document.getElementById('signupForm');
    const tabIndicator = document.querySelector('.tab-indicator');
    const switchToLogin = document.querySelector('.switch-to-login');
    const forgotPasswordLink = document.querySelector('.forgot-password');
    const forgotPasswordModal = document.getElementById('forgotPasswordModal');
    const closeModalBtn = document.querySelector('.close-modal');
    const togglePasswordIcons = document.querySelectorAll('.toggle-password');
    const signupPassword = document.getElementById('signupPassword');
    const strengthBars = document.querySelectorAll('.strength-bar');
    const strengthText = document.querySelector('.strength-text');
    const healthTipCards = document.querySelectorAll('.tip-card');
    const sliderDots = document.querySelectorAll('.slider-dot');
    const modalOverlay = document.querySelector('.modal-overlay');
    const forgotPasswordForm = document.getElementById('forgotPasswordForm');
   
    let currentTipIndex = 0;
    let tipInterval;

    // --- Tab Switching ---
    if (signupTab && loginTab && loginForm && signupForm && tabIndicator) {
        signupTab.addEventListener('click', () => switchToTab('signup'));
        loginTab.addEventListener('click', () => switchToTab('login'));
    }

    if (switchToLogin) {
        switchToLogin.addEventListener('click', function (e) {
            e.preventDefault();
            switchToTab('login');
        });
    }

    function switchToTab(tab) {
        if (tab === 'signup') {
            loginTab?.classList.remove('active');
            signupTab?.classList.add('active');
            loginForm?.classList.remove('active');
            signupForm?.classList.add('active');
            tabIndicator.style.transform = 'translateX(100%)';
        } else {
            signupTab?.classList.remove('active');
            loginTab?.classList.add('active');
            signupForm?.classList.remove('active');
            loginForm?.classList.add('active');
            tabIndicator.style.transform = 'translateX(0)';
        }
    }

    // --- Toggle Password Visibility ---
    togglePasswordIcons.forEach(icon => {
        icon.addEventListener('click', function () {
            const targetId = this.getAttribute('data-target');
            const passwordInput = document.getElementById(targetId);
            if (passwordInput) {
                const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
                passwordInput.setAttribute('type', type);
                this.classList.toggle('fa-eye-slash');
            }
        });
    });

    // --- Password Strength Checker ---
    if (signupPassword) {
        signupPassword.addEventListener('input', function () {
            const password = this.value;
            let strength = 0;
            if (password.length >= 8) strength += 1;
            if (/\d/.test(password)) strength += 1;
            if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) strength += 1;
            updatePasswordStrength(strength);
        });
    }

    function updatePasswordStrength(strength) {
        strengthBars.forEach((bar, index) => {
            bar.style.backgroundColor = index < strength ? getStrengthColor(strength) : '#e2e8f0';
        });
        strengthText.textContent = getStrengthText(strength);
        strengthText.style.color = getStrengthColor(strength);
    }

    function getStrengthColor(strength) {
        return ['#e2e8f0', '#e53e3e', '#dd6b20', '#38a169'][strength] || '#e2e8f0';
    }

    function getStrengthText(strength) {
        return ['Password strength', 'Weak password', 'Medium strength', 'Strong password'][strength] || '';
    }

    // --- Forgot Password Modal ---
    if (forgotPasswordLink && forgotPasswordModal && closeModalBtn && modalOverlay) {
        forgotPasswordLink.addEventListener('click', e => {
            e.preventDefault();
            forgotPasswordModal.style.display = 'block';
            document.body.style.overflow = 'hidden';
        });

        closeModalBtn.addEventListener('click', closeModal);
        modalOverlay.addEventListener('click', closeModal);
    }

    function closeModal() {
        forgotPasswordModal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }

    // --- Health Tips Slider ---
    function initSlider() {
        if (healthTipCards.length === 0 || sliderDots.length === 0) return;

        showTip(currentTipIndex);
        sliderDots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                currentTipIndex = index;
                showTip(currentTipIndex);
                resetSliderInterval();
            });
        });

        tipInterval = setInterval(nextTip, 5000);
    }

    function showTip(index) {
        healthTipCards.forEach(card => card.classList.remove('active'));
        sliderDots.forEach(dot => dot.classList.remove('active'));
        healthTipCards[index]?.classList.add('active');
        sliderDots[index]?.classList.add('active');
    }

    function nextTip() {
        currentTipIndex = (currentTipIndex + 1) % healthTipCards.length;
        showTip(currentTipIndex);
    }

    function resetSliderInterval() {
        clearInterval(tipInterval);
        tipInterval = setInterval(nextTip, 5000);
    }

    initSlider();

    // --- Login Form Submit ---
    if (loginForm) {
        loginForm.addEventListener('submit', async function (e) {
            e.preventDefault();
            const email = document.getElementById('loginEmail').value;
            const password = document.getElementById('loginPassword').value;
            const rememberMe = document.getElementById('rememberMe').checked;
            await authenticateUser(email, password, rememberMe);
        });
    }

    // --- Signup Form Submit ---
    if (signupForm) {
        signupForm.addEventListener('submit', async function (e) {
            e.preventDefault();
            const name = document.getElementById('signupName').value;
            const email = document.getElementById('signupEmail').value;
            const password = document.getElementById('signupPassword').value;
            const confirmPassword = document.getElementById('signupConfirm').value;
    const acceptTerms = document.getElementById('acceptTerms').checked;
const healthUpdates = document.getElementById('healthUpdates').checked;
            if (password !== confirmPassword) return showAlert('Passwords do not match', 'error');
            if (!acceptTerms) return showAlert('You must accept the terms and conditions', 'error');

            await registerUser(name, email, password, healthUpdates);
        });
    }

    // --- Forgot Password Submit ---
    if (forgotPasswordForm) {
        forgotPasswordForm.addEventListener('submit', async function (e) {
            e.preventDefault();
            const email = document.getElementById('forgotEmail').value;
            await resetPassword(email);
        });
    }

    // --- Backend Simulation Functions ---
   async function authenticateUser(email, password, rememberMe) {
    const loginBtn = loginForm.querySelector('.btn-primary');
    const originalText = loginBtn.innerHTML;
    try {
        loginBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Authenticating...';
        loginBtn.disabled = true;

        // const res = await fetch('http://localhost:8000/api/auth/login', 
        const res = await fetch('https://health-care-main.onrender.com/api/auth/login', 
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        });

        const data = await res.json();

        if (!res.ok) throw new Error(data.message || 'Login failed');

        showAlert('Login successful! Redirecting...', 'success');
        setTimeout(() => {
  window.location.href = 'well.html'; // ✅ redirect after 1.5s
}, 1500);

        // Store token or proceed to dashboard
        // localStorage.setItem('token', data.token);
        // window.location.href = '/dashboard.html';

    } catch (err) {
        showAlert(err.message, 'error');
    } finally {
        loginBtn.innerHTML = originalText;
        loginBtn.disabled = false;
    }
}


async function registerUser(name, email, password, healthUpdates) {
    const signupBtn = signupForm.querySelector('.btn-primary');
    const originalText = signupBtn.innerHTML;
    try {
        signupBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Creating account...';
        signupBtn.disabled = true;

        const res = await fetch('https://health-care-main.onrender.com/api/auth/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name, email, password, healthUpdates })
        });

        const data = await res.json();

        if (!res.ok) throw new Error(data.message || 'Registration failed');

        showAlert('Account created successfully!', 'success');
        switchToTab('login');
        signupForm.reset();
        updatePasswordStrength(0);

    } catch (err) {
        showAlert(err.message, 'error');
    } finally {
        signupBtn.innerHTML = originalText;
        signupBtn.disabled = false;
    }
}

async function resetPassword(email) {
    const resetBtn = forgotPasswordForm.querySelector('.btn-primary');
    const originalText = resetBtn.innerHTML;
    try {
        resetBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        resetBtn.disabled = true;

        const res = await fetch('http://localhost:8000/api/auth/forgot-password', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email })
        });

        const data = await res.json();

        if (!res.ok) throw new Error(data.message || 'Reset failed');

        showAlert(data.message || 'Password reset link sent!', 'success');
        closeModal();
        forgotPasswordForm.reset();

    } catch (err) {
        showAlert(err.message, 'error');
    } finally {
        resetBtn.innerHTML = originalText;
        resetBtn.disabled = false;
    }
}

    // --- Alert UI ---
    function showAlert(message, type) {
        document.querySelector('.alert')?.remove();

        const alert = document.createElement('div');
        alert.className = `alert alert-${type}`;
        alert.innerHTML = `
            <div class="alert-icon"><i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'}"></i></div>
            <div class="alert-message">${message}</div>
            <button class="alert-close"><i class="fas fa-times"></i></button>
        `;

        Object.assign(alert.style, {
            position: 'fixed', top: '20px', right: '20px',
            padding: '16px 20px', borderRadius: '10px', color: 'white',
            fontWeight: '500', zIndex: '1000', display: 'flex',
            alignItems: 'center', gap: '12px', maxWidth: '400px',
            width: 'calc(100% - 40px)', boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
            backgroundColor: type === 'success' ? '#38a169' : '#e53e3e',
            animation: 'slideIn 0.3s ease-out'
        });

        document.body.appendChild(alert);
        alert.querySelector('.alert-close').addEventListener('click', () => alert.remove());
        setTimeout(() => alert.remove(), 5000);
    }

    // Inject alert animation keyframes
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from { transform: translateX(100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
    `;
    document.head.appendChild(style);

    // --- Floating Label Support ---
    document.querySelectorAll('.floating-form input').forEach(input => {
        input.addEventListener('focus', () => input.nextElementSibling?.classList.add('active'));
        input.addEventListener('blur', () => {
            if (!input.value) input.nextElementSibling?.classList.remove('active');
        });
        if (input.value) input.nextElementSibling?.classList.add('active');
    });
});
// Google Login Button
  document.getElementById("google-login-btn").addEventListener("click", () => {
    // Redirect to Google login (backend route)
    window.location.href = "https://health-care-main.onrender.com/auth/google";
  });
// LinkedIn Login Button
document.getElementById("linkedin-login-btn").addEventListener("click", () => {
  window.location.href = "https://health-care-main.onrender.com/auth/linkedin";
});



//CheckBox
const signupForm = document.getElementById('signupForm');

if (signupForm) {
    signupForm.addEventListener('submit', async function (e) {
        e.preventDefault();

        const name = document.getElementById('signupName').value;
        const email = document.getElementById('signupEmail').value;
        const password = document.getElementById('signupPassword').value;
        const confirmPassword = document.getElementById('signupConfirm').value;
        const acceptTerms = document.getElementById('acceptTerms').checked;
        const healthUpdates = document.getElementById('healthUpdates').checked;

        if (password !== confirmPassword) {
            alert('Passwords do not match');
            return;
        }

        if (!acceptTerms) {
            alert('You must accept the terms and conditions');
            return;
        }

        // Call backend signup API
        await registerUser(name, email, password, healthUpdates);
    });
}

async function registerUser(name, email, password, healthUpdates) {
    try {
        const response = await fetch('https://health-care-main.onrender.com/api/auth/signup', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, email, password, healthUpdates })
        });

        const data = await response.json();

        if (response.ok) {
            alert("Signup successful!");
            window.location.href = '/login.html';
        } else {
            alert(data.msg || "Signup failed");
        }
    } catch (error) {
        console.error(error);
        alert("Something went wrong");
    }
}




