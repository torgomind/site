window.onload = function() {
    const teamMembers = [
        { name: "Ray Peters", title: "company director", image: "images/ray_peters.jpg" },
        { name: "Steve Johnson", title: "management", image: "images/steve_johnson.jpg" },
        { name: "Dave Wilson", title: "marketing and PR", image: "images/dave_wilson.jpg" },
        { name: "Robert Anderson", title: "community manager", image: "images/robert_anderson.jpg" },
        { name: "Kevin Brown", title: "consulting", image: "images/kevin_brown.jpg" }
    ];

    const teamContainer = document.getElementById('team');

    // Shuffle the team members array (optional)
    teamMembers.sort(() => Math.random() - 0.5);

    // Generate and display the team members
    teamMembers.forEach(member => {
        const memberDiv = document.createElement('div');
        memberDiv.className = 'team-member';

        const img = document.createElement('img');
        img.src = member.image;
        img.alt = member.name;
        memberDiv.appendChild(img);

        const infoDiv = document.createElement('div');

        const name = document.createElement('h4');
        name.textContent = member.name;
        infoDiv.appendChild(name);

        const title = document.createElement('p');
        title.textContent = member.title;
        infoDiv.appendChild(title);

        memberDiv.appendChild(infoDiv);
        teamContainer.appendChild(memberDiv);
    });
};
