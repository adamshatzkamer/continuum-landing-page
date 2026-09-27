import { useState, useEffect, useRef } from "react";

const INVOICE_CARDS = [
  { period: "01 Feb  - 28 Feb 2026", title: "Data Analytics Platform Launch", company: "Data Insights Co.", invoiceId: "INV-2026-03" },
  { period: "01 Mar  - 31 Mar 2026", title: "User Experience Research", company: "Insightful Designs Inc.", invoiceId: "INV-2026-04" },
  { period: "01 Apr  - 30 Apr 2026", title: "Mobile App Development", company: "Tech Innovators LLC", invoiceId: "INV-2026-05" },
  { period: "01 May  - 31 May 2026", title: "Website Revamp Project", company: "Creative Solutions Group", invoiceId: "INV-2026-06" },
  { period: "01 June  - 30 June 2026", title: "Mobile App Development", company: "Tech Innovations LLC", invoiceId: "INV-2026-07" },
  { period: "01 July  - 31 July 2026", title: "E-commerce Platform Launch", company: "Digital Commerce Corp", invoiceId: "INV-2026-08" },
];

const STEP = 126.56;
const ACTIVE_SLOT = 2;
const CARD_COUNT = INVOICE_CARDS.length;
const TRANSITION_MS = 1200;
const STEP_INTERVAL_MS = 3000;
const HIGHLIGHT_DELAY_MS = 80;
const HIGHLIGHT_FADE_MS = 600;
/** How many copies of the card list to chain — higher = longer before seamless reset */
const COPIES = 4;

const BLUE_HEADER =
  "linear-gradient(156.99deg, rgb(36, 181, 248) 123.02%, rgb(85, 33, 254) 802.55%), linear-gradient(90deg, rgb(26, 59, 84) 0%, rgb(26, 59, 84) 100%), linear-gradient(90deg, rgb(252, 249, 243) 0%, rgb(252, 249, 243) 100%)";
const GREY_HEADER =
  "linear-gradient(90deg, rgb(242, 245, 247) 0%, rgb(242, 245, 247) 100%), linear-gradient(90deg, rgb(252, 249, 243) 0%, rgb(252, 249, 243) 100%)";

const ELLIPSIS_D = [
  "M1.98933 4.97067C2.35752 4.97067 2.656 4.67219 2.656 4.304C2.656 3.93581 2.35752 3.63733 1.98933 3.63733C1.62114 3.63733 1.32267 3.93581 1.32267 4.304C1.32267 4.67219 1.62114 4.97067 1.98933 4.97067Z",
  "M6.656 4.97067C7.02419 4.97067 7.32267 4.67219 7.32267 4.304C7.32267 3.93581 7.02419 3.63733 6.656 3.63733C6.28781 3.63733 5.98933 3.93581 5.98933 4.304C5.98933 4.67219 6.28781 4.97067 6.656 4.97067Z",
  "M11.3227 4.97067C11.6909 4.97067 11.9893 4.67219 11.9893 4.304C11.9893 3.93581 11.6909 3.63733 11.3227 3.63733C10.9545 3.63733 10.656 3.93581 10.656 4.304C10.656 4.67219 10.9545 4.97067 11.3227 4.97067Z",
];
const DOWNLOAD_D =
  "M3.96899 4.95902V0.991025M3.96899 4.95902L2.31566 3.30569M3.96899 4.95902L5.62233 3.30569M6.94499 4.95902V6.28169C6.94499 6.45709 6.87532 6.6253 6.75129 6.74932C6.62727 6.87335 6.45906 6.94302 6.28366 6.94302H1.65433C1.47893 6.94302 1.31072 6.87335 1.18669 6.74932C1.06267 6.6253 0.992995 6.45709 0.992995 6.28169V4.95902";

const FADE_TRANSITION = `opacity ${HIGHLIGHT_FADE_MS}ms cubic-bezier(0.4, 0, 0.2, 1)`;
const COLOR_TRANSITION = `color ${HIGHLIGHT_FADE_MS}ms cubic-bezier(0.4, 0, 0.2, 1)`;
const STROKE_TRANSITION = `stroke ${HIGHLIGHT_FADE_MS}ms cubic-bezier(0.4, 0, 0.2, 1)`;

