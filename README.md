# Snake Game Simple 🐍

A classic snake game with a dominant red color theme, built using HTML5 Canvas and vanilla JavaScript.

## 🎮 Game Features

- **Classic Snake Gameplay**: Control the snake to eat food and grow longer
- **Red Color Theme**: Dominant red (#DC2626) color scheme throughout the game
- **Smooth Controls**: Use arrow keys or WASD to control the snake
- **Score System**: Track your current score and high score (saved locally)
- **Game Over Screen**: Restart functionality when the game ends
- **Responsive Design**: Works on desktop browsers

## 🎯 How to Play

1. **Movement**: Use arrow keys or WASD to control the snake
2. **Start/Pause**: Press Space bar to start or pause the game
3. **Restart**: Press R key to restart the game at any time
4. **Objective**: Eat the white food to grow longer and increase your score
5. **Avoid**: Don't hit the walls or your own body!

## 🚀 Quick Start

### Local Development

1. Clone or download this repository
2. Open a terminal in the project directory
3. Run a local server:
   ```bash
   # Using Python (recommended)
   python -m http.server 8000
   
   # Or using Node.js
   npx serve .
   
   # Or using PHP
   php -S localhost:8000
   ```
4. Open your browser and go to `http://localhost:8000`
5. Start playing!

### Using npm scripts

```bash
npm start    # Start local development server
npm run dev  # Same as start
```

## 🌐 Deployment

This is a static web application that can be deployed to any static hosting platform.

### Deploy to Vercel

1. **Quick Deploy**: 
   [![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/yourusername/snake-game-simple)

2. **Manual Deploy**:
   ```bash
   # Install Vercel CLI
   npm i -g vercel
   
   # Deploy
   vercel
   ```

### Deploy to Netlify

1. **Drag & Drop**: Simply drag the project folder to [Netlify Drop](https://app.netlify.com/drop)

2. **Git Integration**:
   - Connect your GitHub repository to Netlify
   - Build settings: Leave empty (no build process needed)
   - Publish directory: `/` (root)

3. **Netlify CLI**:
   ```bash
   # Install Netlify CLI
   npm install -g netlify-cli
   
   # Deploy
   netlify deploy --prod --dir .
   ```

### Deploy to GitHub Pages

1. Push your code to a GitHub repository
2. Go to repository Settings → Pages
3. Select source: "Deploy from a branch"
4. Choose branch: `main` or `master`
5. Folder: `/ (root)`
6. Your game will be available at: `https://yourusername.github.io/repository-name`

### Deploy to Firebase Hosting

```bash
# Install Firebase CLI
npm install -g firebase-tools

# Login to Firebase
firebase login

# Initialize Firebase in your project
firebase init hosting

# Deploy
firebase deploy
```

### Deploy to Surge.sh

```bash
# Install Surge CLI
npm install -g surge

# Deploy
surge .
```

## 📁 Project Structure

```
snake-game-simple/
├── index.html          # Main HTML file
├── style.css           # CSS styles with red theme
├── game.js             # Game logic and functionality
├── package.json        # Project metadata and scripts
├── vercel.json         # Vercel deployment configuration
├── README.md           # This file
└── .trae/
    └── documents/
        ├── product_requirements.md
        └── technical_architecture.md
```

## 🎨 Color Scheme

- **Primary Red**: `#DC2626` (Snake body, UI elements)
- **Dark Red**: `#991B1B` (Borders, shadows)
- **White**: `#FFFFFF` (Food, text)
- **Black**: `#000000` (Background)
- **Dark Gray**: `#1F2937` (Grid lines)

## 🛠️ Technical Details

- **Frontend**: HTML5, CSS3, Vanilla JavaScript
- **Canvas**: HTML5 Canvas API for game rendering
- **Storage**: LocalStorage for high score persistence
- **No Dependencies**: Pure vanilla JavaScript, no external libraries
- **Browser Support**: Modern browsers with HTML5 Canvas support

## 📱 Browser Compatibility

- ✅ Chrome 60+
- ✅ Firefox 55+
- ✅ Safari 12+
- ✅ Edge 79+

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin feature-name`
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🎯 Future Enhancements

- [ ] Mobile touch controls
- [ ] Sound effects
- [ ] Multiple difficulty levels
- [ ] Power-ups and special items
- [ ] Multiplayer mode
- [ ] Different themes

---

**Enjoy playing the Snake Game! 🐍🎮**