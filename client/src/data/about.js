export const aboutData = {
    name: 'Phat Ren',
    role: 'Full-Stack Web Developer',
    openToWork: true,
    // TODO: put your photo at client/public/me.jpg, then use '/me.jpg'
    photo: '../../public/me.png',
    bio: [
      'I am a student at Build Bright University, learning to build complete web applications, from the interface people see to the API and database behind it.',
      'I am looking for my first full-stack web developer role where I can contribute, learn from experienced teammates and keep growing.',
    ],
    stats: [
      { value: 2027, suffix: '', label: 'Graduating (BBU)' },
      { value: 1, suffix: '', label: 'Full-stack project built' },
      { value: 4, suffix: '', label: 'Pages designed' },
    ],
    skillGroups: [
      { title: 'Frontend', items: ['HTML', 'CSS', 'JavaScript', 'React', 'Tailwind CSS'] },
      { title: 'Backend', items: ['Node.js', 'Express', 'PostgreSQL', 'Sequelize', 'REST API'] },
      { title: 'Tools', items: ['Git', 'VS Code', 'Vite', 'npm'] },
    ],
    journey: [
      {
        period: '2024',
        title: 'Started my studies and web development journey',
        place: 'Build Bright University (BBU)',
        text: 'Began studying and learning how to build websites.',
      },
      {
        period: '2024 - 2027',
        title: 'Studying at Build Bright University',
        place: 'Build Bright University (BBU)',
        text: 'Building my foundation while working on full-stack projects.',
      },
      {
        period: 'Now',
        title: 'Looking for a full-stack web developer role',
        place: 'Open to work',
        text: 'Ready to join a team, contribute and learn from experienced developers.',
      },
    ],
  }