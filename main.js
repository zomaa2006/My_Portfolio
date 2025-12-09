// Force refresh and clear cache functionality
const refreshButton = document.getElementById('refreshButton');

if (refreshButton) {
  refreshButton.addEventListener('click', () => {
    // Add spinning animation
    refreshButton.classList.add('spinning');
    
    // Clear all caches and reload
    setTimeout(() => {
      // Clear localStorage
      localStorage.clear();
      
      // Clear sessionStorage
      sessionStorage.clear();
      
      // Hard refresh with cache bust
      location.reload(true);
    }, 300);
  });
}

const navLinks = document.querySelectorAll('.ul-list li a');
const sections = document.querySelectorAll('section');

function removeActive() {
  navLinks.forEach(link => link.parentElement.classList.remove('active'));
}

navLinks.forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    const targetId = link.getAttribute('href').substring(1);
    const targetSection = document.getElementById(targetId);

    window.scrollTo({
      top: targetSection.offsetTop - 80, 
      behavior: 'smooth'
    });

    removeActive();
    link.parentElement.classList.add('active');
  });
});

window.addEventListener('scroll', () => {
  let scrollPos = window.scrollY + 100;

  sections.forEach(section => {
    if (scrollPos >= section.offsetTop && scrollPos < section.offsetTop + section.offsetHeight) {
      removeActive();
      const activeLink = document.querySelector(`.ul-list li a[href="#${section.id}"]`);
      if (activeLink) activeLink.parentElement.classList.add('active');
    }
  });

  if(window.scrollY > 500){
    backToTop.style.display = "flex";
  } else {
    backToTop.style.display = "none";
  }

  revealElements.forEach(el => {
    const windowHeight = window.innerHeight;
    const elementTop = el.getBoundingClientRect().top;
    const revealPoint = 150;

    if(elementTop < windowHeight - revealPoint){
      el.classList.add('active-reveal');
    }
  });
});

const revealElements = document.querySelectorAll('.home-container, .about-container, .projects-container, .services-container, .contact-content');
revealElements.forEach(el => el.classList.add('reveal'));

const backToTop = document.createElement('div');
backToTop.innerHTML = '<i class="fa-solid fa-chevron-up"></i>';
backToTop.id = "back-to-top";
document.body.appendChild(backToTop);

backToTop.style.cssText = `
  position: fixed;
  bottom: 40px;
  right: 40px;
  background: #474af0;
  color: white;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  display: none;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 1000;
  transition: transform 0.3s ease;
`;

backToTop.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

backToTop.addEventListener('mouseover', () => backToTop.style.transform = 'scale(1.2)');
backToTop.addEventListener('mouseout', () => backToTop.style.transform = 'scale(1)');

const cards = document.querySelectorAll('.project-card, .c1, .service-card');
cards.forEach(card => {
  card.addEventListener('mouseenter', () => card.style.transform = 'translateY(-8px) scale(1.05)');
  card.addEventListener('mouseleave', () => card.style.transform = 'translateY(0) scale(1)');
});

const typingElement = document.querySelector('.info-home h3'); 
let words = [];
let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typingSpeed = 100;

function type() {
    const currentWord = words[wordIndex];
    let displayedText = currentWord.substring(0, charIndex);
    
    typingElement.innerHTML = displayedText + '<span class="cursor">|</span>';

    if (!isDeleting && charIndex < currentWord.length) {
        charIndex++;
        setTimeout(type, typingSpeed);
    } else if (isDeleting && charIndex > 0) {
        charIndex--;
        setTimeout(type, typingSpeed / 2);
    } else {
        isDeleting = !isDeleting;
        if (!isDeleting) {
            wordIndex = (wordIndex + 1) % words.length;
        }
        setTimeout(type, 1000);
    }
}

// start typing after data is loaded

