import clsx from "clsx";
import SectionHeader from "@/components/SectionHeader";
import { PrimaryButton } from "@/components/PrimaryButton";
import {
  ArrowLeftIcon,
  CalendarIcon,
  ChevronDownIcon,
  LinkIcon,
  XIcon,
} from "@/components/LandingIcons";

const LINK_GRADIENT =
  "linear-gradient(165.95deg, rgb(36, 181, 248) 4.62%, rgb(85, 33, 254) 148.53%)";

type Person = {
  initials: string;
  line1: string;
  line2: string;
  role: string;
};

const PEOPLE: Person[] = [
  { initials: "A", line1: "amushiringani@gmail.com", line2: "Pending", role: "Project Manager" },
  { initials: "JH", line1: "Amukelani Shiringani", line2: "amushiringani@gmail.com", role: "Project Manager" },
  { initials: "MK", line1: "Mandla Khumalo", line2: "mandlak@growthhub.com", role: "Lead Developer" },
  { initials: "SN", line1: "Sipho Ndlovu", line2: "sipho.ndlovu@creativeco.co.za", role: "UX Designer" },
];

const ROLES: { title: string; body: string }[] = [
  {
    title: "Owner",
    body: "Full control over projects, billing, team, and audit logs. Set roles in minutes as needed.",
  },
  {
    title: "Member",
    body: "Works in assigned sprints, logs time, moves tasks. Sees only what's relevant to their work.",
  },
  {
    title: "Continuum AI",
    body: "Read-only by default. Handles planning, task drafting, and status updates in the background, enough context to help, without changing what's on the sprint board.",
  },
];

function PersonRow({ initials, line1, line2, role }: Person) {
  return (
    <div className="flex items-center gap-[8px] overflow-hidden rounded-[8px] pr-[8px]">
      <div className="flex size-[32px] shrink-0 items-center justify-center rounded-full border-[1.333px] border-white bg-[#e19c02]">
        <span className="font-['Satoshi:Medium',sans-serif] text-[12px] text-white">{initials}</span>
      </div>
      <div className="flex min-w-0 flex-1 flex-col px-[8px] py-[6px]">
        <p className="truncate font-['Satoshi:Medium',sans-serif] text-[16px] text-[#0b191f]">{line1}</p>
        <p className="truncate font-['Satoshi:Medium',sans-serif] text-[12px] text-[#727d83]">{line2}</p>
      </div>
      <div className="flex shrink-0 items-center gap-[4px] rounded-[16px] bg-[#f0f3f5] px-[12px] py-[4px]">
        <span className="whitespace-nowrap font-['Satoshi:Medium',sans-serif] text-[14px] text-[#606d76]">{role}</span>
      </div>
      <ChevronDownIcon className="shrink-0 text-[#606d76]" size={16} />
    </div>
  );
}

