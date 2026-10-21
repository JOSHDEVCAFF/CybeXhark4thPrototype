const projectsPerPage = 3;
const collections = {
    activities: [
        {
            image: 'activity-example.svg',
            driveUrl: 'https://drive.google.com/drive/folders/15KUec_sw7JPODOV70KwpaCRN8fbVWMdL?usp=sharing'
        },
        {
            image: 'activity-example.svg',
            driveUrl: 'https://drive.google.com/drive/folders/15KUec_sw7JPODOV70KwpaCRN8fbVWMdL?usp=sharing'
        },
        {
            image: 'activity-example.svg',
            driveUrl: 'https://drive.google.com/drive/folders/15KUec_sw7JPODOV70KwpaCRN8fbVWMdL?usp=sharing'
        },
        {
            image: 'activity-example.svg',
            driveUrl: 'https://drive.google.com/drive/folders/15KUec_sw7JPODOV70KwpaCRN8fbVWMdL?usp=sharing'
        }
    ],
    exercises: [
        {
            image: 'exercise-example.svg',
            driveUrl: 'https://drive.google.com/drive/folders/1WTU4pF1YUCuso0rXMhR9sYCL8YKk0miq?usp=sharing'
        },
        {
            image: 'exercise-example.svg',
            driveUrl: 'https://drive.google.com/drive/folders/1WTU4pF1YUCuso0rXMhR9sYCL8YKk0miq?usp=sharing'
        },
        {
            image: 'exercise-example.svg',
            driveUrl: 'https://drive.google.com/drive/folders/1WTU4pF1YUCuso0rXMhR9sYCL8YKk0miq?usp=sharing'
        },
        {
            image: 'exercise-example.svg',
            driveUrl: 'https://drive.google.com/drive/folders/1WTU4pF1YUCuso0rXMhR9sYCL8YKk0miq?usp=sharing'
        }
    ]
};
const pageByCollection = { activities: 0, exercises: 0 };

function renderCollection(name) {
    const projects = collections[name];
    const grid = document.getElementById(`${name}Grid`);
    const emptyMessage = document.getElementById(`${name}Empty`);
    const pageLabel = document.getElementById(`${name}Page`);
    const start = pageByCollection[name] * projectsPerPage;
    const pageCount = Math.ceil(projects.length / projectsPerPage);

    grid.replaceChildren();
    projects.slice(start, start + projectsPerPage).forEach((project, index) => {
        const card = document.createElement('article');
        card.className = 'project-card';

        const image = document.createElement('img');
        image.src = project.image;
        image.alt = `${name === 'activities' ? 'Activity' : 'Exercise'} project preview ${start + index + 1}`;
        image.loading = 'lazy';
        image.decoding = 'async';

        const actions = document.createElement('div');
        actions.className = 'project-card-actions';
        const hasDriveUrl = Boolean(project.driveUrl);
        const link = document.createElement(hasDriveUrl ? 'a' : 'button');
        link.className = 'drive-link';
        link.textContent = hasDriveUrl ? 'View project code' : 'Add Google Drive link';
        if (project.driveUrl) {
            link.href = project.driveUrl;
            link.target = '_blank';
            link.rel = 'noopener noreferrer';
        } else {
            link.type = 'button';
            link.disabled = true;
        }
        actions.appendChild(link);
        card.append(image, actions);
        grid.appendChild(card);
    });

    emptyMessage.hidden = projects.length > 0;
    pageLabel.textContent = pageCount ? `${pageByCollection[name] + 1} / ${pageCount}` : '0 projects';
    document.querySelectorAll(`[data-collection="${name}"]`).forEach((button) => {
        const direction = Number(button.dataset.direction);
        button.disabled = pageCount === 0 ||
            (direction < 0 && pageByCollection[name] === 0) ||
            (direction > 0 && pageByCollection[name] >= pageCount - 1);
    });
}

document.querySelectorAll('.pagination button').forEach((button) => {
    button.addEventListener('click', () => {
        const name = button.dataset.collection;
        const pageCount = Math.ceil(collections[name].length / projectsPerPage);
        pageByCollection[name] = Math.max(
            0,
            Math.min(pageCount - 1, pageByCollection[name] + Number(button.dataset.direction))
        );
        renderCollection(name);
    });
});

Object.keys(collections).forEach(renderCollection);