document.addEventListener("DOMContentLoaded", () => {
  const loadingText = document.getElementById("loading-text");
  const mainIcon = document.querySelector(".main-icon");
  const subIcons = document.querySelectorAll(".sub-icons i");
  const designerText = document.getElementById("designer-text");
  const mainPage = document.getElementById("main-page");
  const loadingScreen = document.getElementById("loading-screen");

  function showElement(element, delay=0){
    setTimeout(() => {
      element.classList.remove("hidden");
      element.classList.add("fall");
    }, delay);
  }

  showElement(loadingText, 0);          
  showElement(mainIcon, 800);         
  subIcons.forEach((icon, idx) => {
    showElement(icon, 1600 + idx*400);  
  });
  showElement(designerText, 2800);    

  setTimeout(() => {
    loadingScreen.style.opacity = '0';
    setTimeout(() => {
      loadingScreen.style.display='none';
      if (mainPage) mainPage.classList.add("visible");
      // Initialize projects after page is visible
      initializeProjects();
    }, 500);
  }, 4000);
});

// Project Management Functions
function getStoredProjects() {
  const stored = localStorage.getItem('portfolioProjects');
  return stored ? JSON.parse(stored) : [];
}

function saveProjects(projects) {
  localStorage.setItem('portfolioProjects', JSON.stringify(projects));
}

function renderProjects(projects, isAdmin = false) {
  const projectsContainer = document.querySelector('.projects-container');
  if (!projectsContainer) return;

  projectsContainer.innerHTML = projects.map((pr, index) => `
    <div class="project-card" data-index="${index}">
      ${isAdmin ? `
        <div class="project-admin-btns">
          <button class="edit-project-btn" data-index="${index}" title="Edit Project">
            <i class="fa-solid fa-edit"></i>
          </button>
          <button class="delete-project-btn" data-index="${index}" title="Delete Project">
            <i class="fa-solid fa-trash"></i>
          </button>
        </div>
      ` : ''}
      <img src="${pr.image}" alt="${pr.title}" onerror="this.src='images/img.jpg'">
      <h3>${pr.title}</h3>
      <p>${pr.description || ''}</p>
      <div class="skills">
        ${(pr.skills || []).map(s => `<a href="#">${s.trim()}</a>`).join('')}
      </div>
      <div class="btns">
        <a href="${pr.github || '#'}" class="btn" target="_blank"><i class="fab fa-github"></i> GitHub</a>
        <a href="${pr.demo || '#'}" class="btn" target="_blank"><i class="fas fa-external-link-alt"></i> Live Demo</a>
      </div>
    </div>
  `).join('');

  // Re-attach hover effects to new cards
  const cards = document.querySelectorAll('.project-card');
  cards.forEach(card => {
    card.addEventListener('mouseenter', () => card.style.transform = 'translateY(-8px) scale(1.05)');
    card.addEventListener('mouseleave', () => card.style.transform = 'translateY(0) scale(1)');
  });

  // Attach edit and delete handlers if admin
  if (isAdmin) {
    document.querySelectorAll('.edit-project-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const index = parseInt(e.target.closest('.edit-project-btn').dataset.index);
        editProject(index);
      });
    });

    document.querySelectorAll('.delete-project-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const index = parseInt(e.target.closest('.delete-project-btn').dataset.index);
        deleteProject(index);
      });
    });
  }
}

// Initialize projects from localStorage or default projects
function initializeProjects() {
  let projects = getStoredProjects();
  
  // If no stored projects, use default projects from HTML
  if (projects.length === 0) {
    projects = [
      {
        title: "E-Commerce Website",
        description: "Modern online store with product filtering, cart, and payment system.",
        image: "images/Cleveroad.jpg",
        github: "#",
        demo: "#",
        skills: ["HTML", "CSS", "JavaScript"]
      },
      {
        title: "Portfolio Website",
        description: "Personal portfolio to showcase my design and coding projects.",
        image: "images/Capture d'écran 2025-10-22 182207.png",
        github: "#",
        demo: "#",
        skills: ["HTML", "CSS", "Bootstrap"]
      },
      {
        title: "Weather App",
        description: "Responsive app showing real-time weather data using API integration.",
        image: "images/Weather Forecast Dashboard.jpg",
        github: "#",
        demo: "#",
        skills: ["HTML", "CSS", "API"]
      },
      {
        title: "Blog Website",
        description: "Clean and simple blogging platform with markdown support.",
        image: "images/WordPress dashboard design concept.jpg",
        github: "#",
        demo: "#",
        skills: ["HTML", "Tailwind", "JavaScript"]
      },
      {
        title: "Game Landing Page",
        description: "Landing page for a game with animations and parallax effects.",
        image: "images/Game Dashboard Design.jpg",
        github: "#",
        demo: "#",
        skills: ["HTML", "CSS", "GSAP"]
      },
      {
        title: "Task Manager",
        description: "Task tracking web app with CRUD features and clean UI.",
        image: "images/Task manager app.jpg",
        github: "#",
        demo: "#",
        skills: ["HTML", "CSS", "JS"]
      }
    ];
    saveProjects(projects);
  }
  
  renderProjects(projects);
}

