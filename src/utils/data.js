// ============================================================
// Build & Scale 2026 — Shared Data
// Replace placeholder content with real data as it becomes available
// ============================================================

export const CONFERENCE_DATE = new Date('2026-05-30T09:00:00');

export const SPEAKERS = [
  {
    id: 1,
    name: 'Adaeze Okafor',
    title: 'CEO & Founder',
    organisation: 'Nexus Ventures Nigeria',
    session: 'Keynote Address I',
    bio: 'Built one of Southeast Nigeria\'s fastest growing tech investment firms from a university dorm room. Adaeze brings 12 years of building experience to the stage.',
    image: null, // Replace with actual image URL
    initials: 'AO',
  },
  {
    id: 2,
    name: 'Chukwuemeka Eze',
    title: 'Serial Entrepreneur',
    organisation: 'Eze Group of Companies',
    session: 'Keynote Address II',
    bio: 'Started his first business at 19. Today he runs four companies employing over 200 Nigerians. Chukwuemeka speaks on discipline, execution, and personal responsibility.',
    image: null,
    initials: 'CE',
  },
  {
    id: 3,
    name: 'Olaedo Unah',
    title: 'The Legal Storyteller',
    organisation: 'Godfrey Okoye University',
    session: 'Workshop Session I',
    bio: "Olaedo Unah is a Law student, an Associate Arbitrator with the Nigerian Institute of Chartered Arbitrators, and a visual storyteller, working at the intersection of law, media, and education. She is the creative force behind GGG Media, a visual production brand, and the founder of TheBlackNWhite, a platform that uses video content to simplify legal concepts. Notably, she produced the first documentary style tour video of Godfrey Okoye University's main campus. Olaedo continues to build a distinctive path, using filmmaking as a tool for education, storytelling, and impact, She represents a new generation of young professionals, driven, versatile, and committed to excellence across multiple fields. From Ebonyi State, Nigeria, she is passionate about youth development and envisions a society where young people are confident, disciplined, and driven to pursue their dreams regardless of their circumstances.",
    image: '/images/olaedo.JPEG',
    initials: 'OU',
  },
  {
    id: 4,
    name: 'Obi Ugochukwu Confidence',
    title: 'Community Builder & Public Voice',
    organisation: 'Godfrey Okoye University',
    session: 'Workshop Session II',
    bio: "Obi Ugochukwu confidence a native of isialangwa North LGA of Abia State. Born in a family of 4 as the first Son was ordained a leader, with wisdom bestowed from above he has lead multitudes where ever he has found himself there fore he has built himself a solid leadership portfolio he was nicknamed (Obi for president) amongst his peers being an athlete he is the one time runner up of the GOUNI marathon and the captain of his level football team led them to several victories. The man is a computer scientist but has an undying love for philosophy and psychology and believes in human communication and is also building an active career in public speaking truly He knows no bounds. He has impacted so many with his bold voice and clearly he is not slowing down any soon. See you all at the top.",
    image: "/images/obi.JPEG",
    initials: 'OU',
  },
  {
    id: 5,
    name: 'Ifeoma Nwosu',
    title: 'Social Impact Builder',
    organisation: 'Build Southeast Initiative',
    session: 'Panel Discussion',
    bio: 'Ifeoma built a community development organisation that now serves over 5,000 young people across Enugu and Anambra states, starting with nothing but a vision and a notebook.',
    image: null,
    initials: 'IN',
  },
  {
    id: 6,
    name: 'Obinna Okeke',
    title: 'Lead Mentor',
    organisation: 'Godfrey Okoye Alumni Network',
    session: 'Closing Keynote',
    bio: 'A proud GO University alumnus who returned to give back. Obinna delivers the closing challenge: a raw, honest call to action for every student in the room.',
    image: null,
    initials: 'OO',
  },
];

export const PROGRAMME = [
  { time: '8:00 AM', title: 'Registration & Welcome', desc: 'Attendees arrive, register, and receive conference materials. Networking begins.', type: 'logistics' },
  { time: '9:00 AM', title: 'Opening Ceremony', desc: 'Welcome address, institutional remarks, and setting the tone for the day.', type: 'ceremony' },
  { time: '9:30 AM', title: 'Keynote Address I', desc: 'Opening keynote: a real story of going from idea to impact.', type: 'keynote' },
  { time: '10:30 AM', title: 'Workshop Session I: Build', desc: 'Hands on session on foundations: idea validation, structure, and systems.', type: 'workshop' },
  { time: '12:00 PM', title: 'Keynote Address II', desc: 'High energy midday keynote on discipline, execution, and personal responsibility.', type: 'keynote' },
  { time: '1:00 PM', title: 'Lunch Break & Networking', desc: 'Structured lunch break with peer networking and informal conversations with speakers.', type: 'break' },
  { time: '2:00 PM', title: 'Workshop Session II: Scale', desc: 'Practical session on growth, sustainability, and taking initiatives beyond the classroom.', type: 'workshop' },
  { time: '3:30 PM', title: 'Panel Discussion', desc: 'Experienced builders answer audience questions on real challenges in building and scaling.', type: 'panel' },
  { time: '4:30 PM', title: 'Closing Keynote & Call to Action', desc: 'Final address challenging every attendee to leave and build. Not tomorrow, but now.', type: 'keynote' },
  { time: '5:00 PM', title: 'Awards, Certificates & Close', desc: 'Recognition of participants, certificate distribution, and official close of conference.', type: 'ceremony' },
];

export const FAQS = [
  {
    question: 'Is the conference free to attend?',
    answer: 'Yes. Build & Scale 2026 is completely free for all registered attendees. All you need to do is register your seat in advance to secure your place, as spaces are limited.',
  },
  {
    question: 'Who can attend Build & Scale 2026?',
    answer: 'The conference is open to university students (100 to 400 Level), senior secondary school students, and aspiring entrepreneurs or innovators. If you have a dream you want to build on, this conference is for you.',
  },
  {
    question: 'Where exactly is the venue?',
    answer: 'The conference will be held at the Peter Mbah Law Auditorium, Godfrey Okoye University, Enugu. Registration opens at 8:00 AM on Friday, 30th May 2026.',
  },
  {
    question: 'Will certificates be issued?',
    answer: 'Yes. All registered attendees who are present at the conference will receive a certificate of participation at the close of the event.',
  },
  {
    question: 'Can students from other universities attend?',
    answer: 'Absolutely. Build & Scale 2026 is not limited to Godfrey Okoye University students. Students from any institution in Enugu and beyond are welcome to register and attend.',
  },
  {
    question: 'Will there be refreshments on the day?',
    answer: 'Yes. Light refreshments will be provided during the lunch break and at designated snack breaks throughout the day.',
  },
  {
    question: 'How do I confirm my registration?',
    answer: 'Once you submit your registration form, you will receive a confirmation message. Please keep this safe, as you may be asked to present it at the check-in desk on event day.',
  },
  {
    question: 'What should I bring on the day?',
    answer: 'Come with an open mind, a notebook, and something to write with. If you have a business idea or project you are working on, feel free to bring notes. The workshops are practical and interactive.',
  },
];

export const STATS = [
  { value: 100, suffix: '+', label: 'Expected Attendees' },
  { value: 1, suffix: '', label: 'Day of Impact' },
  { value: 8, suffix: '+', label: 'Expert Speakers' },
  { value: 4, suffix: '', label: 'Sessions' },
];
