# Herman & Tawo Betting Tracker

A simple web application to track bets between Tawo and Herman, helping you keep tabs on who owes whom.

## Overview

This application consists of:
- **Backend**: A Flask API that handles data storage and retrieval
- **Frontend**: A React application that provides a user-friendly interface

The app allows you to:
- Add new bets with descriptions, amounts, and winners
- View all bets in a card-based layout
- Edit or delete existing bets
- See a summary of the current balance (who owes whom)

## Screenshots


![image](https://github.com/user-attachments/assets/a534eb6a-730c-469b-834f-4e60727e7882)

## Requirements

### Backend
- Python 3.8+
- Flask
- Flask-SQLAlchemy
- Flask-CORS

### Frontend
- Node.js 18+
- npm or yarn
- React 19+
- Axios

## Installation & Setup

### Backend Setup

1. Clone the repository
```bash
git clone <repository-url>
cd herman-tawo-betting-tracker
```

2. Create a virtual environment and activate it
```bash
python -m venv venv
# On Windows
venv\Scripts\activate
# On macOS/Linux
source venv/bin/activate
```

3. Install backend dependencies
```bash
cd backend
pip install -r requirements.txt
```

4. Run the Flask application
```bash
python app.py
```

The backend API will run on `http://localhost:5000`.

### Frontend Setup

1. Open a new terminal window/tab
2. Navigate to the frontend directory
```bash
cd frontend
```

3. Install dependencies
```bash
npm install
# or if you use yarn
yarn install
```

4. Run the development server
```bash
npm run dev
# or with yarn
yarn dev
```

The frontend application will run on `http://localhost:5173`.

## Usage

1. Open your browser and navigate to `http://localhost:5173`
2. Use the tabs at the top to navigate between different sections:
   - **Bets**: View all current bets
   - **Add Bet**: Add a new bet
   - **Summary**: See who owes whom and by how much

### Adding a Bet
1. Click on the "Add Bet" tab
2. Fill in the bet description
3. Select who won the bet (You or Herman)
4. Enter the amount
5. Click "Add Bet"

### Editing/Deleting a Bet
1. Navigate to the "Bets" tab
2. Find the bet you want to modify
3. Click "Edit" to change details or "Delete" to remove it

## Project Structure

### Backend
```
backend/
├── app.py            # Main application entry point
├── config.py         # Configuration settings
├── models.py         # Database models
├── routes.py         # API endpoints
└── requirements.txt  # Dependencies
```

### Frontend
```
frontend/
├── public/           # Static files
├── src/              # Source code
│   ├── assets/       # Images and other assets
│   ├── components/   # React components
│   ├── services/     # API service functions
│   ├── App.jsx       # Main application component
│   └── main.jsx      # Application entry point
├── package.json      # Dependencies and scripts
└── vite.config.js    # Vite configuration
```

## Development

### Backend
- The SQLite database is created automatically in `backend/instance/database.db`
- To reset the database, simply delete this file (it will be recreated on restart)

### Frontend
- Modify components in the `src/components` directory
- API calls are centralized in `src/services/api.js`

## Next Steps
- Rename "You" to be Tawo since it was made from Tawo's POV
- Create a more fun UI to type in the amount owed like say an annoying slider I am inspired by things like this https://www.reddit.com/r/badUIbattles/\
- host the front end backends
-  buy a domain name for the project 
  
