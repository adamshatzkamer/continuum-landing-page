import clsx from "clsx";
import SectionHeader from "@/components/SectionHeader";
import { ArrowRightIcon } from "@/components/LandingIcons";
import { useInView } from "@/hooks/useInView";

const TOOLS = ["Trello", "Jira", "ClickUp", "Asana", "Monday.com", "Notion"];

/** Shared entrance transition for every animated element in this section.
 * Uses the built-in `transition` utility (covers transform, scale, translate
 * and opacity) — an arbitrary `transition-[transform,opacity]` value silently
 * fails to compile in Tailwind v4 because of the comma. */
const REVEAL_BASE = "transition duration-500 ease-out will-change-transform";

function Pill({ label, playing, delay }: { label: string; playing: boolean; delay: number }) {
  return (
    <div
      className={clsx(
        "flex items-center justify-center rounded-[32px] bg-[#edf0f3] px-[16px] py-[6px]",
        playing && "anim-pill-pulse",
      )}
      style={{ animationDelay: `${delay}ms` }}
    >
      <span className="whitespace-nowrap font-['Satoshi:Regular',sans-serif] text-[16px] text-[#606d76]">{label}</span>
    </div>
  );
}

/** "Connect" illustration — tool pills breathe in a continuous staggered wave. */
function ConnectArt({ playing }: { playing: boolean }) {
  return (
    <div className="flex w-[226px] flex-wrap justify-center gap-[8px]">
      {TOOLS.map((t, i) => (
        <Pill key={t} label={t} playing={playing} delay={i * 150} />
      ))}
    </div>
  );
}

/** "Map" illustration — green columns repeatedly grow up from the baseline while the
 * arrow nudges, looping the "mapping happening" beat. Grey source columns stay static. */
function MapArt({ playing }: { playing: boolean }) {
  const greenCol = clsx("w-[18px] rounded-[4px] bg-[#22f26c]", playing && "anim-col-grow");
  return (
    <div className="flex items-center justify-center gap-[8px]">
      <div className="flex items-end gap-[8px]">
        <div className="h-[58px] w-[18px] rounded-[4px] bg-[#edf0f3]" />
        <div className="h-[63px] w-[18px] rounded-[4px] bg-[#edf0f3]" />
      </div>
      <span className={clsx("flex text-[#0b191f]", playing && "anim-arrow-nudge")}>
        <ArrowRightIcon className="text-[#0b191f]" size={16} />
      </span>
      <div className="flex items-end gap-[8px]">
        <div className={clsx("h-[58px]", greenCol)} />
        <div className={clsx("h-[63px]", greenCol)} style={{ animationDelay: "300ms" }} />
      </div>
    </div>
  );
}

function KanbanColumn({ height, cards, playing, delay }: { height: number; cards: number; playing: boolean; delay: number }) {
  return (
    <div
      className="flex w-[22px] flex-col items-start gap-[2px] rounded-[2px] bg-[#f0f3f5] px-[2px] pt-[2px]"
      style={{ height }}
    >
      {Array.from({ length: cards }).map((_, i) => (
        <div
          key={i}
          className={clsx("h-[7px] w-full rounded-[1px] bg-[#cdd2d5]", playing && "anim-card-cycle")}
          // cards cycle in as a top-to-bottom wave across the board
          style={{ animationDelay: `${delay + i * 200}ms` }}
        />
      ))}
    </div>
  );
}

/** "Run" illustration — kanban cards continuously cycle in, like work flowing through the board. */
function RunArt({ playing }: { playing: boolean }) {
  return (
    <div className="flex items-end justify-center gap-[8px]">
      <KanbanColumn height={61} cards={2} playing={playing} delay={0} />
      <KanbanColumn height={51} cards={3} playing={playing} delay={150} />
      <KanbanColumn height={61} cards={2} playing={playing} delay={300} />
    </div>
  );
}

const STEPS: { title: string; body: string; art: (playing: boolean) => React.ReactNode }[] = [
  { title: "Connect", body: "Import your board. Your structure comes with it.", art: (p) => <ConnectArt playing={p} /> },
  { title: "Map", body: "Columns, labels, assignees transfer automatically.", art: (p) => <MapArt playing={p} /> },
  { title: "Run", body: "First sprint live. Same structure, better visibility.", art: (p) => <RunArt playing={p} /> },
];

const CARD_SHADOW =
  "shadow-[0px_39px_5.5px_0px_rgba(181,181,181,0),0px_25px_5px_0px_rgba(181,181,181,0.04),0px_14px_4px_0px_rgba(181,181,181,0.12),0px_6px_3px_0px_rgba(181,181,181,0.2),0px_2px_1.5px_0px_rgba(181,181,181,0.24)]";

function StepCard({
  title,
  body,
  art,
  inView,
  delay,
}: (typeof STEPS)[number] & { inView: boolean; delay: number }) {
  return (
    <div
      className={clsx(
        "flex flex-1 flex-col items-center justify-between gap-[20px] rounded-[8px] bg-white p-[20px]",
        CARD_SHADOW,
        REVEAL_BASE,
        inView ? "translate-y-0 scale-100 opacity-100" : "translate-y-6 scale-[0.97] opacity-0",
      )}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div className="flex min-h-[100px] flex-1 items-center justify-center">{art(inView)}</div>
      <div className="flex w-full flex-col items-center gap-[8px] text-center">
        <p className="font-['Satoshi:Medium',sans-serif] text-[20px] leading-[30px] text-[#0b191f]">{title}</p>
        <p className="font-['Satoshi:Regular',sans-serif] text-[16px] leading-[24px] text-[#606d76]">{body}</p>
      </div>
    </div>
  );
}

export type MigrationSectionProps = {
  variant: "desktop" | "mobile";
  className?: string;
};

export default function MigrationSection({ variant, className }: MigrationSectionProps) {
  const isMobile = variant === "mobile";
  const { ref, inView } = useInView<HTMLElement>({ threshold: 0.2 });

  return (
    <section
      id="migration"
      ref={ref}
      data-name="Migration"
      className={clsx(
        "flex w-full flex-col items-center",
        isMobile ? "gap-[40px]" : "py-[96px]",
        className,
      )}
    >
      <div
        className={clsx(
          "flex w-full flex-col",
          isMobile ? "gap-[40px]" : "max-w-[1164px] gap-[64px] px-[32px]",
        )}
      >
        <SectionHeader
          variant={variant}
          size="lg"
          label="Migration"
          reveal={inView}
          heading={
            <>
              You've heard "easy migration" before.
              <br />
              This one's different.
            </>
          }
          body="No forced cutover. Your team works in both tools until the switch is done. Zero configuration tax — your first sprint can be live in under an hour."
        />

        <div
          className={clsx(
            "flex w-full gap-[16px]",
            isMobile ? "flex-col" : "items-stretch",
          )}
        >
          {STEPS.map((s, i) => (
            <StepCard key={s.title} {...s} inView={inView} delay={260 + i * 120} />
          ))}
        </div>
      </div>
    </section>
  );
}
