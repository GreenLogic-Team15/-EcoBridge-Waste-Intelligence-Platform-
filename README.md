# EcoBridge Waste Intelligence Platform

Welcome to the EcoBridge development team! This platform leverages AI and Data Science to help hospitality SMEs track and recover waste. 

---

## Contribution Guidelines (Team Rules)

To keep our code clean and avoid "Merge Hell," we follow a strict branching and PR process.

### 1. Never Push Directly to `main`
The `main` branch is for production-ready code only. All development happens on feature branches.

### 2. Branch Naming Convention
Use descriptive names for your branches:
- `feat/feature-name` (for new features)
- `fix/bug-name` (for fixing issues)
- `docs/update-name` (for documentation)

*Example:* `feat/waste-logging-form` or `feat/ai-model-integration`

### 3. Workflow Steps
When you start a new task, follow these commands in your terminal:

1. **Pull the latest changes:**
   ```bash
   git checkout main
   git pull origin main
   
2. **Create your branch:**
   git checkout -b feat/your-feature-name
   
3. **Work, Commit, and Push:**
   git add .
   git commit -m "Briefly describe what you did"
   git push origin feat/your-feature-name

4. **Open a Pull Request (PR):**
   Go to GitHub, find your branch, and click "Compare & pull request." Tag a teammate to review your code!

## Technical Stack (MVP)**
**Frontend:** React (Vite)

**Backend:** [Insert Tool, e.g., Node/Express or Python/FastAPI]

**Data/AI:** [Insert Tool, e.g., Scikit-Learn/Pandas]

**DevOps:** GitHub Actions
   
