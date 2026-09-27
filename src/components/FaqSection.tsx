import { useState } from "react";
import clsx from "clsx";
import SectionHeader from "@/components/SectionHeader";
import { ChevronRightIcon } from "@/components/LandingIcons";

const TABS = [
  "Security & Access Control",
  "Migration",
  "Scaleability & Pricing",
  "Getting Started",
];

type Faq = { question: string; answer?: string };

const FAQS_BY_TAB: Faq[][] = [
  [
    {
      question: "Is Continuum POPIA compliant?",
      answer:
        "Yes. Continuum is built with South Africa's Protection of Personal Information Act (POPIA) in mind. Our Privacy Policy explains how we collect, use, and protect personal information, your rights under POPIA, and how to reach our Information Officer at info@joincontinuum.co.za. We apply appropriate technical and organisational safeguards, including encryption in transit, role-based access controls, and retention practices aligned with POPIA.",
    },
    {
      question: "Who can see my team's sprint board?",
      answer:
        "Only people you explicitly invite to a project can access its workspace. Sprint boards and Kanban views require project membership and the right permissions. Clients and view-only members get a separate, curated experience: milestones, progress summaries, and sanitized activity, not internal diagnostics like raw sprint boards, team hours, or health scores. Every request is authenticated and checked against project membership before any data is returned.",
    },
    {
      question: "Can I control what each team member sees and accesses?",
      answer:
        "Yes. Continuum uses role-based access control (RBAC) with packaged roles: Owner, Project Manager, Developer, Client, View Only, Finance, Sales, and Marketing. Owners and project managers can invite members, assign roles, and customise permission bundles per project, including fine-grained controls over sprint views, task editing, time logging, invoicing, and team visibility. Members only see what their role allows.",
    },
    {
      question: "Where is my data hosted, and who at Continuum can access it?",
      answer:
        "Production data runs on managed cloud infrastructure, PostgreSQL and application services deployed via Railway. Access to production systems is limited to authorised Continuum staff who need it for operations and support. We do not sell your personal information. Third-party operators (hosting, payments, email) process data under written agreements with appropriate safeguards. Sensitive credentials such as OAuth tokens and client API keys are stored encrypted or hashed, never in plaintext.",
    },
  ],
  [
    {
      question: "Which project management tools can I import from?",
      answer:
        "You can import from Jira (CSV export), Trello (JSON export), and Asana (CSV export). Continuum also accepts generic CSV files when your tool exports task data as a spreadsheet. The import wizard auto-detects the source format, or you can pick it manually for heavily customised exports.",
    },
    {
      question: "Do I have to stop using my current tool before migrating?",
      answer:
        "No. There is no forced cutover. Many teams run both tools in parallel until the switch feels right. Your existing board stays live while you upload an export, preview the import in Continuum, adjust mappings, and apply only when you are ready.",
    },
    {
      question: "What happens to my columns, labels, and assignees?",
      answer:
        "Columns map to Continuum Kanban boards, and labels and priorities carry over through the mapping step. Assignees transfer where the export includes them. Before anything is created, you preview the full import and adjust status, priority, and milestone mappings. For exports without native sprints (Trello, Asana, generic CSV), Continuum can optionally group tasks into milestones automatically.",
    },
    {
      question: "Can I preview the import before anything is created?",
      answer:
        "Yes. Migration follows three steps: upload your export, preview and tweak mappings, then apply. Nothing is written to your workspace until you confirm on the apply step. You can review warnings, skip completed tasks, and choose to create a new project or target an existing one.",
    },
  ],
  [
    { question: "How does Continuum pricing work?" },
    { question: "Is there a free trial available?" },
    { question: "How does pricing scale as my team grows?" },
    { question: "Are there limits on projects or team members?" },
  ],
  [
    {
      question: "How do I get started with Continuum?",
      answer:
        "Join the waitlist on this page. When access opens, you create an account and move through a short onboarding flow tailored to how you plan to use Continuum, whether for work, personal projects, or school.",
    },
    {
      question: "What does onboarding look like?",
      answer:
        "After sign-up, you answer a few questions about your usage, collaboration style, and role. Continuum tailors your workspace from there and offers a guided tour of essentials like creating a project, inviting your team, and navigating the sprint board.",
    },
    {
      question: "How quickly can my team be running their first sprint?",
      answer:
        "Most teams can have a first sprint live in under an hour. Create a project, invite members with the right roles, and either build your board from scratch or import an existing one from Jira, Trello, or Asana. Connecting GitHub is optional but unlocks commit tracking and code intelligence.",
    },
    {
      question: "Do I need technical setup before inviting my team?",
      answer:
        "No heavy setup is required. The project owner creates the project and sends email invitations, each person gets a role (Project Manager, Developer, Client, View Only, and others) that controls what they see. Integrations like GitHub can be connected from project settings whenever your team is ready.",
    },
  ],
];