// EmailJS Configuration
// ============================================
// CONFIGURE YOUR EMAILJS SETTINGS HERE:
// 1. Service ID: Found in EmailJS Dashboard > Email Services (e.g., "service_xxxxx")
// 2. Template ID: Found in EmailJS Dashboard > Email Templates (e.g., "template_xxxxx")
// 3. Public Key: Found in EmailJS Dashboard > Account > API Keys
// ============================================
const EMAILJS_CONFIG = {
  SERVICE_ID: 'service_tmghbuc',        // Your Service ID
  TEMPLATE_ID: 'template_1kx3ao1',      // Your Template ID (for password reset)
  CONTACT_TEMPLATE_ID: 'template_idkuzxu', // Contact form template (same as password reset for now - create separate one later)
  PUBLIC_KEY: 'gc57f1JVi2IwpjKLX'       // Your Public Key (also updated in index.html)
};

// Password Management
const DEFAULT_PASSWORD = 'zoma12345';
function getStoredPassword() {
  return localStorage.getItem('adminPassword') || DEFAULT_PASSWORD;
}
function savePassword(password) {
  localStorage.setItem('adminPassword', password);
}
let isAdminMode = false;
let editingProjectIndex = null;

// Ensure projects initialize even if loading screen doesn't run
setTimeout(() => {
  if (document.querySelector('.projects-container') && !document.querySelector('.projects-container').innerHTML.trim()) {
    initializeProjects();
  }
}, 5000);

// Password Modal
const passwordModal = document.getElementById('passwordModal');
const manageProjectsBtn = document.getElementById('manageProjectsBtn');
const passwordForm = document.getElementById('passwordForm');
const forgotPasswordLink = document.getElementById('forgotPasswordLink');
const forgotPasswordModal = document.getElementById('forgotPasswordModal');

if (manageProjectsBtn) {
  manageProjectsBtn.addEventListener('click', () => {
    passwordModal.style.display = 'block';
  });
}

if (passwordForm) {
  passwordForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const enteredPassword = document.getElementById('adminPassword').value;
    if (enteredPassword === getStoredPassword()) {
      isAdminMode = true;
      passwordModal.style.display = 'none';
      const projects = getStoredProjects();
      renderProjects(projects, true);
      document.getElementById('adminPassword').value = '';
      // Show add project button
      const addNewProjectBtn = document.getElementById('addNewProjectBtn');
      if (addNewProjectBtn) addNewProjectBtn.style.display = 'inline-block';
    } else {
      alert('Incorrect password!');
    }
  });
}

// Close password modal
document.getElementById('closePasswordModal')?.addEventListener('click', () => {
  passwordModal.style.display = 'none';
  document.getElementById('adminPassword').value = '';
});
document.getElementById('cancelPasswordBtn')?.addEventListener('click', () => {
  passwordModal.style.display = 'none';
  document.getElementById('adminPassword').value = '';
});

// Forgot Password
if (forgotPasswordLink) {
  forgotPasswordLink.addEventListener('click', (e) => {
    e.preventDefault();
    passwordModal.style.display = 'none';
    forgotPasswordModal.style.display = 'block';
  });
}