function ShareProjectCard({ variant }: { variant: "desktop" | "mobile" }) {
  const padX = variant === "mobile" ? "px-[20px]" : "px-[36px]";

  return (
    <div
      className={clsx(
        "overflow-hidden rounded-[16px] border border-[#f5f5f5] bg-white shadow-[0px_39px_5.5px_0px_rgba(181,181,181,0),0px_25px_5px_0px_rgba(181,181,181,0.04),0px_14px_4px_0px_rgba(181,181,181,0.12),0px_6px_3px_0px_rgba(181,181,181,0.2),0px_2px_1.5px_0px_rgba(181,181,181,0.24)]",
        variant === "mobile" ? "w-full" : "w-[600px] shrink-0",
      )}
    >
      {/* Header bar */}
      <div className={clsx("flex items-center justify-between border-b border-[#f5f5f5] bg-[#f9f9f9] py-[16px]", padX)}>
        <ArrowLeftIcon className="text-[#252014]" size={20} />
        <p className="font-['Satoshi:Medium',sans-serif] text-[16px] tracking-[-0.16px] text-[#595959]">
          Share this project
        </p>
        <XIcon className="text-[#252014]" size={16} />
      </div>

      {/* Body */}
      <div className={clsx("flex flex-col gap-[24px] bg-white py-[24px]", padX)}>
        {/* Invite row */}
        <div className="flex flex-wrap items-stretch gap-[8px]">
          <label className="flex min-w-[150px] flex-1 items-center justify-between gap-2 rounded-[8px] border border-[#e9e9e9] bg-white px-[16px] py-[12px]">
            <span className="sr-only">Email address</span>
            <input
              type="email"
              placeholder="Email address"
              className="w-full bg-transparent font-['Satoshi:Medium',sans-serif] text-[16px] text-[#0b191f] outline-none placeholder:text-[#606d76]"
            />
            <CalendarIcon className="hidden shrink-0 text-[#252014]" size={16} />
          </label>
          <div className="flex min-w-[120px] flex-1 items-center justify-between gap-2 rounded-[8px] border border-[#e9e9e9] bg-white px-[16px] py-[12px]">
            <span className="font-['Satoshi:Medium',sans-serif] text-[16px] text-[#0b191f]">Developer</span>
            <ChevronDownIcon className="shrink-0 text-[#252014]" size={16} />
          </div>
          <PrimaryButton type="button" className="py-[10px]" containerClassName="shrink-0">
            Invite
          </PrimaryButton>
        </div>

        {/* Who has access */}
        <div className="flex flex-col gap-[16px]">
          <p className="font-['Satoshi:Medium',sans-serif] text-[16px] text-[#0b191f]">Who has access</p>
          {PEOPLE.map((p) => (
            <PersonRow key={p.initials + p.line1} {...p} />
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className={clsx("flex items-center justify-end border-t border-[#ebedee] bg-white py-[16px]", padX)}>
        <button
          type="button"
          className="flex h-[32px] items-center gap-[8px] rounded-[8px] bg-white px-[16px] py-[8px]"
        >
          <LinkIcon className="text-[#24b5f8]" size={16} />
          <span
            className="bg-clip-text font-['Satoshi:Medium',sans-serif] text-[14px] text-transparent"
            style={{ backgroundImage: LINK_GRADIENT }}
          >
            Copy link
          </span>
        </button>
      </div>
    </div>
  );
}

function RoleList({ variant }: { variant: "desktop" | "mobile" }) {
  return (
    <div
      className={clsx(
        "flex flex-col gap-[32px]",
        variant === "mobile" ? "w-full" : "w-[345px] shrink-0",
      )}
    >
      {ROLES.map((r) => (
        <div key={r.title} className="flex flex-col gap-[8px]">
          <p className="font-['Satoshi:Medium',sans-serif] text-[20px] leading-[30px] text-[#0b191f]">{r.title}</p>
          <p className="font-['Satoshi:Regular',sans-serif] text-[16px] leading-[24px] text-[#606d76]">{r.body}</p>
        </div>
      ))}
    </div>
  );
}

export type AccessControlSectionProps = {
  variant: "desktop" | "mobile";
  className?: string;
};

export default function AccessControlSection({ variant, className }: AccessControlSectionProps) {
  const isMobile = variant === "mobile";

  return (
    <section
      id="access-control"
      data-name="Access control"
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
          size="xl"
          label="Access control"
          heading={
            <>
              Your clients see progress.
              <br />
              Not your process.
            </>
          }
          body="Packaged roles. No configuration overhead. Owners run the show, members stay focused, and clients get a curated view of milestones, nothing behind the curtain."
        />

        <div
          className={clsx(
            "flex w-full",
            isMobile ? "flex-col gap-[40px]" : "items-start justify-between gap-[32px]",
          )}
        >
          <ShareProjectCard variant={variant} />
          <RoleList variant={variant} />
        </div>
      </div>
    </section>
  );
}
