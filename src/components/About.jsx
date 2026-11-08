import { Section } from "./UI";

const ABOUT = [
  "I am a Computer Science and Technology diploma graduate with practical experience building frontend and full-stack web applications. I focus on creating responsive interfaces, reliable REST APIs, and user-focused software using JavaScript, React.js, Tailwind CSS, Node.js, Express.js, MongoDB, and Firebase Authentication.",

  "My experience includes reusable UI components, backend logic, database management, authentication, authorization, role-based access control, and CRUD operations. I value clean, maintainable code, performance, usability, and problem-solving, with a strong focus on building reliable, scalable solutions and continuously improving my engineering skills.",
];

export default function About({ id = "about" }) {
  return (
    <Section id={id} aria-labelledby="about-heading">
      <div className="mx-auto max-w-3xl">
        <div className="mb-5 text-center sm:mb-6">
          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-accent">
            Get to Know Me
          </p>

          <h2
            id="about-heading"
            className="text-section font-bold tracking-tight text-strong"
          >
            About Me
          </h2>
        </div>

        <div className="space-y-4 text-pretty text-[15px] leading-7 text-muted sm:text-base sm:leading-8">
          {ABOUT.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      </div>
    </Section>
  );
}