let verificationCode = null;
document.getElementById('sendCodeBtn')?.addEventListener('click', async () => {
  // Generate 6-digit code
  verificationCode = Math.floor(100000 + Math.random() * 900000).toString();
  
  const sendCodeBtn = document.getElementById('sendCodeBtn');
  const originalText = sendCodeBtn.textContent;
  sendCodeBtn.disabled = true;
  sendCodeBtn.textContent = 'Sending...';
  
  try {
    // Check if EmailJS is configured
    const isConfigured = EMAILJS_CONFIG.SERVICE_ID !== 'YOUR_SERVICE_ID' && 
                        EMAILJS_CONFIG.TEMPLATE_ID !== 'YOUR_TEMPLATE_ID' &&
                        EMAILJS_CONFIG.PUBLIC_KEY !== 'YOUR_PUBLIC_KEY';
    
    if (isConfigured && typeof emailjs !== 'undefined') {
      // Send email using EmailJS
      // IMPORTANT: In your EmailJS template settings, set "To Email" field to: {{to_email}}
      try {
        await emailjs.send(
          EMAILJS_CONFIG.SERVICE_ID,
          EMAILJS_CONFIG.TEMPLATE_ID,
          {
            to_email: 'kliyg00000@gmail.com',
            user_email: 'kliyg00000@gmail.com',
            email: 'kliyg00000@gmail.com',  // Another alternative
            to: 'kliyg00000@gmail.com',     // Another alternative
            code: verificationCode,
            message: `Your verification code is: ${verificationCode}`,
            subject: 'Password Reset Verification Code'
          }
        );
        
        alert('Verification code sent successfully to kliyg00000@gmail.com\nPlease check your email.');
      } catch (emailError) {
        // If template configuration issue, show helpful error
        if (emailError.text && emailError.text.includes('recipients address is empty')) {
          alert('❌ Email Configuration Error!\n\nYour EmailJS template needs to be configured:\n\n📋 STEPS TO FIX:\n1. Go to: https://dashboard.emailjs.com/\n2. Click "Email Templates"\n3. Open template_1kx3ao1\n4. Find "To Email" field (at the top)\n5. Enter EXACTLY: {{to_email}}\n6. Click Save\n\n📄 See FIX_RECIPIENT_ERROR.md for detailed guide\n\nThen try again!');
          console.error('Template configuration issue. Set "To Email" field to {{to_email}} in EmailJS dashboard.');
          sendCodeBtn.disabled = false;
          sendCodeBtn.textContent = originalText;
          return; // Don't proceed if template is misconfigured
        } else if (emailError.text && emailError.text.includes('insufficient authentication scopes')) {
          alert('🔐 Gmail Permission Error!\n\nYour Gmail service needs to be reconnected:\n\n📋 STEPS TO FIX:\n1. Go to: https://dashboard.emailjs.com/\n2. Click "Email Services"\n3. Find your "Gmail" service\n4. Click "Disconnect" then "Connect" again\n5. Make sure to allow ALL permissions when prompted\n6. Grant "Send email on your behalf" permission\n\nThen try again!');
          console.error('Gmail service needs to be reconnected with proper permissions.');
          sendCodeBtn.disabled = false;
          sendCodeBtn.textContent = originalText;
          return;
        } else {
          throw emailError; // Re-throw other errors
        }
      }
      
      // Success - show code input
      document.getElementById('codeInputGroup').style.display = 'block';
      sendCodeBtn.style.display = 'none';
    } else {
      // Fallback if EmailJS is not configured or not loaded
      console.warn('EmailJS not configured. Using fallback method.');
      alert(`Verification code: ${verificationCode}\n\nNote: Configure EmailJS in main.js to send emails automatically.\n\nFor now, use this code: ${verificationCode}`);
      document.getElementById('codeInputGroup').style.display = 'block';
      sendCodeBtn.style.display = 'none';
    }
  } catch (error) {
    console.error('Error sending email:', error);
    const errorMsg = error.text || error.message || 'Unknown error';
    alert('Error sending verification code. Please try again.\n\nError: ' + errorMsg);
    sendCodeBtn.disabled = false;
    sendCodeBtn.textContent = originalText;
  }
});

// Verify code and show new password field
document.getElementById('verificationCode')?.addEventListener('input', (e) => {
  const enteredCode = e.target.value;
  if (enteredCode === verificationCode && verificationCode) {
    document.getElementById('newPasswordGroup').style.display = 'block';
    document.getElementById('resetPasswordBtn').style.display = 'block';
  }
});