function InvoiceCard({
  data,
  isActive,
  left,
}: {
  data: (typeof INVOICE_CARDS)[0];
  isActive: boolean;
  left: number;
}) {
  const eStroke = isActive ? "white" : "#606D76";
  const dlStroke = isActive ? "#2E98F9" : "#606D76";

  return (
    <div
      className="absolute bg-white rounded-[7.936px] top-0 w-[116.56px]"
      style={{ left: `${left}px` }}
    >
      <div className="content-stretch flex flex-col items-start overflow-clip relative rounded-[inherit] w-full">
        <div className="relative shrink-0 w-full overflow-hidden">
          <div className="absolute inset-0" style={{ backgroundImage: GREY_HEADER }} />
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: BLUE_HEADER,
              opacity: isActive ? 1 : 0,
              transition: FADE_TRANSITION,
            }}
          />
          <div className="content-stretch flex flex-col gap-[11.904px] items-start pb-[7.936px] pl-[11.904px] pr-[7.936px] pt-[11.904px] relative w-full">
            <div className="content-stretch flex items-center justify-between relative shrink-0 w-full">
              <div className="content-stretch flex flex-[1_0_0] items-center min-h-px min-w-px relative">
                <div className="opacity-0 shrink-0 size-[11.904px]" />
              </div>
              <div className="shrink-0 size-[11.904px] flex items-center justify-center">
                <svg className="shrink-0" width="7.936" height="8.608" viewBox="0 0 7.936 8.608" fill="none">
                  {ELLIPSIS_D.map((d, j) => (
                    <path
                      key={j}
                      d={d}
                      stroke={eStroke}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.33333"
                      style={{ transition: STROKE_TRANSITION }}
                    />
                  ))}
                </svg>
              </div>
            </div>
            <div className="content-stretch flex flex-col gap-[7.936px] items-start relative shrink-0 w-full">
              <div className="content-stretch flex flex-col font-['Satoshi:Medium',sans-serif] gap-[1.984px] items-start leading-[normal] not-italic relative shrink-0 text-ellipsis w-full">
                <p
                  className={`overflow-hidden relative shrink-0 text-[5.952px] whitespace-nowrap ${isActive ? "text-white" : "text-[#606d76]"}`}
                  style={{ transition: COLOR_TRANSITION }}
                >
                  Period
                </p>
                <p
                  className={`overflow-hidden relative shrink-0 text-[6.944px] whitespace-pre ${isActive ? "text-white/70" : "text-[rgba(96,109,118,0.62)]"}`}
                  style={{ transition: COLOR_TRANSITION }}
                >
                  {data.period}
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="relative shrink-0 w-full">
          <div className="flex flex-col items-end size-full">
            <div className="content-stretch flex flex-col gap-[9.92px] items-end pb-[11.904px] pt-[9.92px] px-[11.904px] relative w-full">
              <div className="content-stretch flex flex-col gap-[3.968px] items-start leading-[normal] not-italic relative shrink-0 w-full">
                <p className="font-['Satoshi:Medium',sans-serif] relative shrink-0 text-[#0b191f] text-[9.92px] w-full">
                  {data.title}
                </p>
                <p className="font-['Satoshi:Regular',sans-serif] relative shrink-0 text-[#606d76] text-[6.944px] w-full">
                  {data.company}
                </p>
              </div>
              <div className="h-0 relative shrink-0 w-full">
                <div className="absolute inset-[-0.28px_0]">
                  <svg className="block size-full" fill="none" viewBox="0 0 92.752 0.56544">
                    <path d="M0 0.28272H92.752" stroke="#EBEDEE" strokeWidth="0.56544" />
                  </svg>
                </div>
              </div>
              <div className="content-stretch flex items-end justify-between relative shrink-0 w-full">
                <div className="content-stretch flex flex-col font-['Satoshi:Medium',sans-serif] gap-[1.984px] items-start leading-[normal] not-italic relative shrink-0 text-ellipsis whitespace-nowrap">
                  <p className="overflow-hidden relative shrink-0 text-[#727d83] text-[5.952px]">Invoice ID</p>
                  <p className="overflow-hidden relative shrink-0 text-[#0b191f] text-[6.944px]">{data.invoiceId}</p>
                </div>
                <div className="shrink-0 size-[7.936px]">
                  <svg width="7.936" height="7.936" viewBox="0 0 7.936 7.936" fill="none">
                    <path
                      d={DOWNLOAD_D}
                      stroke={dlStroke}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="0.744"
                      style={{ transition: STROKE_TRANSITION }}
                    />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        aria-hidden="true"
        className={`absolute border-[#ebedee] border-solid pointer-events-none ${
          isActive
            ? "border inset-[-1px] rounded-[8.936px] shadow-[0px_218.822px_61.24px_0px_rgba(26,59,84,0),0px_139.658px_56.012px_0px_rgba(26,59,84,0.01),0px_78.417px_47.05px_0px_rgba(26,59,84,0.05),0px_35.101px_35.101px_0px_rgba(26,59,84,0.09),0px_8.962px_19.418px_0px_rgba(26,59,84,0.1)]"
            : "border-[0.496px] inset-0 rounded-[7.936px] shadow-[0px_9px_2px_0px_rgba(26,59,84,0),0px_6px_2px_0px_rgba(26,59,84,0.01),0px_3px_2px_0px_rgba(26,59,84,0.04),0px_1px_1px_0px_rgba(26,59,84,0.06),0px_0px_1px_0px_rgba(26,59,84,0.07)]"
        }`}
      />
    </div>
  );
}

