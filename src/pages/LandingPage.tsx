import React, { useState, useEffect, useRef } from "react";
import clsx from "clsx";
import { toast } from "sonner";
import {
  postWaitlistSignup,
  isValidWaitlistEmail,
  waitlistErrorMessage,
  WAITLIST_INVALID_EMAIL_MESSAGE,
} from "@/api/waitlist";
import { playWaitlistSuccessSound } from "@/lib/playWaitlistSuccessSound";
import { scrollToWaitlist } from "@/lib/scrollToWaitlist";
import { PrimaryButton } from "@/components/PrimaryButton";
import svgPaths from "./landing-svg";
import { useInvoiceCarousel, InvoiceCardStrip } from "@/components/InvoiceCardCarousel";
import ContinuumAiFeatures from "@/components/ContinuumAiFeatures";
import AccessControlSection from "@/components/AccessControlSection";
import ContinuumAiHero from "@/components/ContinuumAiHero";
import SecuritySection from "@/components/SecuritySection";
import MigrationSection from "@/components/MigrationSection";
import FaqSection from "@/components/FaqSection";

function LandingWaitlistForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading">("idle");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const trimmed = email.trim();
    if (!isValidWaitlistEmail(trimmed)) {
      toast.error(WAITLIST_INVALID_EMAIL_MESSAGE);
      return;
    }
    setStatus("loading");
    try {
      await postWaitlistSignup(trimmed);
      playWaitlistSuccessSound();
      toast.success("You've been added to the list, check your email to confirm");
      setEmail("");
      setStatus("idle");
    } catch (err) {
      toast.error(waitlistErrorMessage(err));
      setStatus("idle");
    }
  }

  return (
    <form
      className="content-stretch flex flex-col gap-[8px] items-center relative shrink-0 w-[476px]"
      onSubmit={handleSubmit}
      noValidate
    >
      <div className="content-stretch flex gap-[8px] items-start relative shrink-0 w-full">
        <div className="bg-white flex-[1_0_0] h-[40px] min-h-px min-w-px relative rounded-[8px]" data-name="Component 27">
          <div
            aria-hidden="true"
            className="absolute border border-[#e9e9e9] border-solid inset-0 pointer-events-none rounded-[8px] shadow-[0px_7.928px_17.177px_0px_rgba(26,59,84,0.1)]"
          />
          <label className="flex flex-row items-center size-full cursor-text">
            <span className="sr-only">Email address</span>
            <input
              type="email"
              name="email"
              required
              autoComplete="email"
              placeholder="Email address"
              value={email}
              onChange={(ev) => setEmail(ev.target.value)}
              disabled={status === "loading"}
              className="w-full h-full bg-transparent border-0 outline-none rounded-[8px] px-[16px] py-[8px] font-['Satoshi:Medium',sans-serif] text-[14px] text-[#252014] placeholder:text-[#606d76] disabled:opacity-70"
            />
          </label>
        </div>
        <div className="content-stretch flex h-[40px] items-center relative shrink-0">
          <PrimaryButton type="submit" size="md" disabled={status === "loading"}>
            {status === "loading" ? "Sending…" : "Join Waitlist"}
          </PrimaryButton>
        </div>
      </div>
    </form>
  );
}

/** Hero panel images — exported from Figma (left 52:12665, right 52:12666, center 52:12667). */
const imgWip = "/landing/hero-wip-left.webp";
const imgWip1 = "/landing/hero-wip-right.webp";
const imgWip2 = "/landing/hero-wip-center.webp";

function BackgroundImage10({ children }: React.PropsWithChildren) {
  return (
    <div className="relative shrink-0 size-[9.273px]">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 9.27288 9.27288">
        {children}
      </svg>
    </div>
  );
}

function BackgroundImage6({ children }: React.PropsWithChildren) {
  return (
    <div className="absolute inset-[-5.97%_-5.96px_-79.38%_-5.96px]">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 11.912 46.336">
        {children}
      </svg>
    </div>
  );
}

function BackgroundImage5({ children }: React.PropsWithChildren) {
  return (
    <div className="bg-white relative rounded-[4.636px] shrink-0 w-full">
      <div aria-hidden="true" className="absolute border-[#e9e9e9] border-[0.58px] border-solid inset-0 pointer-events-none rounded-[4.636px]" />
      <div className="flex flex-row items-center size-full">{children}</div>
    </div>
  );
}

function ComponentBackgroundImage({ children }: React.PropsWithChildren) {
  return (
    <BackgroundImage5>
      <div className="content-stretch flex items-center justify-between px-[9.273px] py-[6.955px] relative w-full">{children}</div>
    </BackgroundImage5>
  );
}

function BackgroundImage3({ children }: React.PropsWithChildren) {
  return (
    <div className="relative shrink-0 w-full">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[9.749px] items-center pl-[9.749px] relative w-full">{children}</div>
      </div>
    </div>
  );
}

function LucideChevronDownBackgroundImage({ children }: React.PropsWithChildren) {
  return (
    <div className="relative shrink-0 size-[19.498px]">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 19.4978 19.4978">
        <g id="lucide/chevron-down">{children}</g>
      </svg>
    </div>
  );
}
type ComponentBackgroundImageAndText1Props = {
  text: string;
};

function ComponentBackgroundImageAndText1({ text }: ComponentBackgroundImageAndText1Props) {
  return (
    <PrimaryButton type="button" onClick={scrollToWaitlist}>
      {text}
    </PrimaryButton>
  );
}
type Frame379BackgroundImageProps = {
  additionalClassNames?: string;
};

function Frame379BackgroundImage({ additionalClassNames = "" }: Frame379BackgroundImageProps) {
  return (
    <div className={clsx("absolute h-[25px] top-[164px] w-0", additionalClassNames)}>
      <BackgroundImage6>
        <g filter="url(#filter0_dddd_1_653)" id="Vector 14">
          <path d="M5.956 1.492V26.492" stroke="var(--stroke-0, #E4EAEC)" strokeDasharray="9 9" strokeLinecap="round" />
        </g>
        <defs>
          <filter colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse" height="46.336" id="filter0_dddd_1_653" width="11.912" x="0" y="5.96046e-08">
            <feFlood floodOpacity="0" result="BackgroundImageFix" />
            <feColorMatrix in="SourceAlpha" result="hardAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
            <feOffset dy="0.992" />
            <feGaussianBlur stdDeviation="0.992" />
            <feColorMatrix type="matrix" values="0 0 0 0 0.0588235 0 0 0 0 0.0588235 0 0 0 0 0.121569 0 0 0 0.04 0" />
            <feBlend in2="BackgroundImageFix" mode="normal" result="effect1_dropShadow_1_653" />
            <feColorMatrix in="SourceAlpha" result="hardAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
            <feOffset dy="3.472" />
            <feGaussianBlur stdDeviation="1.736" />
            <feColorMatrix type="matrix" values="0 0 0 0 0.0588235 0 0 0 0 0.105882 0 0 0 0 0.121569 0 0 0 0.03 0" />
            <feBlend in2="effect1_dropShadow_1_653" mode="normal" result="effect2_dropShadow_1_653" />
            <feColorMatrix in="SourceAlpha" result="hardAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
            <feOffset dy="7.936" />
            <feGaussianBlur stdDeviation="2.48" />
            <feColorMatrix type="matrix" values="0 0 0 0 0.0588235 0 0 0 0 0.105882 0 0 0 0 0.121569 0 0 0 0.02 0" />
            <feBlend in2="effect2_dropShadow_1_653" mode="normal" result="effect3_dropShadow_1_653" />
            <feColorMatrix in="SourceAlpha" result="hardAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
            <feOffset dy="13.888" />
            <feGaussianBlur stdDeviation="2.728" />
            <feColorMatrix type="matrix" values="0 0 0 0 0.0588235 0 0 0 0 0.105882 0 0 0 0 0.121569 0 0 0 0.01 0" />
            <feBlend in2="effect3_dropShadow_1_653" mode="normal" result="effect4_dropShadow_1_653" />
            <feBlend in="SourceGraphic" in2="effect4_dropShadow_1_653" mode="normal" result="shape" />
          </filter>
        </defs>
      </BackgroundImage6>
    </div>
  );
}