document.getElementById('forgotPasswordForm')?.addEventListener('submit', (e) => {
  e.preventDefault();
  const enteredCode = document.getElementById('verificationCode').value;
  const newPassword = document.getElementById('newPassword').value;
  
  if (!verificationCode) {
    alert('Please request a verification code first!');
    return;
  }
  
  if (enteredCode !== verificationCode) {
    alert('Invalid verification code!');
    return;
  }
  
  if (!newPassword || newPassword.length < 6) {
    alert('Password must be at least 6 characters!');
    return;
  }
  
  savePassword(newPassword);
  alert('Password changed successfully!');
  forgotPasswordModal.style.display = 'none';
  document.getElementById('forgotPasswordForm').reset();
  document.getElementById('codeInputGroup').style.display = 'none';
  document.getElementById('newPasswordGroup').style.display = 'none';
  document.getElementById('resetPasswordBtn').style.display = 'none';
  document.getElementById('sendCodeBtn').style.display = 'block';
  verificationCode = null;
});

document.getElementById('closeForgotModal')?.addEventListener('click', () => {
  forgotPasswordModal.style.display = 'none';
  document.getElementById('forgotPasswordForm').reset();
  document.getElementById('codeInputGroup').style.display = 'none';
  document.getElementById('newPasswordGroup').style.display = 'none';
  document.getElementById('resetPasswordBtn').style.display = 'none';
  document.getElementById('sendCodeBtn').style.display = 'block';
});
document.getElementById('cancelForgotBtn')?.addEventListener('click', () => {
  forgotPasswordModal.style.display = 'none';
  document.getElementById('forgotPasswordForm').reset();
  document.getElementById('codeInputGroup').style.display = 'none';
  document.getElementById('newPasswordGroup').style.display = 'none';
  document.getElementById('resetPasswordBtn').style.display = 'none';
  document.getElementById('sendCodeBtn').style.display = 'block';
});

// Change Password Modal
const changePasswordModal = document.getElementById('changePasswordModal');
const changePasswordBtn = document.getElementById('changePasswordBtn');
const changePasswordForm = document.getElementById('changePasswordForm');

if (changePasswordBtn) {
  changePasswordBtn.addEventListener('click', () => {
    changePasswordModal.style.display = 'block';
  });
}

if (changePasswordForm) {
  changePasswordForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const currentPassword = document.getElementById('currentPassword').value;
    const newPassword = document.getElementById('newPasswordChange').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    
    if (currentPassword !== getStoredPassword()) {
      alert('Current password is incorrect!');
      return;
    }
    
    if (newPassword !== confirmPassword) {
      alert('New passwords do not match!');
      return;
    }
    
    savePassword(newPassword);
    alert('Password changed successfully!');
    changePasswordModal.style.display = 'none';
    changePasswordForm.reset();
  });
}

document.getElementById('closeChangePasswordModal')?.addEventListener('click', () => {
  changePasswordModal.style.display = 'none';
  changePasswordForm.reset();
});
document.getElementById('cancelChangePasswordBtn')?.addEventListener('click', () => {
  changePasswordModal.style.display = 'none';
  changePasswordForm.reset();
});

// Project Management Modal
const projectModal = document.getElementById('projectModal');
const projectForm = document.getElementById('projectForm');
const cancelBtn = document.getElementById('cancelBtn');
const dragDropZone = document.getElementById('dragDropZone');
const projectImageFile = document.getElementById('projectImageFile');
let uploadedImageData = null;

// Drag and Drop
if (dragDropZone) {
  dragDropZone.addEventListener('click', () => {
    projectImageFile.click();
  });
  
  dragDropZone.addEventListener('dragover', (e) => {
    e.preventDefault();
    dragDropZone.style.backgroundColor = '#e0e7ff';
  });
  
  dragDropZone.addEventListener('dragleave', () => {
    dragDropZone.style.backgroundColor = '#f9fafb';
  });
  
  dragDropZone.addEventListener('drop', (e) => {
    e.preventDefault();
    dragDropZone.style.backgroundColor = '#f9fafb';
    const files = e.dataTransfer.files;
    if (files.length > 0 && files[0].type.startsWith('image/')) {
      handleImageUpload(files[0]);
    }
  });
}

if (projectImageFile) {
  projectImageFile.addEventListener('change', (e) => {
    if (e.target.files.length > 0) {
      handleImageUpload(e.target.files[0]);
    }
  });
}

