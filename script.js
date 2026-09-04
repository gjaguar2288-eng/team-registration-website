// Load teams when page loads
document.addEventListener('DOMContentLoaded', () => {
    loadTeams();
    setupFormListener();
});

// Setup form submission listener
function setupFormListener() {
    const form = document.getElementById('teamForm');
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        await registerTeam();
    });
}

// Toggle QR Code Modal
function toggleQRCode() {
    const modal = document.getElementById('qrModal');
    modal.style.display = 'block';
    generateQRCode();
}

// Close QR Code Modal
function closeQRCode() {
    const modal = document.getElementById('qrModal');
    modal.style.display = 'none';
}

// Generate QR Code
function generateQRCode() {
    const qrContainer = document.getElementById('qrCodeContainer');
    const qrUrlDisplay = document.getElementById('qrUrl');
    
    // Get current URL
    const currentUrl = window.location.origin;
    
    // Clear previous QR code
    qrContainer.innerHTML = '';
    
    // Generate QR code
    new QRCode(qrContainer, {
        text: currentUrl,
        width: 300,
        height: 300,
        colorDark: '#667eea',
        colorLight: '#ffffff',
        correctLevel: QRCode.CorrectLevel.H
    });
    
    // Display URL
    qrUrlDisplay.textContent = currentUrl;
}

// Copy link to clipboard
function copyLinkToClipboard() {
    const url = window.location.origin;
    navigator.clipboard.writeText(url).then(() => {
        showMessage('✓ Link copied to clipboard!', 'success');
    }).catch(() => {
        showMessage('✗ Failed to copy link', 'error');
    });
}

// Close modal when clicking outside
window.onclick = function(event) {
    const modal = document.getElementById('qrModal');
    if (event.target == modal) {
        modal.style.display = 'none';
    }
}

// Register a new team
async function registerTeam() {
    const form = document.getElementById('teamForm');
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);

    try {
        const response = await fetch('/register-team', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        });

        const result = await response.json();

        if (result.success) {
            // Show success message
            showMessage(`✓ ${result.message}`, 'success');
            
            // Reset form
            form.reset();
            
            // Reload teams list
            setTimeout(loadTeams, 500);
        } else {
            showMessage(`✗ ${result.message}`, 'error');
        }
    } catch (error) {
        console.error('Error:', error);
        showMessage('An error occurred while registering the team', 'error');
    }
}

// Load all registered teams
async function loadTeams() {
    try {
        const response = await fetch('/api/teams');
        const result = await response.json();

        const teamsList = document.getElementById('teamsList');

        if (result.teams.length === 0) {
            teamsList.innerHTML = '<p style="grid-column: 1/-1; text-align: center; color: #999; padding: 40px 20px;">No teams registered yet. Be the first to register!</p>';
            return;
        }

        teamsList.innerHTML = '';

        result.teams.forEach(team => {
            const teamCard = createTeamCard(team);
            teamsList.appendChild(teamCard);
        });
    } catch (error) {
        console.error('Error loading teams:', error);
    }
}

// Create a team card element
function createTeamCard(team) {
    const card = document.createElement('div');
    card.className = 'team-card';
    card.innerHTML = `
        <h3>${team.teamName}</h3>
        <p><span class="label">Sport:</span> ${team.sport}</p>
        <p><span class="label">Location:</span> ${team.location}</p>
        <p><span class="label">Coach:</span> ${team.coachName}</p>
        <p><span class="label">Email:</span> <a href="mailto:${team.coachEmail}">${team.coachEmail}</a></p>
        <p><span class="label">Phone:</span> ${team.coachPhone}</p>
        <p><span class="label">Members:</span> ${team.memberCount}</p>
        ${team.teamDescription ? `<p><span class="label">Description:</span> ${team.teamDescription}</p>` : ''}
        ${team.website ? `<p><span class="label">Website:</span> <a href="${team.website}" target="_blank">${team.website}</a></p>` : ''}
        <p><span class="label">Registered:</span> ${team.registeredAt}</p>
        <div style="margin-top: 15px; display: flex; gap: 10px;">
            <button onclick="editTeam(${team.id})" style="flex: 1; padding: 8px; background: #667eea; color: white; border: none; border-radius: 4px; cursor: pointer; transition: all 0.3s ease;" onmouseover="this.style.background='#5568d3'" onmouseout="this.style.background='#667eea'">✏️ Edit</button>
            <button onclick="deleteTeam(${team.id})" style="flex: 1; padding: 8px; background: #dc3545; color: white; border: none; border-radius: 4px; cursor: pointer; transition: all 0.3s ease;" onmouseover="this.style.background='#c82333'" onmouseout="this.style.background='#dc3545'">🗑️ Delete</button>
        </div>
    `;
    return card;
}

// Delete a team
async function deleteTeam(teamId) {
    if (!confirm('Are you sure you want to delete this team?')) {
        return;
    }

    try {
        const response = await fetch(`/api/teams/${teamId}`, {
            method: 'DELETE'
        });

        const result = await response.json();

        if (result.success) {
            showMessage('✓ Team deleted successfully', 'success');
            loadTeams();
        } else {
            showMessage(`✗ ${result.message}`, 'error');
        }
    } catch (error) {
        console.error('Error:', error);
        showMessage('An error occurred while deleting the team', 'error');
    }
}

// Edit a team (placeholder - opens alert with team info)
function editTeam(teamId) {
    alert('Edit functionality coming soon! Team ID: ' + teamId);
}

// Show success or error message
function showMessage(message, type) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `${type}-message`;
    messageDiv.textContent = message;
    messageDiv.style.position = 'fixed';
    messageDiv.style.top = '20px';
    messageDiv.style.right = '20px';
    messageDiv.style.zIndex = '9999';
    messageDiv.style.maxWidth = '400px';

    document.body.appendChild(messageDiv);

    // Auto-remove after 4 seconds
    setTimeout(() => {
        messageDiv.remove();
    }, 4000);
}