// Questions without answer copy yet (the pricing tab) are hidden, and so is any tab
// left empty, so no accordion item expands to nothing. Add the answer to show it.
const VISIBLE_TABS = TABS.map((label, i) => ({
  label,
  faqs: (FAQS_BY_TAB[i] ?? []).filter((faq) => faq.answer),
})).filter((tab) => tab.faqs.length > 0);

export type FaqSectionProps = {
  variant: "desktop" | "mobile";
  className?: string;
};

export default function FaqSection({ variant, className }: FaqSectionProps) {
  const isMobile = variant === "mobile";
  const [activeTab, setActiveTab] = useState(0);
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const faqs = VISIBLE_TABS[activeTab]?.faqs ?? [];

  return (
    <section
      id="faq"
      data-name="FAQ"
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
          label="FAQ"
          heading="Frequently asked questions"
          body="Answers to common questions about security, migration, and getting started with Continuum."
        />

        <div className="flex w-full flex-col gap-[24px]">
          {/* Category tabs */}
          <div className={clsx("flex gap-[8px]", isMobile && "overflow-x-auto pb-1 scrollbar-hide")}>
            {VISIBLE_TABS.map(({ label: tab }, i) => {
              const active = i === activeTab;
              return (
                <button
                  key={tab}
                  type="button"
                  onClick={() => {
                    setActiveTab(i);
                    setOpenIndex(null);
                  }}
                  className={clsx(
                    "flex h-[40px] shrink-0 items-center rounded-[8px] border-l-[2px] px-[16px] py-[8px] font-['Satoshi:Medium',sans-serif] text-[14px] transition-colors",
                    active
                      ? "border-[#24b5f8] bg-[#24b5f8] text-white"
                      : "border-transparent bg-[#edf0f3] text-[#606d76]",
                  )}
                >
                  {tab}
                </button>
              );
            })}
          </div>

          {/* Accordion */}
          <div className="flex w-full flex-col overflow-hidden rounded-[24px] border border-[#ebedee]">
            {faqs.map((faq, i) => {
              const open = openIndex === i;
              return (
                <div key={faq.question} className={clsx(i > 0 && "border-t border-[#ebedee]")}>
                  <button
                    type="button"
                    aria-expanded={open}
                    onClick={() => setOpenIndex(open ? null : i)}
                    className="flex w-full items-center gap-[8px] px-[24px] py-[16px] text-left"
                  >
                    <ChevronRightIcon
                      className={clsx("shrink-0 text-[#606d76] transition-transform", open && "rotate-90")}
                      size={24}
                    />
                    <span className="font-['Satoshi:Regular',sans-serif] text-[16px] leading-[26px] text-[#151515]">
                      {faq.question}
                    </span>
                  </button>
                  {open && faq.answer && (
                    <p className="px-[24px] pb-[16px] pl-[56px] font-['Satoshi:Regular',sans-serif] text-[16px] leading-[26px] text-[#606d76]">
                      {faq.answer}
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