function handleImageUpload(file) {
  const reader = new FileReader();
  reader.onload = (e) => {
    uploadedImageData = e.target.result;
    document.getElementById('previewImg').src = uploadedImageData;
    document.getElementById('imagePreview').style.display = 'block';
    document.getElementById('projectImage').value = uploadedImageData;
  };
  reader.readAsDataURL(file);
}

document.getElementById('removePreview')?.addEventListener('click', () => {
  uploadedImageData = null;
  document.getElementById('imagePreview').style.display = 'none';
  document.getElementById('projectImage').value = '';
  projectImageFile.value = '';
});

// Edit Project
function editProject(index) {
  const projects = getStoredProjects();
  const project = projects[index];
  editingProjectIndex = index;
  
  document.getElementById('projectModalTitle').textContent = 'Edit Project';
  document.getElementById('submitProjectBtn').textContent = 'Update Project';
  document.getElementById('projectTitle').value = project.title;
  document.getElementById('projectDescription').value = project.description;
  document.getElementById('projectImage').value = project.image;
  document.getElementById('projectWebsite').value = project.demo || '';
  document.getElementById('projectGitHub').value = project.github || '';
  document.getElementById('projectSkills').value = (project.skills || []).join(', ');
  
  if (project.image) {
    document.getElementById('previewImg').src = project.image;
    document.getElementById('imagePreview').style.display = 'block';
  }
  
  projectModal.style.display = 'block';
}

// Delete Project
function deleteProject(index) {
  if (confirm('Are you sure you want to delete this project?')) {
    const projects = getStoredProjects();
    projects.splice(index, 1);
    saveProjects(projects);
    renderProjects(projects, true);
  }
}

// Close project modal
document.getElementById('closeProjectModal')?.addEventListener('click', () => {
  projectModal.style.display = 'none';
  projectForm.reset();
  editingProjectIndex = null;
  uploadedImageData = null;
  document.getElementById('imagePreview').style.display = 'none';
  document.getElementById('projectModalTitle').textContent = 'Add New Project';
  document.getElementById('submitProjectBtn').textContent = 'Add Project';
});

if (cancelBtn) {
  cancelBtn.addEventListener('click', () => {
    projectModal.style.display = 'none';
    projectForm.reset();
    editingProjectIndex = null;
    uploadedImageData = null;
    document.getElementById('imagePreview').style.display = 'none';
    document.getElementById('projectModalTitle').textContent = 'Add New Project';
    document.getElementById('submitProjectBtn').textContent = 'Add Project';
  });
}

window.addEventListener('click', (e) => {
  if (e.target === projectModal) {
    projectModal.style.display = 'none';
    projectForm.reset();
    editingProjectIndex = null;
    uploadedImageData = null;
    document.getElementById('imagePreview').style.display = 'none';
    document.getElementById('projectModalTitle').textContent = 'Add New Project';
    document.getElementById('submitProjectBtn').textContent = 'Add Project';
  }
  if (e.target === passwordModal) {
    passwordModal.style.display = 'none';
    document.getElementById('adminPassword').value = '';
  }
  if (e.target === forgotPasswordModal) {
    forgotPasswordModal.style.display = 'none';
  }
  if (e.target === changePasswordModal) {
    changePasswordModal.style.display = 'none';
    changePasswordForm.reset();
  }
});

// Add/Update Project Form
if (projectForm) {
  projectForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const title = document.getElementById('projectTitle').value;
    const description = document.getElementById('projectDescription').value;
    let image = document.getElementById('projectImage').value;
    const website = document.getElementById('projectWebsite').value;
    const github = document.getElementById('projectGitHub').value;
    const skillsText = document.getElementById('projectSkills').value;
    
    // Use uploaded image data if available
    if (uploadedImageData && !image.startsWith('http')) {
      image = uploadedImageData;
    }
    
    const skills = skillsText ? skillsText.split(',').map(s => s.trim()).filter(s => s) : [];
    
    const projectData = {
      title,
      description,
      image,
      demo: website,
      github,
      skills
    };
    
    const projects = getStoredProjects();
    
    if (editingProjectIndex !== null) {
      // Update existing project
      projects[editingProjectIndex] = projectData;
    } else {
      // Add new project
      projects.push(projectData);
    }
    
    saveProjects(projects);
    renderProjects(projects, true);
    
    projectModal.style.display = 'none';
    projectForm.reset();
    editingProjectIndex = null;
    uploadedImageData = null;
    document.getElementById('imagePreview').style.display = 'none';
    document.getElementById('projectModalTitle').textContent = 'Add New Project';
    document.getElementById('submitProjectBtn').textContent = 'Add Project';
  });
}

