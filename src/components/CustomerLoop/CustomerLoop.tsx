import React from "react";
import "../../styles/index.css";

type Logo = { src: string; alt: string; href?: string };

type Props = {
  emphasis?: React.ReactNode;
  rest?: React.ReactNode;
  logos: Logo[];
  speed?: number;          // segundos
  logoHeight?: number;     // px
  grayscale?: boolean;
  titleOverride?: React.ReactNode;
  className?: string;
};

export default function CustomerLoop({
  emphasis = "+100 empresas",
  rest = "estão prosperando no Thor",
  logos,
  speed = 28,
  logoHeight = 44,
  grayscale = true,
  titleOverride,
  className,
}: Props) {
  const loop = React.useMemo(() => [...logos, ...logos], [logos]);

  return (
    <section
      className={`bg-white text-ink-900 pt-[28px] pb-[8px] ${className ?? ""}`}
    >
      <div className="u-container">
        <header className="text-center mb-[18px]" aria-live="polite">
          {titleOverride ?? (
            <h2
              className="m-0 text-center font-extrabold tracking-[.01em] leading-[1.2] text-[clamp(1.25rem,1rem_+_1.6vw,2rem)] text-[#24265f]"  
            >
              <span className="c-highlight text-[#24265f]">{emphasis}</span>{" "}
              <span className="opacity-95 text-[#24265f]">{rest}</span>
            </h2>
          )}
        </header>

        <div
          className={`cm-viewport u-fade-mask select-none relative overflow-hidden py-[18px] ${
            grayscale ? "is-grayscale" : ""
          }`}
          aria-label="Marcas e clientes"
        >
          <ul
            className="cm-track flex items-center gap-12 w-max"
            style={{ ["--cm-duration" as any]: `${speed}s` }}
            role="list"
          >
            {loop.map((logo, i) => {
              const Img = (
                <img src={logo.src} alt={logo.alt} style={{ maxHeight: `${logoHeight}px` }} className={`block h-auto max-w-[140px] opacity-90 transition group-hover:opacity-100 group-hover:-translate-y-px`} loading="lazy"/>
              );
              return (
                <li key={`${logo.alt}-${i}`} className="cm-item flex-none group" role="listitem">
                  {logo.href ? (
                    <a href={logo.href} target="_blank" rel="noopener noreferrer" aria-label={logo.alt} className="inline-flex cm-link" >
                        {Img}
                    </a>
                  ) : (
                    Img
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
