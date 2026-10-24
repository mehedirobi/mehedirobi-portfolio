import { Suspense, useEffect, useRef, useState } from "react";

function SectionSkeleton() {
  return (
    <div
      aria-hidden="true"
      className="mx-auto grid w-full max-w-6xl gap-4 px-5 py-16 sm:px-6 sm:py-20"
    >
      <div className="mx-auto mb-3 h-8 w-44 animate-pulse rounded-lg bg-surface-raised" />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <div className="h-40 animate-pulse rounded-xl bg-surface" />
        <div className="h-40 animate-pulse rounded-xl bg-surface" />
        <div className="h-40 animate-pulse rounded-xl bg-surface" />
      </div>
    </div>
  );
}

export default function DeferredSection({
  id,
  Component,
  minHeight,
}) {
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(
    () => typeof IntersectionObserver === "undefined"
  );

  useEffect(() => {
    if (isVisible || !sectionRef.current) return undefined;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setIsVisible(true);
        observer.disconnect();
      },
      { rootMargin: "600px 0px" }
    );

    observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, [isVisible]);

  return (
    <div
      id={id}
      ref={sectionRef}
      aria-busy={!isVisible}
      className={minHeight}
    >
      {isVisible ? (
        <Suspense fallback={<SectionSkeleton />}>
          <Component id={null} />
        </Suspense>
      ) : (
        <SectionSkeleton />
      )}
    </div>
  );
}
