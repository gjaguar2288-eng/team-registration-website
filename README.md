# Team Registration Website

A modern, fully functional website for creating and registering new teams with a beautiful UI and complete backend API.

## Features

✨ **Modern Design**
- Beautiful gradient UI with purple theme
- Fully responsive design (mobile, tablet, desktop)
- Smooth animations and transitions

📋 **Team Registration**
- Register teams with detailed information
- Collect team details (name, sport, location, coach info, etc.)
- Form validation
- Success/error notifications

👥 **Team Management**
- View all registered teams in a card layout
- Delete teams
- Edit team information (coming soon)
- Real-time team list updates

🔧 **Backend API**
- RESTful API endpoints
- Create, read, update, delete teams
- In-memory storage (can be upgraded to database)
- Input validation
- Error handling

## Project Structure

```
team-registration-website/
├── index.html       # Main HTML page with registration form
├── styles.css       # CSS styling
├── script.js        # Frontend JavaScript
├── server.js        # Express.js backend server
├── package.json     # Project dependencies
└── README.md        # This file
```

## Requirements

- Node.js (v12 or higher)
- npm (comes with Node.js)

## Installation

1. **Clone the repository:**
```bash
git clone https://github.com/gjaguar2288-eng/team-registration-website.git
cd team-registration-website
```

2. **Install dependencies:**
```bash
npm install
```

This will install:
- **express** - Web framework
- **body-parser** - Request parsing middleware
- **nodemon** - Development tool for auto-restarting

## Running the Website

### Development Mode (with auto-reload)
```bash
npm run dev
```

### Production Mode
```bash
npm start
```

The server will start and display:
```
🚀 Team Registration Website is running on http://localhost:3000
📝 Register teams at http://localhost:3000
📊 View all teams at http://localhost:3000/api/teams
```

Open your browser and navigate to: **http://localhost:3000**

## API Endpoints

### 1. Get Home Page
```
GET /
```
Returns the main HTML page with the registration form.

### 2. Register a Team
```
POST /register-team
Content-Type: application/json

{
  "teamName": "Eagles",
  "teamDescription": "Professional basketball team",
  "sport": "basketball",
  "location": "New York, NY",
  "coachName": "John Doe",
  "coachEmail": "john@example.com",
  "coachPhone": "(555) 123-4567",
  "memberCount": "15",
  "website": "https://eagles.example.com"
}
```

### 3. Get All Teams
```
GET /api/teams
```

Response:
```json
{
  "success": true,
  "teams": [
    {
      "id": 1234567890,
      "teamName": "Eagles",
      "teamDescription": "Professional basketball team",
      "sport": "basketball",
      "location": "New York, NY",
      "coachName": "John Doe",
      "coachEmail": "john@example.com",
      "coachPhone": "(555) 123-4567",
      "memberCount": 15,
      "website": "https://eagles.example.com",
      "registeredAt": "9/4/2026"
    }
  ],
  "totalTeams": 1
}
```

### 4. Get Specific Team
```
GET /api/teams/:id
```

### 5. Update Team
```
PUT /api/teams/:id
Content-Type: application/json

{
  "teamName": "New Eagles",
  "memberCount": "20"
}
```

### 6. Delete Team
```
DELETE /api/teams/:id
```

## Usage

1. **Start the server** using `npm start` or `npm run dev`
2. **Open browser** to `http://localhost:3000`
3. **Fill out the registration form** with team details
4. **Submit the form** to register your team
5. **View registered teams** in the "Registered Teams" section below
6. **Delete or edit** teams using the action buttons

## Form Fields

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| Team Name | Text | Yes | Name of the team |
| Team Description | Textarea | No | Brief description of the team |
| Sport | Select | Yes | Type of sport |
| Location | Text | Yes | City and state |
| Coach Name | Text | Yes | Full name of coach |
| Coach Email | Email | Yes | Coach's email address |
| Coach Phone | Phone | Yes | Coach's phone number |
| Number of Members | Number | Yes | Total team members |
| Team Website | URL | No | Team's website URL |

## Customization

### Change Port
Edit `server.js` and change:
```javascript
const PORT = 3000; // Change to your desired port
```

### Add Database
Replace in-memory array with a database:
- MongoDB
- PostgreSQL
- MySQL
- Firebase

### Add Authentication
Implement user login and team ownership management.

### Deploy
Options for deployment:
- **Heroku** - Free tier available
- **AWS** - Elastic Beanstalk or EC2
- **DigitalOcean** - Affordable VPS
- **Vercel/Netlify** - For frontend only

## Technologies Used

- **Frontend:**
  - HTML5
  - CSS3 (with flexbox and grid)
  - Vanilla JavaScript (ES6+)

- **Backend:**
  - Node.js
  - Express.js
  - Body Parser

## Future Enhancements

- [ ] Database integration (MongoDB/PostgreSQL)
- [ ] User authentication and authorization
- [ ] Edit team functionality
- [ ] Team statistics and analytics
- [ ] Email notifications
- [ ] File uploads (team logo, etc.)
- [ ] Search and filter teams
- [ ] Team members management
- [ ] Dashboard with charts

## Troubleshooting

### Port Already in Use
If port 3000 is already in use:
```bash
# Change PORT in server.js to another number (e.g., 5000)
# Or kill the process using port 3000

# On Windows:
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# On Mac/Linux:
lsof -ti:3000 | xargs kill -9
```

### Dependencies Not Installing
```bash
# Clear npm cache
npm cache clean --force

# Remove node_modules and package-lock.json
rm -rf node_modules package-lock.json

# Reinstall
npm install
```

### Page Not Loading
- Make sure server is running
- Check browser console for errors
- Verify URL is http://localhost:3000

## License

MIT License - feel free to use this project for personal or commercial purposes.

## Support

For issues or questions, please open an issue on GitHub.

---

**Made with ❤️ for team management**
