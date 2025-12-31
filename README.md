# Personal Portfolio Website

A modern, interactive personal portfolio website showcasing projects, skills, capabilities, and hobbies. Built with HTML, CSS, and JavaScript, featuring unique UI elements including particle animations, 3D effects, and smooth transitions.

## 🌟 Features

- **Interactive Particle Background**: Dynamic particle system with connecting lines
- **3D Floating Robot**: Animated 3D robot in the hero section
- **Glitch Text Effect**: Eye-catching glitch animation on the main title
- **Smooth Scroll Animations**: Elements animate as you scroll
- **Interactive Skill Cards**: Hover effects with animated progress bars
- **Project Showcase**: Beautiful project cards with hover overlays
- **Responsive Design**: Fully optimized for mobile, tablet, and desktop
- **LinkedIn Integration**: Direct link to your LinkedIn profile
- **Contact Form**: Ready-to-use contact form (can be integrated with EmailJS or Formspree)

## 🚀 Getting Started

### Prerequisites

- A modern web browser (Chrome, Firefox, Safari, Edge)
- A GitHub account (for hosting on GitHub Pages)

### Installation

1. Clone or download this repository
2. Open `index.html` in your web browser
3. That's it! No build process required.

### Local Development

Simply open `index.html` in your browser or use a local server:

```bash
# Using Python
python -m http.server 8000

# Using Node.js (http-server)
npx http-server

# Using PHP
php -S localhost:8000
```

Then navigate to `http://localhost:8000` in your browser.

## 📝 Customization

### Update Your Information

1. **Personal Information**: Edit the About section in `index.html`
   - Update your name, description, and location
   - Modify the stats (projects, years of experience, robots built)

2. **Skills**: Update the skills section with your actual skills
   - Modify skill names, descriptions, and proficiency levels (0-100)

3. **Projects**: Replace placeholder projects with your actual projects
   - Update project titles, descriptions, and technologies
   - Add links to your project repositories or live demos

4. **Hobbies**: Customize the hobbies section to reflect your interests

5. **Contact Information**: 
   - Update the LinkedIn profile URL in `script.js` (line with `linkedinLink.href`)
   - Update email address in the contact section
   - Update location and company information

### LinkedIn Integration

To connect your LinkedIn profile:

1. Open `script.js`
2. Find the line: `linkedinLink.href = 'https://www.linkedin.com/in/yourprofile';`
3. Replace `yourprofile` with your actual LinkedIn username
4. Or replace the entire URL with your full LinkedIn profile URL

### Color Scheme

The website uses CSS variables for easy color customization. Edit the `:root` variables in `style.css`:

```css
:root {
    --primary-color: #00d4ff;      /* Main accent color */
    --secondary-color: #ff006e;    /* Secondary accent */
    --accent-color: #8338ec;       /* Tertiary accent */
    --dark-bg: #0a0e27;            /* Dark background */
    --darker-bg: #050810;          /* Darker background */
    --light-text: #ffffff;         /* Light text */
    --gray-text: #a0a0a0;          /* Gray text */
}
```

## 🌐 Deploying to GitHub Pages

GitHub Pages offers free hosting for static websites. Here's how to deploy:

### Method 1: Using GitHub Web Interface

1. Create a new repository on GitHub (e.g., `my-portfolio`)
2. Upload all files to the repository
3. Go to **Settings** → **Pages**
4. Under **Source**, select the branch (usually `main` or `master`)
5. Select the folder (usually `/root`)
6. Click **Save**
7. Your site will be live at: `https://yourusername.github.io/my-portfolio`

### Method 2: Using Git Command Line

```bash
# Initialize git repository
git init

# Add all files
git add .

# Commit files
git commit -m "Initial commit: Personal portfolio website"

# Add remote repository (replace with your GitHub repo URL)
git remote add origin https://github.com/yourusername/my-portfolio.git

# Push to GitHub
git branch -M main
git push -u origin main
```

Then follow steps 3-7 from Method 1 to enable GitHub Pages.

### Custom Domain (Optional)

1. Add a `CNAME` file to your repository with your domain name
2. Configure DNS settings with your domain provider
3. Update GitHub Pages settings to use your custom domain

## 📧 Contact Form Integration

The contact form is currently set up to show an alert. To make it functional, you can integrate with:

### EmailJS (Recommended for beginners)

1. Sign up at [EmailJS](https://www.emailjs.com/)
2. Create an email service and template
3. Add EmailJS SDK to `index.html`:
   ```html
   <script src="https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/email.min.js"></script>
   ```
4. Update the form submission in `script.js`:
   ```javascript
   emailjs.sendForm('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', contactForm)
       .then(() => alert('Message sent successfully!'))
       .catch(() => alert('Error sending message.'));
   ```

### Formspree

1. Sign up at [Formspree](https://formspree.io/)
2. Get your form endpoint
3. Update the form action in `index.html`:
   ```html
   <form action="https://formspree.io/f/YOUR_FORM_ID" method="POST">
   ```

## 🎨 UI Features Explained

- **Particle Canvas**: Interactive particle system that creates connections between nearby particles
- **3D Robot**: CSS 3D transforms create a rotating robot with animated parts
- **Glitch Effect**: CSS animations create a digital glitch effect on the main title
- **Skill Bars**: Animated progress bars that fill when scrolled into view
- **Hover Effects**: 3D transforms and color transitions on cards
- **Scroll Animations**: Elements fade in and slide up as you scroll

## 📱 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## 🛠️ Technologies Used

- **HTML5**: Semantic markup
- **CSS3**: Modern styling with animations, gradients, and 3D transforms
- **JavaScript (ES6+)**: Interactive features and animations
- **Font Awesome**: Icons
- **Canvas API**: Particle system

## 📄 License

This project is open source and available for personal use. Feel free to customize it for your own portfolio!

## 🤝 Contributing

Feel free to fork this project and customize it for your own use. If you make improvements that could benefit others, pull requests are welcome!

## 📞 Support

If you have any questions or need help customizing the website, feel free to reach out!

---

**Built with ❤️ by a Robotics Engineer passionate about building software**

*Hosted on GitHub Pages*