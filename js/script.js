document.addEventListener('DOMContentLoaded', () => {
    fetch('./projects.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Error al cargar el archivo JSON');
            }
            return response.json();
        })
        .then(projects => {
            const projectsContainer = document.getElementById('projects-container');
            
             projects.forEach(project => {
                const projectCard = document.createElement('div');
                projectCard.className = 'project-card';

                const projectNameLink = document.createElement('a');
                projectNameLink.href = project.repoUrl; 
                projectNameLink.target = '_blank'; 

                const projectName = document.createElement('h3');
                projectName.textContent = project.name;

                projectNameLink.appendChild(projectName);

                const projectDesc = document.createElement('p');
                projectDesc.textContent = project.description;

                const projectLink = document.createElement('a');
                projectLink.href = project.readmeUrl;
                projectLink.target = '_blank';
                projectLink.textContent = 'Ver README |';

                const projectSitio = document.createElement('a');
                projectSitio.href = project.onlinePage;
                projectSitio.target = '_blank';
                projectSitio.textContent = ' | Ver Sitio Web';

                projectCard.appendChild(projectNameLink);
                projectCard.appendChild(projectDesc);
                projectCard.appendChild(projectLink);
                projectCard.appendChild(projectSitio);

                projectsContainer.appendChild(projectCard);
            });
        })
        .catch(error => {
            console.error('Hubo un problema con la operación de fetch:', error);
            const projectsContainer = document.getElementById('projects-container');
            projectsContainer.innerHTML = '<p>No se pudieron cargar los proyectos. Inténtalo de nuevo más tarde.</p>';
        });
});

// Efecto de reducir header al hacer scroll
window.addEventListener('scroll', function() {
    const header = document.querySelector('header');
    if (window.scrollY > 100) { // cuando baja 100px
        header.classList.add('shrink');
    } else {
        header.classList.remove('shrink');
    }
});

// Efecto de scroll para mover la imagen de fondo hasta el footer
window.addEventListener('scroll', function() {
    const scrollTop = window.scrollY;
    const docHeight = document.body.scrollHeight;
    const winHeight = window.innerHeight;
    const footer = document.querySelector('footer');
    const footerTop = footer.offsetTop;

    // Calcula hasta dónde se debe mover el fondo
    const maxScroll = footerTop - winHeight;

    // Limita el movimiento de la imagen al llegar al footer
    const scrollFactor = Math.min(scrollTop / maxScroll, 1);

    // Mueve el fondo suavemente (ajusta el número 200 para más o menos desplazamiento)
    document.body.style.backgroundPosition = `center ${scrollFactor * 100}px`;
});