// Add button to open project modal when in admin mode
document.getElementById('addNewProjectBtn')?.addEventListener('click', () => {
  editingProjectIndex = null;
  document.getElementById('projectModalTitle').textContent = 'Add New Project';
  document.getElementById('submitProjectBtn').textContent = 'Add Project';
  projectForm.reset();
  uploadedImageData = null;
  document.getElementById('imagePreview').style.display = 'none';
  projectModal.style.display = 'block';
});

// Initialize projects on page load
document.addEventListener('DOMContentLoaded', () => {
  initializeProjects();
});

// Load personal data and populate DOM
fetch('data.json')
  .then(res => res.json())
  .then(data => {
    const p = data.profile || {};

    // Loading screen texts
    const loadingTextEl = document.getElementById('loading-text');
    const designerTextEl = document.getElementById('designer-text');
    if (loadingTextEl) loadingTextEl.textContent = 'MY PROFILE';
    if (designerTextEl && p.name) designerTextEl.textContent = `Designed by ${p.name}`;

    // Home
    const homeTagline = document.querySelector('.home-p');
    if (homeTagline && p.tagline) homeTagline.textContent = `. ${p.tagline}`;

    const homeName = document.querySelector('.info-home h1');
    if (homeName && p.name) homeName.textContent = `Hi, I'm ${p.name}`;

    const heroImg = document.querySelector('.home img');
    if (heroImg && p.heroImage) heroImg.src = p.heroImage;

    // Typing roles
    if (Array.isArray(p.roleTitles) && p.roleTitles.length > 0) {
      words = p.roleTitles;
      type();
    }

    // Bio paragraphs
    const infoP = document.querySelector('.info-p');
    if (infoP && Array.isArray(p.bio)) {
      infoP.innerHTML = p.bio.map(line => `<p>${line}</p>`).join('');
    }

    // Location / availability
    const infoP2 = document.querySelector('.info-p2');
    if (infoP2) {
      infoP2.innerHTML = `
        <p><i class="fa-solid fa-location-dot"></i> ${p.location || ''}</p>
        <p><i class="fa-solid fa-briefcase"></i> ${p.availability || ''}</p>
      `;
    }

    // Social (Follow me)
    const socialMap = p.social || {};
    const followLinks = {
      github: document.querySelector('.follow i.fa-github')?.parentElement,
      discord: document.querySelector('.follow i.fa-discord')?.parentElement,
      linkedin: document.querySelector('.follow i.fa-linkedin')?.parentElement,
      instagram: document.querySelector('.follow i.fa-instagram')?.parentElement
    };
    Object.entries(followLinks).forEach(([key, a]) => {
      if (a && socialMap[key]) a.setAttribute('href', socialMap[key]);
    });

    // About image
    const aboutImg = document.querySelector('.about img');
    if (aboutImg && p.aboutImage) aboutImg.src = p.aboutImage;

    // Skills summary cards
    const skillsSummary = p.skillsSummary || {};
    const cards = document.querySelectorAll('.card .c1 p');
    if (cards[0] && skillsSummary.languages) cards[0].textContent = skillsSummary.languages;
    if (cards[1] && skillsSummary.education) cards[1].textContent = skillsSummary.education;
    if (cards[2] && skillsSummary.projectsCount) cards[2].textContent = skillsSummary.projectsCount;

    // Projects - Note: Projects are now managed via localStorage and initializeProjects()
    // This section is kept for backward compatibility with data.json if it exists
    if (Array.isArray(data.projects) && data.projects.length > 0) {
      const storedProjects = getStoredProjects();
      // Only use data.json projects if localStorage is empty
      if (storedProjects.length === 0) {
        saveProjects(data.projects);
        renderProjects(data.projects);
      }
    }

    // Services
    const servicesContainer = document.querySelector('.services-container');
    if (servicesContainer && Array.isArray(data.services)) {
      servicesContainer.innerHTML = data.services.map(sv => `
        <div class="service-card">
          <img src="${sv.icon}" alt="${sv.title}">
          <h3>${sv.title}</h3>
          <p>${sv.text || ''}</p>
        </div>
      `).join('');
    }

    // Contact info
    const contactItems = document.querySelectorAll('.contact-item span');
    if (contactItems[0] && p.contacts?.email) contactItems[0].textContent = p.contacts.email;
    if (contactItems[1] && p.contacts?.phone) contactItems[1].textContent = p.contacts.phone;
    if (contactItems[2] && p.contacts?.address) contactItems[2].textContent = p.contacts.address;

    // Contact social links
    const contactSocial = document.querySelector('.social-links');
    if (contactSocial) {
      const anchors = contactSocial.querySelectorAll('a');
      if (anchors[0] && socialMap.github) anchors[0].setAttribute('href', socialMap.github);
      if (anchors[1] && socialMap.linkedin) anchors[1].setAttribute('href', socialMap.linkedin);
      if (anchors[2] && socialMap.whatsapp) anchors[2].setAttribute('href', socialMap.whatsapp);
    }

    // Footer
    const footerLogo = document.querySelector('.footer-logo');
    if (footerLogo && p.name) footerLogo.textContent = p.name;

    const footerSocial = document.querySelector('.footer-social');
    if (footerSocial) {
      const a = footerSocial.querySelectorAll('a');
      if (a[0] && socialMap.github) a[0].setAttribute('href', socialMap.github);
      if (a[1] && socialMap.linkedin) a[1].setAttribute('href', socialMap.linkedin);
      if (a[2] && socialMap.whatsapp) a[2].setAttribute('href', socialMap.whatsapp);
    }

    const footerCopy = document.querySelector('.footer-copy');
    if (footerCopy && p.footerName) footerCopy.innerHTML = `&copy; 2025 ${p.footerName}. All Rights Reserved.`;
  })
  .catch(() => {
    // fail silently if data.json missing
  });

