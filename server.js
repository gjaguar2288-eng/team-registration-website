const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname)));

// In-memory storage for teams
let teams = [];

// Serve the main HTML page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// API endpoint to register a team
app.post('/register-team', (req, res) => {
    const {
        teamName,
        teamDescription,
        sport,
        location,
        coachName,
        coachEmail,
        coachPhone,
        memberCount,
        website
    } = req.body;

    // Validation
    if (!teamName || !sport || !location || !coachName || !coachEmail || !coachPhone || !memberCount) {
        return res.status(400).json({
            success: false,
            message: 'All required fields must be filled'
        });
    }

    // Create team object
    const newTeam = {
        id: Date.now(),
        teamName,
        teamDescription,
        sport,
        location,
        coachName,
        coachEmail,
        coachPhone,
        memberCount: parseInt(memberCount),
        website,
        registeredAt: new Date().toLocaleDateString()
    };

    // Add to teams array
    teams.push(newTeam);

    res.json({
        success: true,
        message: `Team "${teamName}" registered successfully!`,
        team: newTeam
    });
});

// API endpoint to get all registered teams
app.get('/api/teams', (req, res) => {
    res.json({
        success: true,
        teams: teams,
        totalTeams: teams.length
    });
});

// API endpoint to get a specific team by ID
app.get('/api/teams/:id', (req, res) => {
    const team = teams.find(t => t.id === parseInt(req.params.id));
    
    if (!team) {
        return res.status(404).json({
            success: false,
            message: 'Team not found'
        });
    }

    res.json({
        success: true,
        team: team
    });
});

// API endpoint to delete a team
app.delete('/api/teams/:id', (req, res) => {
    const index = teams.findIndex(t => t.id === parseInt(req.params.id));
    
    if (index === -1) {
        return res.status(404).json({
            success: false,
            message: 'Team not found'
        });
    }

    const deletedTeam = teams.splice(index, 1);
    
    res.json({
        success: true,
        message: 'Team deleted successfully',
        team: deletedTeam[0]
    });
});

// API endpoint to update a team
app.put('/api/teams/:id', (req, res) => {
    const team = teams.find(t => t.id === parseInt(req.params.id));
    
    if (!team) {
        return res.status(404).json({
            success: false,
            message: 'Team not found'
        });
    }

    // Update team fields
    Object.keys(req.body).forEach(key => {
        if (key !== 'id' && key !== 'registeredAt') {
            team[key] = req.body[key];
        }
    });

    res.json({
        success: true,
        message: 'Team updated successfully',
        team: team
    });
});

// Start server
app.listen(PORT, () => {
    console.log(`🚀 Team Registration Website is running on http://localhost:${PORT}`);
    console.log(`📝 Register teams at http://localhost:${PORT}`);
    console.log(`📊 View all teams at http://localhost:${PORT}/api/teams`);
});
