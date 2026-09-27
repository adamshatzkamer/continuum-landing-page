import clsx from "clsx";
import SectionHeader from "@/components/SectionHeader";

const ICON = "/landing/continuum-ai";

const CARDS: { icon: string; title: string; body: string }[] = [
  {
    icon: `${ICON}/icon-command.svg`,
    title: "Admin",
    body: "Full control over projects, billing, team, and audit logs. Set roles in minutes” no sysadmin needed.",
  },
  {
    icon: `${ICON}/icon-zap.svg`,
    title: "Member",
    body: "Works in assigned sprints, logs time, moves tasks. Sees only what's relevant to their work.",
  },
  {
    icon: `${ICON}/icon-bar-chart.svg`,
    title: "Repository AI Indexing",
    body: "Read-only. Milestones and delivery status” a polished view, never the raw sprint board.",
  },
  {
    icon: `${ICON}/icon-shield-check.svg`,
    title: "Encrypted by Default",
    body: "Your credentials and sensitive data are encrypted and never stored in plain text, so what's private stays private.",
  },
];

const CARD_SHADOW =
  "shadow-[0px_39px_5.5px_0px_rgba(181,181,181,0),0px_25px_5px_0px_rgba(181,181,181,0.04),0px_14px_4px_0px_rgba(181,181,181,0.12),0px_6px_3px_0px_rgba(181,181,181,0.2),0px_2px_1.5px_0px_rgba(181,181,181,0.24)]";

function Card({ icon, title, body }: (typeof CARDS)[number]) {
  return (
    <div className={clsx("flex flex-col items-start gap-[20px] rounded-[8px] bg-white p-[20px]", CARD_SHADOW)}>
      <div className="relative size-[48px] shrink-0 rounded-[24px] bg-[#cfecff]">
        <div className="absolute left-[12px] top-[12px] size-[24px] overflow-clip">
          <img alt="" className="block size-full max-w-none" src={icon} />
        </div>
      </div>
      <div className="flex w-full flex-col items-start gap-[8px] not-italic">
        <p className="w-full font-['Satoshi:Medium',sans-serif] text-[20px] leading-[30px] text-[#0b191f]">{title}</p>
        <p className="w-full font-['Satoshi:Regular',sans-serif] text-[16px] leading-[24px] text-[#606d76]">{body}</p>
      </div>
    </div>
  );
}

export type SecuritySectionProps = {
  variant: "desktop" | "mobile";
  className?: string;
};

export default function SecuritySection({ variant, className }: SecuritySectionProps) {
  const isMobile = variant === "mobile";

  return (
    <section
      id="security"
      data-name="Security & compliance"
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
          label="Security & Compliance"
          heading={
            <>
              Built for teams that can't afford
              <br />
              to get security wrong.
            </>
          }
          body="POPIA compliance isn't a checkbox added after the fact. It's built into how Continuum stores, logs, and manages your data” so your legal team has what they need before they ask."
        />

        <div
          className={clsx(
            "grid w-full gap-[16px]",
            isMobile ? "grid-cols-1" : "grid-cols-2",
          )}
        >
          {CARDS.map((c, i) => (
            <Card key={c.title + i} {...c} />
          ))}
        </div>
      </div>
    </section>
  );
}