// Contact Form Handler
const contactForm = document.getElementById('contact-form');
if (contactForm) {
  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const submitBtn = contactForm.querySelector('.btn-send');
    const originalText = submitBtn.textContent;
    submitBtn.disabled = true;
    submitBtn.textContent = 'Sending...';
    
    const formData = {
      user_name: contactForm.querySelector('input[name="user_name"]').value,
      user_email: contactForm.querySelector('input[name="user_email"]').value,
      message: contactForm.querySelector('textarea[name="message"]').value
    };
    
    try {
      // Only check if EmailJS is loaded and config exists
      if (EMAILJS_CONFIG.SERVICE_ID && EMAILJS_CONFIG.CONTACT_TEMPLATE_ID && EMAILJS_CONFIG.PUBLIC_KEY) {
        
        await emailjs.send(
          EMAILJS_CONFIG.SERVICE_ID,
          EMAILJS_CONFIG.CONTACT_TEMPLATE_ID,
          {
            to_email: 'kliyg00000@gmail.com',
            user_name: formData.user_name,
            user_email: formData.user_email,
            message: formData.message,
            subject: `New Contact Form Message from ${formData.user_name}`,
            reply_to: formData.user_email
          }
        );
        
        alert('✅ Message sent successfully! I\'ll get back to you soon.');
        contactForm.reset();
      
      } else {
        alert(`Message would be sent to: kliyg00000@gmail.com\n\nFrom: ${formData.user_name} (${formData.user_email})\n\nMessage: ${formData.message}\n\nNote: Configure EmailJS to enable email sending.`);
        contactForm.reset();
      }
      
    } catch (error) {
      console.error('Error sending contact form:', error);
      alert('❌ Error sending message. Please try again or contact me directly at kliyg00000@gmail.com\n\nError: ' + (error.text || error.message || 'Unknown error'));
    
    } finally {
      submitBtn.disabled = false;
      submitBtn.textContent = originalText;
    }
  });
}