type BackgroundImageAndTextProps = {
  text: string;
};

function BackgroundImageAndText({ text }: BackgroundImageAndTextProps) {
  return (
    <div className="bg-[rgba(255,255,255,0.2)] content-stretch flex gap-[12px] items-center px-[16px] py-[8px] relative rounded-[99px] shrink-0">
      <div className="relative flex items-center justify-center shrink-0 size-[16px] bg-white rounded-full border border-[#e4eaec]">
        <div className="bg-[#eb4335] rounded-[1px] size-[6px]" />
      </div>
      <p className="font-['Satoshi:Medium',sans-serif] leading-[normal] not-italic relative shrink-0 text-[#606d76] text-[14px] whitespace-nowrap">{text}</p>
    </div>
  );
}
type ComponentBackgroundImageAndTextProps = {
  text: string;
  additionalClassNames?: string;
  /** When false, render a non-interactive div (e.g. decorative hidden elements). */
  asLink?: boolean;
};

function ComponentBackgroundImageAndText({ text, additionalClassNames = "", asLink = true }: ComponentBackgroundImageAndTextProps) {
  const className = clsx(
    "bg-white content-stretch flex gap-[8px] h-[32px] items-center justify-center px-[16px] py-[8px] relative rounded-[8px] shrink-0",
    asLink && "no-underline",
    additionalClassNames
  );
  const inner = (
    <>
      <div aria-hidden="true" className="absolute border border-[#ededed] border-solid inset-[-1px] pointer-events-none rounded-[9px] shadow-[0px_5px_1px_0px_rgba(14,14,34,0),0px_3px_1px_0px_rgba(14,14,34,0.01),0px_2px_1px_0px_rgba(14,14,34,0.02),0px_1px_1px_0px_rgba(14,14,34,0.03)]" />
      <p className="font-['Satoshi:Bold',sans-serif] leading-[normal] not-italic relative shrink-0 text-[#0b191f] text-[14px] whitespace-nowrap">{text}</p>
    </>
  );
  if (!asLink) {
    return <div className={className}>{inner}</div>;
  }
  return (
    <button
      type="button"
      onClick={scrollToWaitlist}
      className={clsx(className, "cursor-pointer border-0")}
    >
      {inner}
    </button>
  );
}

