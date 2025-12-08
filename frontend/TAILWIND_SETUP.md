# Setting up Tailwind CSS for the YVI Tech Assistant Chat Widget

This project uses Tailwind CSS for styling the new ChatGPT-like initial screen component. Follow these steps to set up Tailwind CSS in your project:

## Installation Steps

1. Install Tailwind CSS and its dependencies:
   ```bash
   npm install -D tailwindcss postcss autoprefixer
   npx tailwindcss init -p
   ```

2. Configure your template paths in `tailwind.config.js`:
   ```javascript
   /** @type {import('tailwindcss').Config} */
   module.exports = {
     content: [
       "./index.html",
       "./src/**/*.{js,ts,jsx,tsx}",
     ],
     theme: {
       extend: {},
     },
     plugins: [],
   }
   ```

3. Add the Tailwind directives to your CSS in `src/styles/main.css`:
   ```css
   @tailwind base;
   @tailwind components;
   @tailwind utilities;
   ```

4. Import your CSS in your main file (usually `src/main.jsx` or similar):
   ```javascript
   import './styles/main.css';
   ```

## Custom Animations

The InitialScreen component uses custom animations that have already been added to `src/styles/main.css`:
- `animate-fadeIn`
- `animate-slideUp`

These are defined as:
```css
@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes slideUp {
  from {
    transform: translateY(20px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

.animate-fadeIn {
  animation: fadeIn 0.3s ease-out forwards;
}

.animate-slideUp {
  animation: slideUp 0.3s ease-out forwards;
}
```

Similar animations have also been added to `src/components/Chat/ChatWidget.css` for consistency.

## Styling Consistency

All buttons in the chat interface now use consistent pill-shaped styling:
- InitialScreen buttons: Fully rounded with `rounded-full`
- Chat suggestion buttons: Fully rounded with `border-radius: 9999px`

## Verification

After completing the setup, you should see:
1. Properly styled pill-shaped buttons with icons
2. A clean white background with a subtle gradient at the top
3. Smooth animations when expanding the "More" section
4. Responsive 2-column layout on mobile devices
5. Consistent styling between InitialScreen buttons and chat suggestion buttons

If you encounter any issues, make sure:
1. Tailwind CSS is properly installed
2. The content paths in `tailwind.config.js` are correctly configured
3. Your CSS file imports the Tailwind directives
4. Your main JavaScript file imports the CSS