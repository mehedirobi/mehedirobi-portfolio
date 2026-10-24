import { Section } from "./UI";

const ABOUT =
  "I'm a MERN Stack Developer passionate about building modern, responsive, and user-focused web applications. I work with MongoDB, Express.js, React.js, and Node.js to develop full-stack solutions, with hands-on experience in RESTful APIs, CRUD operations, Firebase Authentication, protected routes, and database integration. I value clean code, reusable components, maintainable architecture, and thoughtful user experiences. As I continue building real-world projects and strengthening my problem-solving skills, my goal is to grow into a Software Engineer capable of designing and developing reliable, scalable software.";

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

        <p className="text-pretty text-[15px] leading-7 text-muted sm:text-base sm:leading-8">
          {ABOUT}
        </p>
      </div>
    </Section>
  );
}