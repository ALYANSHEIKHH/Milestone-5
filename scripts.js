"use strict";
// scripts.ts
// Wait for the DOM content to load
document.addEventListener('DOMContentLoaded', () => {
    // Form and output elements
    const resumeForm = document.getElementById('resumeForm');
    const resumeOutput = document.getElementById('resumeOutput');
    const addEducationButton = document.getElementById('addEducation');
    const addWorkExperienceButton = document.getElementById('addWorkExperience');
    // Add more Education fields
    addEducationButton.addEventListener('click', () => {
        const educationSection = document.getElementById('educationSection');
        const newEntry = document.createElement('div');
        newEntry.classList.add('education-entry');
        newEntry.innerHTML = `
            <input type="text" placeholder="Degree" required>
            <input type="text" placeholder="Institution" required>
            <input type="text" placeholder="Year" required>
        `;
        educationSection.appendChild(newEntry);
    });
    // Add more Work Experience fields
    addWorkExperienceButton.addEventListener('click', () => {
        const workExperienceSection = document.getElementById('workExperienceSection');
        const newEntry = document.createElement('div');
        newEntry.classList.add('work-entry');
        newEntry.innerHTML = `
            <input type="text" placeholder="Job Title" required>
            <input type="text" placeholder="Company" required>
            <input type="text" placeholder="Years" required>
            <textarea placeholder="Description" required></textarea>
        `;
        workExperienceSection.appendChild(newEntry);
    });
    // Form submission to generate the resume
    resumeForm.addEventListener('submit', (e) => {
        e.preventDefault();
        // Capture Personal Information
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const phone = document.getElementById('phone').value;
        const location = document.getElementById('location').value;
        // Capture Education
        const educationEntries = document.querySelectorAll('.education-entry');
        const educationData = Array.from(educationEntries).map(entry => {
            const degree = entry.children[0].value;
            const institution = entry.children[1].value;
            const year = entry.children[2].value;
            return { degree, institution, year };
        });
        // Capture Work Experience
        const workEntries = document.querySelectorAll('.work-entry');
        const workData = Array.from(workEntries).map(entry => {
            const jobTitle = entry.children[0].value;
            const company = entry.children[1].value;
            const years = entry.children[2].value;
            const description = entry.children[3].value;
            return { jobTitle, company, years, description };
        });
        // Capture Skills
        const skills = document.getElementById('skills').value.split(',');
        // Generate Resume
        generateResume(name, email, phone, location, educationData, workData, skills);
    });
    // Function to generate and display the resume
    function generateResume(name, email, phone, location, education, work, skills) {
        resumeOutput.innerHTML = `
            <div class="section">
                <h2>Personal Information</h2>
                <p><strong>Name:</strong> ${name}</p>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Phone:</strong> ${phone}</p>
                <p><strong>Location:</strong> ${location}</p>
            </div>
            <div class="section">
                <h2>Education</h2>
                ${education.map(ed => `
                    <h3>${ed.degree}</h3>
                    <p>${ed.institution}, ${ed.year}</p>
                `).join('')}
            </div>
            <div class="section">
                <h2>Work Experience</h2>
                ${work.map(wk => `
                    <h3>${wk.jobTitle} at ${wk.company}</h3>
                    <p>${wk.years}</p>
                    <p>${wk.description}</p>
                `).join('')}
            </div>
            <div class="section">
                <h2>Skills</h2>
                <ul>
                    ${skills.map(skill => `<li>${skill.trim()}</li>`).join('')}
                </ul>
            </div>
        `;
    }
});