export default function LandingPage() {
  const invCarousel = useInvoiceCarousel();

  const gaugeRef = useRef<HTMLDivElement>(null);
  const [gaugeVisible, setGaugeVisible] = useState(false);
  const [gaugePercent, setGaugePercent] = useState(0);
  const gaugePctRef = useRef(0);

  useEffect(() => {
    const el = gaugeRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => setGaugeVisible(e.isIntersecting),
      { threshold: 0.45 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    const target = gaugeVisible ? 100 : 0;
    const start = gaugePctRef.current;
    if (start === target) return;
    const duration = 1500;
    let t0: number | null = null;
    let frame: number;
    const tick = (ts: number) => {
      if (!t0) t0 = ts;
      const p = Math.min((ts - t0) / duration, 1);
      const ease = 1 - (1 - p) * (1 - p);
      const val = Math.round(start + (target - start) * ease);
      gaugePctRef.current = val;
      setGaugePercent(val);
      if (p < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [gaugeVisible]);

  return (
    <div
      className="relative w-full overflow-x-hidden bg-[#f9fafb]"
      data-name="Landing page"
    >
      <div className="-translate-x-1/2 absolute h-[627.236px] left-[calc(50%-0.27px)] top-[471px] w-[1679.176px]">
        <div className="-translate-x-1/2 absolute h-[686.179px] left-[calc(50%+0.42px)] top-[-9.65px] w-[1230.295px]">
          <div className="absolute inset-[-91.26%_-50.9%]">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2482.66 1938.54">
              <g id="Frame 351" opacity="0.99" style={{ mixBlendMode: "normal" }}>
                <g filter="url(#filter0_f_1_711)" id="Vector 9">
                  <path d={svgPaths.p225fa580} fill="url(#paint0_linear_1_711)" />
                </g>
                <g filter="url(#filter1_f_1_711)" id="Vector 10">
                  <path d={svgPaths.p2e9ec080} fill="#B2E6F7" />
                </g>
                <g filter="url(#filter2_f_1_711)" id="Vector 11">
                  <path d={svgPaths.p20cd9a00} fill="#B2E6F7" />
                </g>
              </g>
              <defs>
                <filter colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse" height="1857.86" id="filter0_f_1_711" width="1724.76" x="408.949" y="69.6523">
                  <feFlood floodOpacity="0" result="BackgroundImageFix" />
                  <feBlend in="SourceGraphic" in2="BackgroundImageFix" mode="normal" result="shape" />
                  <feGaussianBlur result="effect1_foregroundBlur_1_711" stdDeviation="313.091" />
                </filter>
                <filter colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse" height="1898.54" id="filter1_f_1_711" width="1930.27" x="-2.27338e-05" y="-2.62836e-05">
                  <feFlood floodOpacity="0" result="BackgroundImageFix" />
                  <feBlend in="SourceGraphic" in2="BackgroundImageFix" mode="normal" result="shape" />
                  <feGaussianBlur result="effect1_foregroundBlur_1_711" stdDeviation="313.091" />
                </filter>
                <filter colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse" height="1813.03" id="filter2_f_1_711" width="1768.2" x="714.454" y="125.512">
                  <feFlood floodOpacity="0" result="BackgroundImageFix" />
                  <feBlend in="SourceGraphic" in2="BackgroundImageFix" mode="normal" result="shape" />
                  <feGaussianBlur result="effect1_foregroundBlur_1_711" stdDeviation="313.091" />
                </filter>
                <linearGradient gradientUnits="userSpaceOnUse" id="paint0_linear_1_711" x1="1220.43" x2="6236.81" y1="-825.467" y2="4126.34">
                  <stop stopColor="#B2E6F7" />
                  <stop offset="1" stopColor="#B2E6F7" />
                </linearGradient>
              </defs>
            </svg>
          </div>
        </div>
        <div className="absolute flex h-[446.294px] items-center justify-center left-[130.86px] top-[103px] w-[463.259px]" style={{ "--transform-inner-width": "1200", "--transform-inner-height": "19" } as React.CSSProperties}>
          <div className="flex-none rotate-[-5.98deg]">
            <div className="h-[404.386px] pointer-events-none relative rounded-[9.829px] w-[423.44px]" data-name="WIP">
              <div aria-hidden="true" className="absolute inset-0 overflow-hidden rounded-[9.829px]">
                <img alt="" fetchPriority="high" decoding="async" className="absolute max-w-none object-cover object-left-top rounded-[9.829px] size-full" src={imgWip} />
              </div>
              <div aria-hidden="true" className="absolute border-[#ededed] border-[1.081px] border-solid inset-0 rounded-[9.829px] shadow-[0px_124.343px_34.6px_0px_rgba(26,58,84,0),0px_80.012px_31.356px_0px_rgba(26,58,84,0.01),0px_44.331px_27.031px_0px_rgba(26,58,84,0.05),0px_19.462px_19.462px_0px_rgba(26,58,84,0.09),0px_5.406px_10.812px_0px_rgba(26,58,84,0.1)]" />
            </div>
          </div>
        </div>
        <div className="absolute flex h-[446.305px] items-center justify-center left-[1094.04px] top-[113.35px] w-[463.268px]" style={{ "--transform-inner-width": "1200", "--transform-inner-height": "19" } as React.CSSProperties}>
          <div className="flex-none rotate-[5.98deg]">
            <div className="h-[404.39px] pointer-events-none relative rounded-[5.54px] w-[423.442px]" data-name="WIP">
              <div aria-hidden="true" className="absolute inset-0 overflow-hidden rounded-[5.54px]">
                <img alt="" fetchPriority="high" decoding="async" className="absolute max-w-none object-cover object-left-top rounded-[5.54px] size-full" src={imgWip1} />
              </div>
              <div aria-hidden="true" className="absolute border-[#ededed] border-[1.081px] border-solid inset-0 rounded-[5.54px] shadow-[0px_124.345px_34.6px_0px_rgba(26,58,84,0),0px_80.013px_31.356px_0px_rgba(26,58,84,0.01),0px_44.332px_27.031px_0px_rgba(26,58,84,0.05),0px_19.463px_19.463px_0px_rgba(26,58,84,0.09),0px_5.406px_10.813px_0px_rgba(26,58,84,0.1)]" />
            </div>
          </div>
        </div>
        <div className="-translate-x-1/2 absolute h-[515.841px] left-[calc(50%+0.4px)] pointer-events-none rounded-[7.54px] top-[25px] w-[794.248px]" data-name="WIP">
          <div aria-hidden="true" className="absolute inset-0 overflow-hidden rounded-[7.54px]">
            <img alt="" fetchPriority="high" decoding="async" className="absolute max-w-none object-cover object-left-top rounded-[7.54px] size-full" src={imgWip2} />
          </div>
          <div aria-hidden="true" className="absolute border-[#ededed] border-[1.379px] border-solid inset-0 rounded-[7.54px] shadow-[0px_300px_84px_0px_rgba(26,58,84,0),0px_192px_77px_0px_rgba(26,58,84,0.01),0px_108px_65px_0px_rgba(26,58,84,0.04),0px_48px_48px_0px_rgba(26,58,84,0.07),0px_12px_26px_0px_rgba(26,58,84,0.08)]" />
        </div>
      </div>
      <div
        id="landing-hero"
        className="-translate-x-1/2 absolute content-stretch flex flex-col gap-[24px] items-center left-1/2 top-[190px] w-[776px] scroll-mt-28"
      >
        <div className="relative flex min-h-[200px] w-full shrink-0 flex-col items-center justify-center gap-4 px-2 text-center">
          <h1 className="max-w-[680px] text-balance text-[#0b191f]">
            <span
              className="font-continuum bg-clip-text text-[62px] leading-[1.04] italic text-transparent"
              style={{
                backgroundImage: "linear-gradient(99.31deg, #24B5F8 4.62%, #5521FE 148.53%)",
              }}
            >
              Continuum
            </span>
            <span className="font-['Satoshi:Bold',sans-serif] text-[40px] leading-[1.05]">
              {` cuts through the noise of dense project management`}
            </span>
          </h1>
          <p className="max-w-[580px] text-balance text-[15px] font-['Satoshi:Medium',sans-serif] leading-[1.32] text-[#606d76]">
            Leave behind the dense, tangled complexity of legacy tools. Continuum provides a clear hierarchy giving project managers and teams a frictionless way to execute.
          </p>
        </div>
        <ComponentBackgroundImageAndText text="Join Waitlist" />
      </div>
      <div className="absolute bg-gradient-to-b from-[rgba(255,255,255,0)] h-[453px] left-0 to-[#f9fafb] top-[1001px] w-[1512px]" />
      <div className="absolute flex h-[453px] items-center justify-center left-0 top-[1359px] w-[1512px]">
        <div className="flex-none rotate-180">
          <div className="bg-gradient-to-b from-[rgba(255,255,255,0)] h-[453px] to-[#f9fafb] w-[1512px]" />
        </div>
      </div>
      <div className="-translate-x-1/2 absolute bg-[#f9fafb] h-[1378px] left-1/2 top-[1458px] w-[1512px]" />
      <div
        id="landing-waitlist"
        className="-translate-x-1/2 absolute content-stretch flex flex-col gap-[16px] items-center left-1/2 top-[1148px] w-[776px] scroll-mt-28"
      >
        <p className="font-['Satoshi:Medium',sans-serif] leading-[1.04] min-w-full not-italic relative shrink-0 text-[#0b191f] text-[62px] text-center w-[min-content]">Join the Waitlist</p>
        <p className="font-['Satoshi:Medium',sans-serif] leading-[24px] not-italic relative shrink-0 text-[#606d76] text-[16px] text-center w-[580px]">We’re building a unified space for sprint planning, frictionless time tracking, and instant invoicing-but we need your help to perfect it. Join our exclusive Beta program to get early access, test our core features, and tell us exactly what your team needs to do its best deep work.</p>
        <LandingWaitlistForm />
      </div>
      <div
        id="landing-features"
        className="absolute left-[calc(50%+12.5px)] top-[1518px] z-10 flex w-[1187px] -translate-x-1/2 flex-wrap content-start items-start gap-[12px] scroll-mt-28"
      >
        <div className="content-stretch flex flex-col gap-[10px] h-[564px] items-center overflow-clip p-[48px] relative rounded-[36px] shadow-[0px_39px_11px_0px_rgba(181,181,181,0),0px_25px_10px_0px_rgba(181,181,181,0.04),0px_14px_8px_0px_rgba(181,181,181,0.12),0px_6px_6px_0px_rgba(181,181,181,0.2),0px_2px_3px_0px_rgba(181,181,181,0.24)] shrink-0 w-[700px]" style={{ backgroundImage: "linear-gradient(rgba(178, 230, 247, 0.48) 0%, rgba(253, 251, 247, 0.48) 100%), linear-gradient(90deg, rgb(255, 255, 255) 0%, rgb(255, 255, 255) 100%)", contain: "content" }}>
          <div className="-translate-x-1/2 absolute left-1/2 size-[700px] top-[40px]">
            <div className="absolute inset-[-52%]">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 1428 1428">
                <g filter="url(#filter0_f_1_729)" id="Ellipse 13">
                  <circle cx="714" cy="714" fill="var(--fill-0, white)" r="350" />
                </g>
                <defs>
                  <filter colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse" height="1428" id="filter0_f_1_729" width="1428" x="0" y="0">
                    <feFlood floodOpacity="0" result="BackgroundImageFix" />
                    <feBlend in="SourceGraphic" in2="BackgroundImageFix" mode="normal" result="shape" />
                    <feGaussianBlur result="effect1_foregroundBlur_1_729" stdDeviation="182" />
                  </filter>
                </defs>
              </svg>
            </div>
          </div>
          <div className="content-stretch flex flex-col gap-[36px] items-center relative shrink-0 w-full">
            <div className="relative flex max-h-[210px] w-full min-h-0 shrink-0 flex-col items-center overflow-hidden text-center not-italic">
              <div className="content-stretch flex w-full max-w-[604px] flex-col gap-5 font-['Satoshi:Medium',sans-serif]">
                <p className="text-balance font-['Satoshi:Bold',sans-serif] text-[38.319px] leading-[1.08] tracking-[-0.48px] text-[#0b191f]">
                  Frictionless Execution & Recording
                </p>
                <p className="text-balance text-[15px] leading-[23px] text-[#606d76]">
                  Stop fighting your tools to track work. Team members simply click to start recording time directly on a task.
                </p>
              </div>
            </div>
          </div>
          <div className="absolute h-[268.501px] left-1/2 -translate-x-1/2 top-[262px] w-[750px]">
            <div className="absolute flex flex-col gap-[8px] left-1/2 -translate-x-1/2 top-[94px] w-[750px] overflow-hidden">
              <div className="flex w-max gap-[8px] marquee-container" style={{ animation: "marquee-left 30s linear infinite" }}>
                {[...Array(2)].map((_, i) => (
                  <div key={i} className="flex gap-[8px] shrink-0">
                    <BackgroundImageAndText text="Create interactive prototypes" />
                    <BackgroundImageAndText text="Conduct usability testing" />
                    <BackgroundImageAndText text="Build user flow diagrams" />
                    <BackgroundImageAndText text="Design system components" />
                    <BackgroundImageAndText text="Write API documentation" />
                    <BackgroundImageAndText text="Review pull requests" />
                    <BackgroundImageAndText text="Run regression tests" />
                    <BackgroundImageAndText text="Refactor legacy modules" />
                  </div>
                ))}
              </div>
              <div className="flex w-max gap-[8px] marquee-container" style={{ animation: "marquee-right 30s linear infinite" }}>
                {[...Array(2)].map((_, i) => (
                  <div key={i} className="flex gap-[8px] shrink-0">
                    <BackgroundImageAndText text="Implement accessibility standards" />
                    <BackgroundImageAndText text="Create style guide documentation" />
                    <BackgroundImageAndText text="Ticket admin" />
                    <BackgroundImageAndText text="Sprint retrospective notes" />
                    <BackgroundImageAndText text="Deploy staging builds" />
                    <BackgroundImageAndText text="Update project roadmap" />
                    <BackgroundImageAndText text="Fix CI pipeline issues" />
                    <BackgroundImageAndText text="Audit dependency versions" />
                  </div>
                ))}
              </div>
            </div>
            {/* Upper dashed segment — match Figma Vector 21; w-[2px] so stroke is not collapsed */}
            <div className="-translate-x-1/2 absolute left-[calc(50%-0.5px)] top-[71px] flex h-[21px] w-[2px] items-stretch justify-center">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 23">
                <path d="M1 1V22" id="Vector 21" stroke="#EB4335" strokeDasharray="9 9" strokeLinecap="round" strokeWidth="2" />
              </svg>
            </div>
            {/* Middle dashed segments: gaps through the two marquee pill rows (top ~94–128, ~136–166) so the line does not cross text */}
            <div
              aria-hidden
              className="-translate-x-1/2 absolute left-[calc(50%-0.5px)] top-[92px] flex h-[2px] w-[2px] items-stretch justify-center"
            >
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 2">
                <path d="M1 0V2" stroke="#EB4335" strokeDasharray="9 9" strokeLinecap="round" strokeWidth="2" />
              </svg>
            </div>
            <div
              aria-hidden
              className="-translate-x-1/2 absolute left-[calc(50%-0.5px)] top-[128px] flex h-[8px] w-[2px] items-stretch justify-center"
            >
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 8">
                <path d="M1 0V8" stroke="#EB4335" strokeDasharray="9 9" strokeLinecap="round" strokeWidth="2" />
              </svg>
            </div>
            <div
              aria-hidden
              className="-translate-x-1/2 absolute left-[calc(50%-0.5px)] top-[166px] flex h-[4px] w-[2px] items-stretch justify-center"
            >
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 4">
                <path d="M1 0V4" stroke="#EB4335" strokeDasharray="9 9" strokeLinecap="round" strokeWidth="2" />
              </svg>
            </div>
            <div
              aria-hidden
              className="-translate-x-1/2 absolute left-[calc(50%-0.5px)] top-[170px] flex h-[17px] w-[17px] items-center justify-center"
            >
              <div className="size-[10px] shrink-0 rounded-full bg-gradient-to-b from-[#EB4335] to-[#FC5244]" />
            </div>
            <div className="-translate-x-1/2 absolute bg-white left-1/2 rounded-[69.461px] top-0 w-[530px]" data-name="Component 154">
              <div className="content-stretch flex flex-col gap-[9.749px] items-start overflow-clip pl-[25.871px] pr-[8.628px] py-[8.628px] relative rounded-[inherit] w-full">
                <div className="content-stretch flex flex-col gap-[14.623px] items-center justify-center relative rounded-[1217.391px] shrink-0 w-full">
                  <BackgroundImage3>
                    <div className="content-stretch flex flex-[1_0_0] flex-col items-start justify-center min-h-px min-w-px relative">
                      <p className="font-['Satoshi:Medium',sans-serif] leading-[normal] not-italic relative shrink-0 text-[#0b191f] text-[17.061px] whitespace-nowrap">00:00:00</p>
                      <div className="content-stretch flex gap-[2.437px] items-start relative shrink-0 w-full">
                        <p className="font-['Satoshi:Medium',sans-serif] leading-[normal] not-italic relative shrink-0 text-[#606d76] text-[14.623px] whitespace-nowrap">Select ticket</p>
                        <LucideChevronDownBackgroundImage>
                          <path d={svgPaths.p139eb600} id="Vector" stroke="var(--stroke-0, #606D76)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.62481" />
                        </LucideChevronDownBackgroundImage>
                      </div>
                    </div>
                    <div className="content-stretch flex gap-[10.78px] items-center justify-center p-[12.936px] relative rounded-[1076.932px] shrink-0 size-[51.744px]" data-name="Component 139">
                      <div className="-translate-x-1/2 -translate-y-1/2 absolute bg-[rgba(235,67,53,0)] left-[calc(50%+0.41px)] rounded-[25.872px] size-[51.744px] top-[calc(50%+0.41px)]">
                        <div aria-hidden="true" className="absolute border-[#8a8f91] border-[1.219px] border-solid inset-0 pointer-events-none rounded-[25.872px]" />
                      </div>
                      <div className="-translate-x-1/2 -translate-y-1/2 absolute left-[calc(50%+0.15px)] size-[46px] top-[calc(50%+0.5px)]" data-name="lucide/square">
                        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 46 46">
                          <g id="lucide/square">
                            <rect fill="var(--fill-0, #EB4335)" height="46" rx="23" width="46" />
                            <path d={svgPaths.p1a3980} fill="var(--fill-0, #EB4335)" id="Vector" />
                          </g>
                        </svg>
                      </div>
                    </div>
                  </BackgroundImage3>
                </div>
              </div>
              <div aria-hidden="true" className="absolute border-[#ebedee] border-[1.078px] border-solid inset-0 pointer-events-none rounded-[69.461px] shadow-[0px_69.369px_41.622px_0px_rgba(26,59,84,0.05),0px_31.051px_31.051px_0px_rgba(26,59,84,0.09),0px_7.928px_17.177px_0px_rgba(26,59,84,0.1)]" />
            </div>
            <div className="-translate-x-1/2 absolute bg-white left-1/2 rounded-[69.461px] top-[200px] w-[530px]" data-name="Component 144">
              <div className="content-stretch flex flex-col gap-[9.749px] items-start overflow-clip pl-[25.871px] pr-[8.628px] py-[8.628px] relative rounded-[inherit] w-full">
                <div className="content-stretch flex flex-col gap-[14.623px] items-center justify-center relative rounded-[1217.391px] shrink-0 w-full">
                  <BackgroundImage3>
                    <div className="content-stretch flex flex-[1_0_0] flex-col items-start justify-center min-h-px min-w-px relative">
                      <p className="font-['Satoshi:Medium',sans-serif] leading-[normal] not-italic relative shrink-0 text-[#0b191f] text-[17.061px] whitespace-nowrap">32:10:12</p>
                      <div className="content-stretch flex gap-[2.437px] items-start relative shrink-0 w-full">
                        <p className="font-['Satoshi:Medium',sans-serif] leading-[normal] not-italic overflow-hidden relative shrink-0 text-[#606d76] text-[14.623px] text-ellipsis whitespace-nowrap">Implement accessibility standards</p>
                        <LucideChevronDownBackgroundImage>
                          <path d={svgPaths.p1d7696a0} id="Vector" stroke="var(--stroke-0, #606D76)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.62481" />
                        </LucideChevronDownBackgroundImage>
                      </div>
                    </div>
                    <button aria-label="Stop timer" className="cursor-pointer relative rounded-[883.738px] shrink-0 size-[51.744px]" data-name="Component 139">
                      <div className="flex flex-row items-center justify-center size-full">
                        <div className="content-stretch flex gap-[10.78px] items-center justify-center p-[12.936px] relative size-full">
                          <div className="-translate-x-1/2 -translate-y-1/2 absolute bg-[rgba(235,67,53,0.1)] left-1/2 rounded-[21.231px] size-[51.744px] top-1/2" />
                          <div className="relative shrink-0 size-[21.56px]" data-name="lucide/square">
                            <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 21.5602 21.5602">
                              <g id="lucide/square">
                                <path d={svgPaths.p3d7cf080} fill="var(--fill-0, #EB4335)" id="Vector" stroke="var(--stroke-0, #EB4335)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.79668" />
                              </g>
                            </svg>
                          </div>
                        </div>
                      </div>
                    </button>
                  </BackgroundImage3>
                </div>
              </div>
              <div aria-hidden="true" className="absolute border-[#ebedee] border-[1.078px] border-solid inset-0 pointer-events-none rounded-[69.461px] shadow-[0px_69.37px_41.622px_0px_rgba(26,59,84,0.05),0px_31.051px_31.051px_0px_rgba(26,59,84,0.09),0px_7.928px_17.177px_0px_rgba(26,59,84,0.1)]" />
            </div>
          </div>
        </div>
        <div className="content-stretch flex flex-col gap-[24px] h-[564px] items-center overflow-clip p-[48px] relative rounded-[36px] shadow-[0px_39px_11px_0px_rgba(181,181,181,0),0px_25px_10px_0px_rgba(181,181,181,0.04),0px_14px_8px_0px_rgba(181,181,181,0.12),0px_6px_6px_0px_rgba(181,181,181,0.2),0px_2px_3px_0px_rgba(181,181,181,0.24)] shrink-0" style={{ backgroundImage: "linear-gradient(-17.8066deg, rgba(178, 230, 247, 0.39) 177.11%, rgba(253, 251, 247, 0.39) 89.39%), linear-gradient(90deg, rgb(255, 255, 255) 0%, rgb(255, 255, 255) 100%)" }}>
          <div className="-translate-x-1/2 absolute left-[calc(50%-38.5px)] size-[230px] top-[255px]">
            <div className="absolute inset-[-65.22%]">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 530 530">
                <g filter="url(#filter0_f_1_655)" id="Ellipse 13">
                  <circle cx="265" cy="265" fill="var(--fill-0, white)" r="115" />
                </g>
                <defs>
                  <filter colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse" height="530" id="filter0_f_1_655" width="530" x="0" y="0">
                    <feFlood floodOpacity="0" result="BackgroundImageFix" />
                    <feBlend in="SourceGraphic" in2="BackgroundImageFix" mode="normal" result="shape" />
                    <feGaussianBlur result="effect1_foregroundBlur_1_655" stdDeviation="75" />
                  </filter>
                </defs>
              </svg>
            </div>
          </div>
          <div className="content-stretch flex flex-col gap-[24px] items-center relative shrink-0">
            <div className="relative flex max-h-[120px] w-full min-h-0 shrink-0 flex-col items-center overflow-hidden text-center not-italic">
              <div className="content-stretch flex w-full max-w-[377px] flex-col gap-4 font-['Satoshi:Medium',sans-serif]">
                <p className="text-balance font-['Satoshi:Bold',sans-serif] text-[38.319px] leading-[1.08] text-[#0b191f]">
                  Seamless Invoicing
                </p>
                <p className="text-balance text-[15px] leading-[22px] text-[#606d76]">
                  No more chasing down timesheets or reconciling data across disconnected systems.
                </p>
              </div>
            </div>
          </div>
          <div className="-translate-x-1/2 absolute flex h-[513.342px] items-center justify-center left-[calc(50%+71.4px)] top-[157px] w-[957.794px]" style={{ "--transform-inner-width": "1200", "--transform-inner-height": "1492" } as React.CSSProperties}>
            <div className="flex-none rotate-[-17.13deg] scale-y-92 skew-x-[22.42deg]">
              <div className="h-[379.522px] relative w-[749.361px]">
                <div className="absolute flex h-[580.094px] items-center justify-center left-[-16.23px] top-[-162.57px] w-[721.685px]" style={{ "--transform-inner-width": "1200", "--transform-inner-height": "19" } as React.CSSProperties}>
                  <div className="flex-none rotate-[20.91deg] scale-x-89 scale-y-121 skew-x-[-12.77deg]">
                    <div className="h-[395px] relative w-[539px]">
                      <div className="absolute inset-[-0.17%_0_-0.13%_0]">
                        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 540.061 396.173">
                          <path d={svgPaths.p3341a900} fill="url(#paint0_linear_1_688)" id="Vector 20" stroke="var(--stroke-0, white)" strokeDasharray="9 9" strokeLinecap="round" />
                          <defs>
                            <linearGradient gradientUnits="userSpaceOnUse" id="paint0_linear_1_688" x1="226.526" x2="483.026" y1="89.1665" y2="377.166">
                              <stop stopColor="#F9FAFB" />
                              <stop offset="1" stopColor="#F9FAFB" />
                            </linearGradient>
                          </defs>
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="absolute content-stretch flex flex-col items-center left-[215.92px] shadow-[0px_218.822px_61.24px_0px_rgba(26,59,84,0),0px_139.658px_56.012px_0px_rgba(26,59,84,0.01),0px_78.417px_47.05px_0px_rgba(26,59,84,0.05),0px_35.101px_35.101px_0px_rgba(26,59,84,0.09),0px_8.962px_19.418px_0px_rgba(26,59,84,0.1)] top-[225.47px] w-[318.15px]" data-name="Create Task">
                  <div className="relative rounded-bl-[9.273px] rounded-br-[9.27px] rounded-tl-[9.276px] rounded-tr-[9.273px] shrink-0 w-full">
                    <div className="content-stretch flex flex-col items-start overflow-clip relative rounded-[inherit] w-full">
                      <div className="relative shrink-0 w-full" style={{ backgroundImage: "linear-gradient(90deg, rgb(255, 255, 255) 0%, rgb(255, 255, 255) 100%), linear-gradient(90deg, rgb(249, 249, 249) 0%, rgb(249, 249, 249) 100%)" }}>
                        <div className="content-stretch flex flex-col gap-[13.909px] items-start px-[20.864px] py-[13.909px] relative w-full">
                          <div className="content-stretch flex flex-col gap-[13.909px] items-start relative shrink-0 w-full">
                            <div className="content-stretch flex flex-col gap-[9.273px] items-center justify-end relative shrink-0 w-full">
                              <div className="content-stretch flex flex-col gap-[2.318px] items-start relative shrink-0 w-full" data-name="Time Range">
                                <p className="font-['Satoshi:Medium',sans-serif] leading-[normal] not-italic relative shrink-0 text-[#606d76] text-[8.114px] whitespace-nowrap">Project</p>
                                <ComponentBackgroundImage>
                                  <p className="font-['Satoshi:Medium',sans-serif] leading-[normal] not-italic relative shrink-0 text-[#0b191f] text-[9.273px] whitespace-nowrap">Set up high-fidelity prototypes with conditional logic</p>
                                  <BackgroundImage10>
                                    <g id="lucide/chevron-down">
                                      <path d={svgPaths.p2c0a3380} id="Vector" stroke="var(--stroke-0, #252014)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="0.77274" />
                                    </g>
                                  </BackgroundImage10>
                                </ComponentBackgroundImage>
                              </div>
                              <div className="content-stretch flex gap-[9.273px] items-start relative shrink-0 w-full">
                                <div className="content-stretch flex flex-[1_0_0] flex-col gap-[2.318px] items-start min-h-px min-w-px relative" data-name="Date Range">
                                  <p className="font-['Satoshi:Medium',sans-serif] leading-[normal] not-italic relative shrink-0 text-[#606d76] text-[8.114px] whitespace-nowrap">Date Range</p>
                                  <ComponentBackgroundImage>
                                    <p className="font-['Satoshi:Medium',sans-serif] leading-[normal] not-italic relative shrink-0 text-[#0b191f] text-[9.273px] whitespace-nowrap">10/10/2025-10/10/2025</p>
                                    <BackgroundImage10>
                                      <g id="lucide/calendar">
                                        <path d={svgPaths.p19165f00} id="Vector" stroke="var(--stroke-0, #252014)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="0.77274" />
                                      </g>
                                    </BackgroundImage10>
                                  </ComponentBackgroundImage>
                                </div>
                                <div className="content-stretch flex flex-[1_0_0] flex-col gap-[2.318px] items-start min-h-px min-w-px relative" data-name="Date Range">
                                  <p className="font-['Satoshi:Medium',sans-serif] leading-[normal] not-italic relative shrink-0 text-[#606d76] text-[8.114px] whitespace-nowrap">Time Range</p>
                                  <BackgroundImage5>
                                    <div className="content-stretch flex items-center px-[9.273px] py-[6.955px] relative w-full">
                                      <p className="font-['Satoshi:Medium',sans-serif] leading-[normal] not-italic relative shrink-0 text-[#0b191f] text-[9.273px] whitespace-nowrap">09:00 AM - 10:00 AM</p>
                                    </div>
                                  </BackgroundImage5>
                                </div>
                              </div>
                            </div>
                            <div className="content-stretch flex h-[22.591px] items-center justify-end relative shrink-0 w-full">
                              <div className="flex flex-[1_0_0] flex-row items-center self-stretch">
                                <button className="cursor-pointer flex-[1_0_0] h-full min-h-px min-w-px relative rounded-[4.636px]" data-name="Component 4" style={{ backgroundImage: "linear-gradient(176.304deg, rgb(36, 181, 248) 123.02%, rgb(85, 33, 254) 802.55%)" }}>
                                  <div className="flex flex-row items-center justify-center size-full">
                                    <div className="content-stretch flex gap-[4.636px] items-center justify-center px-[9.273px] py-[5.796px] relative size-full">
                                      <BackgroundImage10>
                                        <g id="lucide/plus">
                                          <path d={svgPaths.pf86f000} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="0.823347" />
                                        </g>
                                      </BackgroundImage10>
                                      <p className="font-['Satoshi:Bold',sans-serif] leading-[normal] not-italic relative shrink-0 text-[8.114px] text-left text-white whitespace-nowrap">Log Time</p>
                                    </div>
                                  </div>
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div aria-hidden="true" className="absolute border-[#f5f5f5] border-[0.58px] border-solid inset-0 pointer-events-none rounded-bl-[9.273px] rounded-br-[9.27px] rounded-tl-[9.276px] rounded-tr-[9.273px]" />
                  </div>
                </div>
                <InvoiceCardStrip {...invCarousel} />
                <div className="absolute h-[25.5px] left-[58px] top-[164px] w-[631px]">
                  <div className="absolute inset-[-5.85%_-0.94%_-77.82%_-0.94%]">
                    <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 642.912 46.836">
                      <g filter="url(#filter0_dddd_1_657)" id="Vector 13">
                        <path d={svgPaths.p2ee8a200} stroke="var(--stroke-0, #E4EAEC)" strokeDasharray="9 9" strokeLinecap="round" strokeLinejoin="round" />
                      </g>
                      <defs>
                        <filter colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse" height="46.836" id="filter0_dddd_1_657" width="642.912" x="0" y="5.96046e-08">
                          <feFlood floodOpacity="0" result="BackgroundImageFix" />
                          <feColorMatrix in="SourceAlpha" result="hardAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
                          <feOffset dy="0.992" />
                          <feGaussianBlur stdDeviation="0.992" />
                          <feColorMatrix type="matrix" values="0 0 0 0 0.0588235 0 0 0 0 0.0588235 0 0 0 0 0.121569 0 0 0 0.04 0" />
                          <feBlend in2="BackgroundImageFix" mode="normal" result="effect1_dropShadow_1_657" />
                          <feColorMatrix in="SourceAlpha" result="hardAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
                          <feOffset dy="3.472" />
                          <feGaussianBlur stdDeviation="1.736" />
                          <feColorMatrix type="matrix" values="0 0 0 0 0.0588235 0 0 0 0 0.105882 0 0 0 0 0.121569 0 0 0 0.03 0" />
                          <feBlend in2="effect1_dropShadow_1_657" mode="normal" result="effect2_dropShadow_1_657" />
                          <feColorMatrix in="SourceAlpha" result="hardAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
                          <feOffset dy="7.936" />
                          <feGaussianBlur stdDeviation="2.48" />
                          <feColorMatrix type="matrix" values="0 0 0 0 0.0588235 0 0 0 0 0.105882 0 0 0 0 0.121569 0 0 0 0.02 0" />
                          <feBlend in2="effect2_dropShadow_1_657" mode="normal" result="effect3_dropShadow_1_657" />
                          <feColorMatrix in="SourceAlpha" result="hardAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
                          <feOffset dy="13.888" />
                          <feGaussianBlur stdDeviation="2.728" />
                          <feColorMatrix type="matrix" values="0 0 0 0 0.0588235 0 0 0 0 0.105882 0 0 0 0 0.121569 0 0 0 0.01 0" />
                          <feBlend in2="effect3_dropShadow_1_657" mode="normal" result="effect4_dropShadow_1_657" />
                          <feBlend in="SourceGraphic" in2="effect4_dropShadow_1_657" mode="normal" result="shape" />
                        </filter>
                      </defs>
                    </svg>
                  </div>
                </div>
                <Frame379BackgroundImage additionalClassNames="left-[185px]" />
                <div className="absolute h-[25px] left-[311px] top-[164px] w-0">
                  <BackgroundImage6>
                    <g filter="url(#filter0_dddd_1_757)" id="Vector 15">
                      <path d="M5.956 1.492V26.492" stroke="var(--stroke-0, #24B5F8)" strokeDasharray="9 9" strokeLinecap="round" />
                    </g>
                    <defs>
                      <filter colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse" height="46.336" id="filter0_dddd_1_757" width="11.912" x="0" y="5.96046e-08">
                        <feFlood floodOpacity="0" result="BackgroundImageFix" />
                        <feColorMatrix in="SourceAlpha" result="hardAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
                        <feOffset dy="0.992" />
                        <feGaussianBlur stdDeviation="0.992" />
                        <feColorMatrix type="matrix" values="0 0 0 0 0.0588235 0 0 0 0 0.0588235 0 0 0 0 0.121569 0 0 0 0.04 0" />
                        <feBlend in2="BackgroundImageFix" mode="normal" result="effect1_dropShadow_1_757" />
                        <feColorMatrix in="SourceAlpha" result="hardAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
                        <feOffset dy="3.472" />
                        <feGaussianBlur stdDeviation="1.736" />
                        <feColorMatrix type="matrix" values="0 0 0 0 0.0588235 0 0 0 0 0.105882 0 0 0 0 0.121569 0 0 0 0.03 0" />
                        <feBlend in2="effect1_dropShadow_1_757" mode="normal" result="effect2_dropShadow_1_757" />
                        <feColorMatrix in="SourceAlpha" result="hardAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
                        <feOffset dy="7.936" />
                        <feGaussianBlur stdDeviation="2.48" />
                        <feColorMatrix type="matrix" values="0 0 0 0 0.0588235 0 0 0 0 0.105882 0 0 0 0 0.121569 0 0 0 0.02 0" />
                        <feBlend in2="effect2_dropShadow_1_757" mode="normal" result="effect3_dropShadow_1_757" />
                        <feColorMatrix in="SourceAlpha" result="hardAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
                        <feOffset dy="13.888" />
                        <feGaussianBlur stdDeviation="2.728" />
                        <feColorMatrix type="matrix" values="0 0 0 0 0.0588235 0 0 0 0 0.105882 0 0 0 0 0.121569 0 0 0 0.01 0" />
                        <feBlend in2="effect3_dropShadow_1_757" mode="normal" result="effect4_dropShadow_1_757" />
                        <feBlend in="SourceGraphic" in2="effect4_dropShadow_1_757" mode="normal" result="shape" />
                      </filter>
                    </defs>
                  </BackgroundImage6>
                </div>
                <div className="absolute h-[35px] left-[375px] top-[190px] w-0">
                  <div className="absolute inset-[-2.83%_-5.96px_-55.27%_-5.96px]">
                    <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 11.912 55.336">
                      <g filter="url(#filter0_dddd_1_651)" id="Vector 18">
                        <path d="M5.956 0.992V35.992" stroke="var(--stroke-0, #24B5F8)" strokeDasharray="9 9" />
                      </g>
                      <defs>
                        <filter colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse" height="55.336" id="filter0_dddd_1_651" width="11.912" x="0" y="0">
                          <feFlood floodOpacity="0" result="BackgroundImageFix" />
                          <feColorMatrix in="SourceAlpha" result="hardAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
                          <feOffset dy="0.992" />
                          <feGaussianBlur stdDeviation="0.992" />
                          <feColorMatrix type="matrix" values="0 0 0 0 0.0588235 0 0 0 0 0.0588235 0 0 0 0 0.121569 0 0 0 0.04 0" />
                          <feBlend in2="BackgroundImageFix" mode="normal" result="effect1_dropShadow_1_651" />
                          <feColorMatrix in="SourceAlpha" result="hardAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
                          <feOffset dy="3.472" />
                          <feGaussianBlur stdDeviation="1.736" />
                          <feColorMatrix type="matrix" values="0 0 0 0 0.0588235 0 0 0 0 0.105882 0 0 0 0 0.121569 0 0 0 0.03 0" />
                          <feBlend in2="effect1_dropShadow_1_651" mode="normal" result="effect2_dropShadow_1_651" />
                          <feColorMatrix in="SourceAlpha" result="hardAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
                          <feOffset dy="7.936" />
                          <feGaussianBlur stdDeviation="2.48" />
                          <feColorMatrix type="matrix" values="0 0 0 0 0.0588235 0 0 0 0 0.105882 0 0 0 0 0.121569 0 0 0 0.02 0" />
                          <feBlend in2="effect2_dropShadow_1_651" mode="normal" result="effect3_dropShadow_1_651" />
                          <feColorMatrix in="SourceAlpha" result="hardAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
                          <feOffset dy="13.888" />
                          <feGaussianBlur stdDeviation="2.728" />
                          <feColorMatrix type="matrix" values="0 0 0 0 0.0588235 0 0 0 0 0.105882 0 0 0 0 0.121569 0 0 0 0.01 0" />
                          <feBlend in2="effect3_dropShadow_1_651" mode="normal" result="effect4_dropShadow_1_651" />
                          <feBlend in="SourceGraphic" in2="effect4_dropShadow_1_651" mode="normal" result="shape" />
                        </filter>
                      </defs>
                    </svg>
                  </div>
                </div>
                <Frame379BackgroundImage additionalClassNames="left-[437px]" />
                <Frame379BackgroundImage additionalClassNames="left-[563px]" />
                <div className="absolute flex h-[39.238px] items-center justify-center left-[310.5px] top-[170.02px] w-[64.386px]" style={{ "--transform-inner-width": "1200", "--transform-inner-height": "19" } as React.CSSProperties}>
                  <div className="flex-none rotate-[20.91deg] scale-x-89 scale-y-121 skew-x-[-12.77deg]">
                    <div className="h-[19px] relative w-[61.5px]">
                      <div className="absolute inset-[-2.51%_-0.24%]">
                        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 61.7952 19.9554">
                          <path d={svgPaths.p19b12a40} id="Vector 19" stroke="var(--stroke-0, #24B5F8)" strokeDasharray="9 9" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div ref={gaugeRef} className="flex-[1_0_0] min-h-px min-w-px relative rounded-[36px] shadow-[0px_39px_11px_0px_rgba(181,181,181,0),0px_25px_10px_0px_rgba(181,181,181,0.04),0px_14px_8px_0px_rgba(181,181,181,0.12),0px_6px_6px_0px_rgba(181,181,181,0.2),0px_2px_3px_0px_rgba(181,181,181,0.24)]" style={{ backgroundImage: "linear-gradient(rgba(178, 247, 194, 0.48) 0%, rgba(253, 251, 247, 0.48) 100%), linear-gradient(90deg, rgb(255, 255, 255) 0%, rgb(255, 255, 255) 100%)" }}>
          <div className="flex flex-col justify-center overflow-clip rounded-[inherit] size-full">
            <div className="content-stretch flex flex-col gap-[24px] items-start justify-center p-[48px] relative w-full">
              <div className="-translate-x-1/2 absolute flex h-[824.007px] items-center justify-center left-[calc(50%+451.5px)] top-[-191px] w-[1603.272px]" style={{ "--transform-inner-width": "1200", "--transform-inner-height": "19" } as React.CSSProperties}>
                <div className="flex-none rotate-[14.7deg]">
                  <div className="h-[448px] relative w-[1540px]">
                    <div className="absolute inset-[-81.25%_-23.64%]">
                      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2268 1176">
                        <g filter="url(#filter0_f_1_638)" id="Ellipse 14">
                          <ellipse cx="1134" cy="588" fill="var(--fill-0, white)" rx="770" ry="224" />
                        </g>
                        <defs>
                          <filter colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse" height="1176" id="filter0_f_1_638" width="2268" x="0" y="0">
                            <feFlood floodOpacity="0" result="BackgroundImageFix" />
                            <feBlend in="SourceGraphic" in2="BackgroundImageFix" mode="normal" result="shape" />
                            <feGaussianBlur result="effect1_foregroundBlur_1_638" stdDeviation="182" />
                          </filter>
                        </defs>
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
              <div className="content-stretch flex flex-col gap-[36px] items-start relative shrink-0">
                <div className="relative flex max-h-[280px] w-full min-w-0 shrink-0 flex-col items-start overflow-hidden not-italic">
                  <div className="content-stretch flex w-full max-w-[332px] flex-col gap-5 font-['Satoshi:Medium',sans-serif]">
                    <p className="text-balance text-center font-['Satoshi:Bold',sans-serif] text-[38.319px] leading-[1.08] text-[#0b191f]">
                      Weighted Project Health
                    </p>
                    <p className="text-balance text-[15px] leading-[23px] text-[#606d76]">
                      Continuum calculates project momentum using a weighted system based on the tasks inside each sprint. See instantly if a milestone is on track or at risk, without ever having to micromanage your developers.
                    </p>
                  </div>
                </div>
                <ComponentBackgroundImageAndText text="Start for free" additionalClassNames="opacity-0" asLink={false} />
              </div>
              <div className="absolute content-stretch flex flex-col items-center left-[723px] px-[22.072px] top-[65.04px]">
                <div className="h-[161.079px] relative shrink-0 w-[322.158px]">
                  <div className="absolute inset-[-4.85%_-2.43%]">
                    <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 337.792 176.713">
                      <path d={svgPaths.p24b83740} stroke="#E4EAEC" strokeLinecap="round" strokeWidth="15.6342" />
                      {/* Flip green stroke so dash fill runs left → right (path is defined right → left) */}
                      <g transform="translate(337.792 0) scale(-1 1)">
                        <path
                          d={svgPaths.p24b83740}
                          stroke="#6EC679"
                          strokeLinecap="round"
                          strokeWidth="15.6342"
                          pathLength="100"
                          strokeDasharray="100"
                          strokeDashoffset={100 - gaugePercent}
                          style={{ transition: "none" }}
                        />
                      </g>
                    </svg>
                  </div>
                </div>
                <p className="absolute font-['Satoshi:Regular',sans-serif] leading-[normal] not-italic overflow-hidden text-[#0b191f] text-[65.024px] text-ellipsis top-[45.06px] whitespace-nowrap left-1/2 -translate-x-1/2">{gaugePercent}%</p>
                <p className="absolute font-['Satoshi:Medium',sans-serif] leading-[normal] not-italic overflow-hidden text-[#13a82e] text-[22.072px] text-ellipsis top-[146.23px] tracking-[-0.2207px] whitespace-nowrap left-1/2 -translate-x-1/2" style={{ opacity: gaugePercent === 100 ? 1 : 0, transition: "opacity 0.3s" }}>Project on track</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="absolute left-[calc(50%+0.5px)] top-[28px] z-50 flex -translate-x-1/2 content-stretch items-center justify-center gap-[314px]">
        <div className="content-stretch flex flex-col items-center relative shrink-0">
          <p className="font-continuum leading-[24px] not-italic relative shrink-0 text-[#0b191f] text-[21.405px] text-center tracking-[-0.4281px] whitespace-nowrap">Continuum</p>
        </div>
        <nav
          aria-label="Page sections"
          className="content-stretch flex font-['Satoshi:Medium',sans-serif] gap-[51px] items-center leading-[normal] not-italic relative shrink-0 text-[#606d76] text-[16px] text-center whitespace-nowrap"
        >
          <span className="relative shrink-0 cursor-default select-none">
            Overview
          </span>
          <span className="relative shrink-0 cursor-default select-none">
            Waitlist
          </span>
          <span className="relative shrink-0 cursor-default select-none">
            Features
          </span>
          <span className="relative shrink-0 cursor-default select-none">
            Contact
          </span>
        </nav>
        <div className="content-stretch flex gap-[8px] items-center relative shrink-0">
          <ComponentBackgroundImageAndText1 text="Join Waitlist" />
        </div>
      </div>
      {/* Spacer reserving the absolutely-positioned hero region above, so the
          sections below flow naturally beneath the hero, waitlist and feature cards. */}
      <div aria-hidden className="w-full" style={{ height: 2540 }} />
      <div className="relative z-10 flex w-full flex-col items-center">
        <AccessControlSection
          variant="desktop"
          className="mx-auto w-[1512px] scroll-mt-28"
        />
        {/* Full-bleed so the hands reach the screen edges instead of being hard-cut at 1512px */}
        <ContinuumAiHero variant="desktop" className="w-full" />
        <ContinuumAiFeatures
          variant="desktop"
          className="mx-auto w-[1512px] scroll-mt-28"
        />
        <SecuritySection variant="desktop" className="mx-auto w-[1512px]" />
        <MigrationSection variant="desktop" className="mx-auto w-[1512px]" />
        <FaqSection variant="desktop" className="mx-auto w-[1512px] scroll-mt-28" />
        <div className="mt-[64px] flex w-full max-w-[1512px] flex-col items-center justify-center gap-6 px-4 pb-[48px] sm:px-8 md:flex-row md:items-center md:justify-between md:px-[137px]">
          <div
            id="landing-footer"
            className="content-stretch flex min-w-0 flex-col items-center not-italic text-center whitespace-nowrap scroll-mt-28"
          >
            <p className="font-continuum leading-[47.662px] relative shrink-0 text-[#0b191f] text-[42.509px] tracking-[-0.8502px]">Continuum</p>
            <p className="font-['Sathu:Regular',sans-serif] leading-[normal] opacity-80 relative shrink-0 text-[#252014] text-[15.458px] tracking-[-0.1546px]">Time track with one click.</p>
          </div>
          <div className="shrink-0">
            <ComponentBackgroundImageAndText1 text="Join Waitlist" />
          </div>
        </div>
      </div>
    </div>
  );
}
