document.addEventListener('DOMContentLoaded', function() {
            const form = document.getElementById('registrationForm');
            const addMemberBtn = document.getElementById('addMemberBtn');
            const teamMembersContainer = document.getElementById('teamMembersContainer');
            const successMessage = document.getElementById('successMessage');
            const errorMessage = document.getElementById('errorMessage');
            
            let memberCount = 3; // Starting with 3 required members
            
            // Add substitute player
            addMemberBtn.addEventListener('click', function() {
                if (memberCount >= 5) {
                    alert('Maximum 5 team members allowed (including substitutes)');
                    return;
                }
                
                memberCount++;
                const newMember = document.createElement('div');
                newMember.className = 'team-member';
                newMember.innerHTML = `
                    <div class="form-group">
                        <label for="member${memberCount}Name">Substitute ${memberCount-3} Name</label>
                        <input type="text" id="member${memberCount}Name" name="member${memberCount}Name">
                    </div>
                    
                    <div class="form-group">
                        <label for="member${memberCount}FFID">Substitute ${memberCount-3} Free Fire ID</label>
                        <input type="text" id="member${memberCount}FFID" name="member${memberCount}FFID" placeholder="e.g., 1234567890">
                    </div>
                `;
                
                teamMembersContainer.appendChild(newMember);
            });
            
            // Form submission
            form.addEventListener('submit', function(e) {
                e.preventDefault();
                
                // Basic validation
                const requiredFields = form.querySelectorAll('[required]');
                let isValid = true;
                
                requiredFields.forEach(field => {
                    if (!field.value.trim()) {
                        field.style.borderColor = 'red';
                        isValid = false;
                    } else {
                        field.style.borderColor = '#444';
                    }
                });
                
                if (!isValid) {
                    errorMessage.style.display = 'block';
                    errorMessage.textContent = 'Please fill all required fields';
                    return;
                }
                
                // Prepare form data
                const formData = new FormData(form);
                const data = {};
                formData.forEach((value, key) => {
                    data[key] = value;
                });
                
                // Add timestamp
                data.timestamp = new Date().toISOString();
                
                // Send data to Google Sheets
                fetch('YOUR_GOOGLE_APPS_SCRIPT_WEB_APP_URL', {
                    method: 'POST',
                    mode: 'no-cors',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(data)
                })
                .then(() => {
                    successMessage.style.display = 'block';
                    errorMessage.style.display = 'none';
                    form.reset();
                    window.scrollTo(0, 0);
                })
                .catch(error => {
                    console.error('Error:', error);
                    errorMessage.style.display = 'block';
                    errorMessage.textContent = 'There was an error submitting your registration. Please try again.';
                    window.scrollTo(0, 0);
                });
            });
        });