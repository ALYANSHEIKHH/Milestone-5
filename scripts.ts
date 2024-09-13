// scripts.ts

// Wait for the DOM content to load
document.addEventListener('DOMContentLoaded', () => {
    // Form and output elements
    const resumeForm = document.getElementById('resumeForm') as HTMLFormElement;
    const resumeOutput = document.getElementById('resumeOutput') as HTMLElement;
    const addEducationButton = document.getElementById('addEducation') as HTMLButtonElement;
    const addWorkExperienceButton = document.getElementById('addWorkExperience') as HTMLButtonElement;

    // Add more Education fields
    addEducationButton.addEventListener('click', () => {
        const educationSection = document.getElementById('educationSection') as HTMLElement;
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
        const workExperienceSection = document.getElementById('workExperienceSection') as HTMLElement;
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
        const name = (document.getElementById('name') as HTMLInputElement).value;
        const email = (document.getElementById('email') as HTMLInputElement).value;
        const phone = (document.getElementById('phone') as HTMLInputElement).value;
        const location = (document.getElementById('location') as HTMLInputElement).value;

        // Capture Education
        const educationEntries = document.querySelectorAll('.education-entry');
        const educationData = Array.from(educationEntries).map(entry => {
            const degree = (entry.children[0] as HTMLInputElement).value;
            const institution = (entry.children[1] as HTMLInputElement).value;
            const year = (entry.children[2] as HTMLInputElement).value;
            return { degree, institution, year };
        });

        // Capture Work Experience
        const workEntries = document.querySelectorAll('.work-entry');
        const workData = Array.from(workEntries).map(entry => {
            const jobTitle = (entry.children[0] as HTMLInputElement).value;
            const company = (entry.children[1] as HTMLInputElement).value;
            const years = (entry.children[2] as HTMLInputElement).value;
            const description = (entry.children[3] as HTMLTextAreaElement).value;
            return { jobTitle, company, years, description };
        });

        // Capture Skills
        const skills = (document.getElementById('skills') as HTMLInputElement).value.split(',');

        // Generate Resume
        generateResume(name, email, phone, location, educationData, workData, skills);
    });

    // Function to generate and display the resume
    function generateResume(
        name: string, email: string, phone: string, location: string,
        education: { degree: string, institution: string, year: string }[],
        work: { jobTitle: string, company: string, years: string, description: string }[],
        skills: string[]
    ) {
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