const ALL_CARDS = Array.from({ length: COPIES }, () => INVOICE_CARDS).flat();

// The hook drives the strip below and shares its constants; the rule only affects dev HMR.
// eslint-disable-next-line react-refresh/only-export-components
export function useInvoiceCarousel() {
  const [step, setStep] = useState(0);
  const [highlightStep, setHighlightStep] = useState(0);
  const [withTransition, setWithTransition] = useState(true);
  const resetting = useRef(false);
  const highlightTimerRef = useRef<number | null>(null);

  useEffect(() => {
    const id = setInterval(() => {
      if (resetting.current) return;
      setStep((s) => s + 1);
      setWithTransition(true);
    }, STEP_INTERVAL_MS);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    if (highlightTimerRef.current !== null) {
      window.clearTimeout(highlightTimerRef.current);
      highlightTimerRef.current = null;
    }

    const resetPoint = CARD_COUNT * (COPIES - 1);
    if (step >= resetPoint) {
      resetting.current = true;
      highlightTimerRef.current = window.setTimeout(() => {
        setWithTransition(false);
        setStep(0);
        setHighlightStep(0);
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            resetting.current = false;
          });
        });
        highlightTimerRef.current = null;
      }, TRANSITION_MS + 50);
      return;
    }

    highlightTimerRef.current = window.setTimeout(() => {
      setHighlightStep(step);
      highlightTimerRef.current = null;
    }, HIGHLIGHT_DELAY_MS);

    return () => {
      if (highlightTimerRef.current !== null) {
        window.clearTimeout(highlightTimerRef.current);
        highlightTimerRef.current = null;
      }
    };
  }, [step]);

  const activeIdx = ACTIVE_SLOT + highlightStep;

  return { step, withTransition, allCards: ALL_CARDS, activeIdx };
}

export function InvoiceCardStrip({
  step,
  withTransition,
  allCards,
  activeIdx,
}: ReturnType<typeof useInvoiceCarousel>) {
  return (
    <div
      className="absolute top-0 left-0 h-[160px] will-change-transform"
      style={{
        transform: `translate3d(${-step * STEP}px, 0, 0)`,
        transition: withTransition ? `transform ${TRANSITION_MS}ms cubic-bezier(0.25, 1, 0.5, 1)` : "none",
      }}
    >
      {allCards.map((card, i) => (
        <InvoiceCard
          key={i}
          data={card}
          isActive={i === activeIdx}
          left={i * STEP}
        />
      ))}
    </div>
  );
}
