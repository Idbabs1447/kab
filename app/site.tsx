"use client";
import React, { useState, useEffect } from "react";
import {
  Menu,
  X,
  BookOpen,
  HeartPulse,
  Users,
  HandHeart,
  MapPin,
  Check,
  Settings2,
  Save,
  Download,
  Mail,
  ChevronDown,
} from "lucide-react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Toaster } from "@/components/ui/sonner";
import { toast } from "sonner";
import { ProgrammeDetail, ProgrammeDirectory, Opportunities, SupportPledge } from "./experiences";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
const educationSource =
  "https://www.westernpost.ng/kab-foundation-urges-utme-beneficiaries-to-excel-promises-full-sponsorship/";
const healthSource =
  "https://www.westernpost.ng/kab-foundation-offers-free-medical-care-to-500-lagos-assembly-workers/";
const defaults = {
  name: "Kassim Alli-Balogun Foundation",
  headline: "Opportunity.",
  headlineAccent: "Within reach.",
  intro: "Opening doors to education and bringing healthcare closer to the people who need it.",
  mission:
    "We believe a person’s circumstances should never define their possibilities. Through practical support in education and health, KAB Foundation helps people take their next step.",
  about:
    "Kassim Alli-Balogun Foundation supports communities through education and healthcare initiatives, with a wider focus on youth development and women’s empowerment. Our work brings together local partners, educators and health professionals to turn support into opportunities people can use.",
  cta: "A better future starts with people.",
  ctaBody:
    "Bring your time, expertise or partnership to the work. Together, we can help more people take their next step.",
  primary: "#163f32",
  accent: "#6b348a",
  gold: "#bc8b2c",
  background: "#fcfcf9",
  heroImage: "/images/outreach.jpg",
  educationImage: "/images/kassim.jpg",
  healthImage: "/images/health.webp",
  heroAlt:
    "A healthcare professional checking a participant’s blood pressure at the KAB Foundation medical outreach",
  email: "",
  phone: "",
  educationTitle: "A fairer start in education.",
  educationText:
    "Registration costs and unfamiliar exam technology can stand between a student and their next opportunity. Our Surulere initiative provided free UTME forms and computer-based test preparation for over 180 students.",
  healthTitle: "Care, closer to the community.",
  healthText:
    "Free screenings, consultations and treatment brought essential care to over 500 Lagos Assembly staff and legislative aides during the September 2026 outreach.",
  showImpact: true,
  showStories: true,
};
type Content = typeof defaults;
type Enquiry = {
  name: string;
  email: string;
  interest: string;
  message: string;
  date: string;
  status?: string;
};
const nav = [
  ["About", "/about"],
  ["Our programmes", "/programmes"],
  ["Our impact", "/impact"],
  ["Stories", "/stories"],
  ["Opportunities", "/opportunities"],
];
const sources = [
  {
    title: "Over 180 students receive UTME support",
    date: "16 April 2026",
    publisher: "Western Post",
    url: educationSource,
  },
  {
    title: "Medical outreach reaches over 500 Assembly workers",
    date: "28 September 2026",
    publisher: "Western Post",
    url: healthSource,
  },
  {
    title: "Foundation brings medical care to Lagos Assembly staff",
    date: "28 September 2026",
    publisher: "The Gazelle News",
    url: "https://www.thegazellenews.com/kab-foundation-brings-medical-care-to-over-500-lagos-assembly-staff-legislative-aides/",
  },
];
function ContentField({
  field,
  label,
  area = false,
  draft,
  setDraft,
}: {
  field: keyof Content;
  label: string;
  area?: boolean;
  draft: Content;
  setDraft: React.Dispatch<React.SetStateAction<Content>>;
}) {
  return (
    <label className="editor-field">
      {label}
      {area ? (
        <textarea
          rows={4}
          value={String(draft[field])}
          onChange={(e) => setDraft((prev) => ({ ...prev, [field]: e.target.value }))}
        />
      ) : (
        <input
          value={String(draft[field])}
          onChange={(e) => setDraft((prev) => ({ ...prev, [field]: e.target.value }))}
        />
      )}
    </label>
  );
}
export default function FoundationSite({ initialPath = "/" }: { initialPath?: string }) {
  const path = initialPath;
  const [content, setContent] = useState<Content>(defaults);
  const [draft, setDraft] = useState<Content>(defaults);
  const [loaded, setLoaded] = useState(false);
  const [menu, setMenu] = useState(false);
  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
  const [filter, setFilter] = useState("All");
  const [sent, setSent] = useState(false);
  const [contactInterest, setContactInterest] = useState("Partnership");
  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem("kab-content") || "null");
      if (saved) {
        setContent({ ...defaults, ...saved });
        setDraft({ ...defaults, ...saved });
      }
      setEnquiries(JSON.parse(localStorage.getItem("kab-enquiries") || "[]"));
    } catch {}
    const requested = new URLSearchParams(window.location.search).get("interest");
    if (
      requested &&
      [
        "Partnership",
        "Volunteering",
        "Supporting education",
        "Supporting healthcare",
        "Youth development",
        "Women’s empowerment",
        "In-kind support",
        "General enquiry",
      ].includes(requested)
    )
      setContactInterest(requested);
    setLoaded(true);
  }, []);
  useEffect(() => {
    setMenu(false);
    setSent(false);
    window.scrollTo(0, 0);
  }, [path]);

  const save = () => {
    try {
      localStorage.setItem("kab-content", JSON.stringify(draft));
      setContent(draft);
      toast.success("Changes saved. The website preview is updated.");
    } catch {
      toast.error("Your browser could not save these changes.");
    }
  };
  const reviewEnquiry = (index: number) => {
    const next = enquiries.map((q, i) =>
      i === index ? { ...q, status: q.status === "Reviewed" ? "New" : "Reviewed" } : q,
    );
    try {
      localStorage.setItem("kab-enquiries", JSON.stringify(next));
      setEnquiries(next);
      toast.success(
        next[index].status === "Reviewed"
          ? "Enquiry marked as reviewed."
          : "Enquiry marked as new.",
      );
    } catch {
      toast.error("Your browser could not save this change.");
    }
  };
  const exportContent = () => {
    const url = URL.createObjectURL(
      new Blob([JSON.stringify(content, null, 2)], { type: "application/json" }),
    );
    const a = document.createElement("a");
    a.href = url;
    a.download = "kab-foundation-content.json";
    a.click();
    URL.revokeObjectURL(url);
  };
  const style = {
    "--brand": content.primary,
    "--purple": content.accent,
    "--gold": content.gold,
    "--paper": content.background,
  } as React.CSSProperties;
  const Brand = ({ light = false }: { light?: boolean }) => (
    <a href="/" className={"brand " + (light ? "light" : "")} aria-label="KAB Foundation home">
      <span className="brand-letters">
        <b>K</b>
        <b>A</b>
        <b>B</b>
      </span>
      <span className="brand-name">
        KASSIM ALLI-BALOGUN<span>FOUNDATION</span>
      </span>
    </a>
  );
  const Button = ({
    href,
    children,
    outline = false,
  }: {
    href: string;
    children: React.ReactNode;
    outline?: boolean;
  }) => (
    <a className={"button " + (outline ? "outline" : "")} href={href}>
      {children}
    </a>
  );
  const Eyebrow = ({ children }: { children: React.ReactNode }) => (
    <p className="eyebrow">{children}</p>
  );
  const Photo = ({ health = false, className = "" }: { health?: boolean; className?: string }) => (
    <img
      className={"documentary " + className}
      src={
        className.includes("hero")
          ? content.heroImage
          : health
            ? content.healthImage
            : content.educationImage
      }
      alt={
        className.includes("hero")
          ? content.heroAlt
          : health
            ? "A blood pressure screening at the September 2026 Lagos Assembly outreach"
            : "Kassim Alli-Balogun, the foundation CEO"
      }
      loading={className.includes("hero") ? "eager" : "lazy"}
    />
  );
  const Metrics = () => (
    <div className="metrics">
      <div>
        <strong>
          180<span>+</span>
        </strong>
        <p>Students supported</p>
        <small>UTME forms & CBT preparation</small>
      </div>
      <div>
        <strong>
          500<span>+</span>
        </strong>
        <p>Outreach participants</p>
        <small>Free medical care · September 2026</small>
      </div>
      <div>
        <strong>100</strong>
        <p>Pairs of prescription glasses</p>
        <small>Provided during the medical outreach</small>
      </div>
    </div>
  );
  const ProgrammeRows = () => (
    <div className="programme-rows">
      <article className="programme-row">
        <div className="programme-copy">
          <Eyebrow>01 / Education</Eyebrow>
          <h3>{content.educationTitle}</h3>
          <p>{content.educationText}</p>
          <ul className="check-list">
            <li>
              <Check />
              Free UTME registration forms
            </li>
            <li>
              <Check />
              Computer-based test lessons
            </li>
            <li>
              <Check />
              Support for examination readiness
            </li>
          </ul>
          <Button href="/programmes/education" outline>
            Explore education
          </Button>
        </div>
        <figure>
          <Photo />
          <figcaption>Kassim Alli-Balogun · Foundation CEO</figcaption>
        </figure>
      </article>
      <article className="programme-row reverse">
        <div className="programme-copy">
          <Eyebrow>02 / Healthcare</Eyebrow>
          <h3>{content.healthTitle}</h3>
          <p>{content.healthText}</p>
          <ul className="check-list">
            <li>
              <Check />
              Health and eye screenings
            </li>
            <li>
              <Check />
              Medical consultations and treatment
            </li>
            <li>
              <Check />
              Prescription glasses
            </li>
          </ul>
          <Button href="/programmes/healthcare" outline>
            Explore healthcare
          </Button>
        </div>
        <figure>
          <Photo health />
          <figcaption>Lagos State House of Assembly · September 2026</figcaption>
        </figure>
      </article>
    </div>
  );
  const Cta = () => (
    <section className="cta">
      <div className="container cta-inner">
        <div>
          <Eyebrow>Be part of the work</Eyebrow>
          <h2>{content.cta}</h2>
          <p>{content.ctaBody}</p>
        </div>
        <Button href="/get-involved">Get involved</Button>
      </div>
    </section>
  );
  const Stories = () => (
    <div className="story-grid">
      {[
        {
          tag: "Education",
          date: "April 2026",
          title: "Removing barriers. Building confidence.",
          body: "Inside the UTME support initiative for students in Surulere.",
          href: "/stories/education",
          health: false,
        },
        {
          tag: "Healthcare",
          date: "September 2026",
          title: "An outreach built around people.",
          body: "Screenings, consultations and care at the Lagos Assembly.",
          href: "/stories/healthcare",
          health: true,
        },
      ]
        .filter((s) => filter === "All" || s.tag === filter)
        .map((s) => (
          <article className="story" key={s.title}>
            <a href={s.href} aria-label={s.title}>
              <Photo health={s.health} />
            </a>
            <div className="story-meta">
              <span>{s.tag}</span>
              <span>{s.date}</span>
            </div>
            <h3>
              <a href={s.href}>{s.title}</a>
            </h3>
            <p>{s.body}</p>
            <a className="text-link" href={s.href}>
              Read the story
            </a>
          </article>
        ))}
    </div>
  );
  const PageIntro = ({ label, title, body }: { label: string; title: string; body: string }) => (
    <section className="page-intro container">
      <Eyebrow>{label}</Eyebrow>
      <h1>{title}</h1>
      <p>{body}</p>
    </section>
  );
  function submitEnquiry(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const item = {
      name: String(f.get("name")),
      email: String(f.get("email")),
      interest: String(f.get("interest")),
      message: String(f.get("message")),
      date: new Date().toLocaleDateString("en-GB"),
      status: "New",
    };
    try {
      const next = [item, ...enquiries];
      localStorage.setItem("kab-enquiries", JSON.stringify(next));
      setEnquiries(next);
      setSent(true);
    } catch {
      toast.error("Your browser could not save this demo enquiry.");
    }
  }

  if (path === "/admin")
    return (
      <div style={style} className="admin">
        <Toaster />
        <header className="admin-header">
          <Brand />
          <span className="demo-label">Content studio · demo</span>
          <a className="button outline" href="/">
            View website
          </a>
        </header>
        <main className="studio container">
          <div className="studio-heading">
            <div>
              <Eyebrow>Make it yours</Eyebrow>
              <h1>Your website, your voice.</h1>
              <p>Preview content and brand changes before commissioning the full website.</p>
            </div>
            <button className="button" onClick={save} disabled={!loaded}>
              <Save size={18} />
              Save changes
            </button>
          </div>
          <div className="notice">
            <Settings2 size={20} />
            <p>
              This editor saves changes in this browser only. Demo enquiries and support pledges
              appear in the enquiries tab. A secure, shared back end will be connected in the full
              build. No sign-in is required for this demo.
            </p>
          </div>
          <Tabs defaultValue="content">
            <TabsList className="studio-tabs">
              <TabsTrigger value="content">Page content</TabsTrigger>
              <TabsTrigger value="brand">Brand & images</TabsTrigger>
              <TabsTrigger value="contact">Contact & enquiries</TabsTrigger>
              <TabsTrigger value="review">Launch checklist</TabsTrigger>
            </TabsList>
            <TabsContent value="content">
              <div className="editor-grid">
                <section className="editor-panel">
                  <h2>Home & about</h2>
                  <ContentField
                    draft={draft}
                    setDraft={setDraft}
                    field="name"
                    label="Foundation name"
                  />
                  <ContentField
                    draft={draft}
                    setDraft={setDraft}
                    field="headline"
                    label="Hero headline"
                  />
                  <ContentField
                    draft={draft}
                    setDraft={setDraft}
                    field="headlineAccent"
                    label="Hero second line"
                  />
                  <ContentField
                    draft={draft}
                    setDraft={setDraft}
                    field="intro"
                    label="Hero introduction"
                    area
                  />
                  <ContentField
                    draft={draft}
                    setDraft={setDraft}
                    field="mission"
                    label="Mission statement"
                    area
                  />
                  <ContentField
                    draft={draft}
                    setDraft={setDraft}
                    field="about"
                    label="About the foundation"
                    area
                  />
                </section>
                <section className="editor-panel">
                  <h2>Programmes & invitation</h2>
                  <ContentField
                    draft={draft}
                    setDraft={setDraft}
                    field="educationTitle"
                    label="Education heading"
                  />
                  <ContentField
                    draft={draft}
                    setDraft={setDraft}
                    field="educationText"
                    label="Education description"
                    area
                  />
                  <ContentField
                    draft={draft}
                    setDraft={setDraft}
                    field="healthTitle"
                    label="Healthcare heading"
                  />
                  <ContentField
                    draft={draft}
                    setDraft={setDraft}
                    field="healthText"
                    label="Healthcare description"
                    area
                  />
                  <ContentField
                    draft={draft}
                    setDraft={setDraft}
                    field="cta"
                    label="Get involved heading"
                  />
                  <ContentField
                    draft={draft}
                    setDraft={setDraft}
                    field="ctaBody"
                    label="Get involved description"
                    area
                  />
                  <div className="toggle">
                    <label htmlFor="impact-toggle">Show homepage impact section</label>
                    <Switch
                      id="impact-toggle"
                      checked={draft.showImpact}
                      onCheckedChange={(v) => setDraft({ ...draft, showImpact: v })}
                    />
                  </div>
                  <div className="toggle">
                    <label htmlFor="stories-toggle">Show homepage stories section</label>
                    <Switch
                      id="stories-toggle"
                      checked={draft.showStories}
                      onCheckedChange={(v) => setDraft({ ...draft, showStories: v })}
                    />
                  </div>
                </section>
              </div>
            </TabsContent>
            <TabsContent value="brand">
              <div className="editor-grid">
                <section className="editor-panel">
                  <h2>Brand colours</h2>
                  <p>
                    These colours carry through navigation, headings, buttons and section
                    backgrounds.
                  </p>
                  {(["primary", "accent", "gold", "background"] as const).map((k) => (
                    <label className="colour-field" key={k}>
                      <span>
                        {
                          {
                            primary: "Foundation green",
                            accent: "Accent purple",
                            gold: "Gold detail",
                            background: "Page background",
                          }[k]
                        }
                      </span>
                      <input
                        type="color"
                        value={draft[k]}
                        onChange={(e) => setDraft({ ...draft, [k]: e.target.value })}
                      />
                      <code>{draft[k]}</code>
                    </label>
                  ))}
                  <div
                    className="brand-sample"
                    style={{ background: draft.primary, color: "white" }}
                  >
                    <p>KAB FOUNDATION</p>
                    <h3 style={{ color: draft.gold }}>Opportunity.</h3>
                    <span style={{ color: "white" }}>Your brand in action</span>
                  </div>
                </section>
                <section className="editor-panel">
                  <h2>Programme imagery</h2>
                  <p>Use a full image URL or a provided asset path.</p>
                  <ContentField
                    draft={draft}
                    setDraft={setDraft}
                    field="heroImage"
                    label="Homepage hero image"
                  />
                  <ContentField
                    draft={draft}
                    setDraft={setDraft}
                    field="heroAlt"
                    label="Hero image description"
                  />
                  <ContentField
                    draft={draft}
                    setDraft={setDraft}
                    field="educationImage"
                    label="Education story / CEO portrait"
                  />
                  <ContentField
                    draft={draft}
                    setDraft={setDraft}
                    field="healthImage"
                    label="Healthcare image"
                  />
                  <div className="image-previews">
                    <img src={draft.heroImage} alt="Hero preview" />
                    <img src={draft.healthImage} alt="Healthcare preview" />
                  </div>
                </section>
              </div>
            </TabsContent>
            <TabsContent value="contact">
              <div className="editor-grid">
                <section className="editor-panel">
                  <h2>Official contact details</h2>
                  <p>
                    Leave these blank until the foundation confirms them. They will appear on the
                    contact page after saving.
                  </p>
                  <ContentField
                    draft={draft}
                    setDraft={setDraft}
                    field="email"
                    label="Public email address"
                  />
                  <ContentField
                    draft={draft}
                    setDraft={setDraft}
                    field="phone"
                    label="Public phone number"
                  />
                  <p className="small-text">
                    A production build will connect enquiry delivery, team access and consent
                    handling.
                  </p>
                </section>
                <section className="editor-panel">
                  <h2>
                    Demo enquiries <span className="count">{enquiries.length}</span>
                  </h2>
                  {!enquiries.length ? (
                    <div className="empty">
                      <Mail />
                      <h3>No enquiries yet</h3>
                      <p>Try the Get Involved form to see an enquiry appear here.</p>
                      <a className="text-link" href="/get-involved">
                        Open the form
                      </a>
                    </div>
                  ) : (
                    enquiries.map((q, i) => (
                      <article className="enquiry" key={i}>
                        <div>
                          <strong>{q.name}</strong>
                          <small>{q.date}</small>
                        </div>
                        <p>
                          {q.email} · {q.interest}
                        </p>
                        <p>{q.message}</p>
                        <div className="enquiry-status">
                          <span>{q.status || "New"}</span>
                          <button className="text-link" onClick={() => reviewEnquiry(i)}>
                            {q.status === "Reviewed" ? "Mark as new" : "Mark reviewed"}
                          </button>
                        </div>
                      </article>
                    ))
                  )}
                </section>
              </div>
            </TabsContent>
            <TabsContent value="review">
              <section className="editor-panel launch">
                <h2>Before the real website goes live</h2>
                <p>The design is ready to discuss. These details need the foundation’s approval.</p>
                {[
                  "Official logo files, legal name and registration details",
                  "Leadership biographies, mission statement and founding date",
                  "Permission to use programme photographs and press coverage",
                  "Confirmed email, phone, office address and social profiles",
                  "Donation process, bank details and payment provider",
                  "Secure editor access, enquiry delivery and privacy policy",
                ].map((v, i) => (
                  <div key={v} className="launch-row">
                    <span>{String(i + 1).padStart(2, "0")}</span>
                    {v}
                  </div>
                ))}
                <h3>Research used in this prototype</h3>
                {sources.map((s) => (
                  <a
                    className="source-link"
                    href={s.url}
                    target="_blank"
                    rel="noreferrer"
                    key={s.url}
                  >
                    {s.publisher} · {s.title}
                    <small>{s.date}</small>
                  </a>
                ))}
              </section>
            </TabsContent>
          </Tabs>
          <div className="studio-bottom">
            <button className="button outline" onClick={exportContent}>
              <Download size={17} />
              Export saved content
            </button>
            <button
              className="text-link"
              onClick={() => {
                setDraft(defaults);
                toast.info("Original content loaded into the editor. Save changes to apply it.");
              }}
            >
              Load original content
            </button>
            <p>Changes apply when you select Save changes.</p>
          </div>
        </main>
      </div>
    );
  return (
    <div className="site" style={style}>
      <Toaster />
      <a className="skip" href="#main">
        Skip to content
      </a>
      <div className="topbar">
        <span>Local action. Lasting possibility.</span>
        <span>Lagos, Nigeria</span>
      </div>
      <header className="header">
        <div className="container header-inner">
          <Brand />
          <nav className={menu ? "nav open" : "nav"} aria-label="Main navigation">
            {nav.map(([label, href]) =>
              href === "/programmes" ? (
                <div className="nav-programmes" key={href}>
                  <a href={href} className={path.startsWith(href) ? "active" : ""}>
                    {label}
                  </a>
                  <DropdownMenu>
                    <DropdownMenuTrigger
                      className="submenu-trigger"
                      aria-label="Open programme menu"
                    >
                      <ChevronDown size={15} />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="start" className="programme-dropdown">
                      {[
                        ["All programmes", "/programmes"],
                        ["Education", "/programmes/education"],
                        ["Healthcare", "/programmes/healthcare"],
                        ["Youth development", "/programmes/youth-development"],
                        ["Women’s empowerment", "/programmes/women-empowerment"],
                      ].map(([n, h]) => (
                        <DropdownMenuItem asChild key={h}>
                          <a href={h}>{n}</a>
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              ) : (
                <a key={href} href={href} className={path.startsWith(href) ? "active" : ""}>
                  {label}
                </a>
              ),
            )}
            <a className="button small" href="/get-involved">
              Get involved
            </a>
          </nav>
          <button
            className="menu-button"
            onClick={() => setMenu(!menu)}
            aria-label={menu ? "Close navigation" : "Open navigation"}
            aria-expanded={menu}
          >
            {menu ? <X /> : <Menu />}
          </button>
        </div>
      </header>
      <main id="main">
        {path !== "/" && (
          <div className="container breadcrumbs" aria-label="Breadcrumb">
            <a href="/">Home</a>
            <span>/</span>
            {path
              .split("/")
              .filter(Boolean)
              .map((part, i, parts) => (
                <React.Fragment key={part}>
                  {i > 0 && <span>/</span>}
                  <a
                    aria-current={i === parts.length - 1 ? "page" : undefined}
                    href={"/" + parts.slice(0, i + 1).join("/")}
                  >
                    {(
                      {
                        programmes: "Our programmes",
                        stories: "Stories",
                        impact: "Our impact",
                        about: "About",
                        contact: "Contact",
                        opportunities: "Opportunities",
                        support: "Support",
                        education: "Education",
                        healthcare: "Healthcare",
                        "youth-development": "Youth development",
                        "women-empowerment": "Women’s empowerment",
                        "get-involved": "Get involved",
                        privacy: "Privacy",
                      } as Record<string, string>
                    )[part] || part}
                  </a>
                </React.Fragment>
              ))}
          </div>
        )}
        {path === "/" ? (
          <>
            <section className="hero container">
              <div className="hero-copy">
                <Eyebrow>THE KASSIM ALLI-BALOGUN FOUNDATION</Eyebrow>
                <h1>
                  {content.headline}
                  <em>{content.headlineAccent}</em>
                </h1>
                <p>{content.intro}</p>
                <div className="hero-actions">
                  <Button href="/programmes">Discover our work</Button>
                  <a href="/about" className="text-link">
                    Meet the foundation
                  </a>
                </div>
                <div className="hero-note">
                  <span className="note-line" />
                  <p>Education. Health. Possibility.</p>
                </div>
              </div>
              <figure className="hero-figure">
                <Photo className="hero-photo" />
                <div className="photo-caption">
                  <span>LAGOS ASSEMBLY OUTREACH</span>
                  <p>Care that meets people where they are.</p>
                </div>
                <span className="photo-index">01 / IN OUR COMMUNITIES</span>
              </figure>
            </section>
            <section className="belief">
              <div className="container belief-inner">
                <span>Our purpose</span>
                <h2>
                  When barriers come down,
                  <br />
                  possibilities open up.
                </h2>
                <p>{content.mission}</p>
              </div>
            </section>
            <section className="section container">
              <div className="section-heading">
                <div>
                  <Eyebrow>Practical help. Meaningful change.</Eyebrow>
                  <h2>
                    Where we put
                    <br />
                    our purpose to work.
                  </h2>
                </div>
                <p>
                  From an examination form to a health screening, small interventions can make a
                  meaningful difference.
                </p>
              </div>
              <ProgrammeRows />
            </section>
            {content.showImpact && (
              <section className="impact-band">
                <div className="container">
                  <Eyebrow>Our work in 2026</Eyebrow>
                  <div className="impact-heading">
                    <h2>
                      People at the centre.
                      <br />
                      Progress you can see.
                    </h2>
                    <a href="/impact" className="text-link">
                      Explore our impact
                    </a>
                  </div>
                  <Metrics />
                  <p className="metric-note">
                    Reported programme figures from April and September 2026. Each measure relates
                    to its own initiative.
                  </p>
                </div>
              </section>
            )}
            <section className="section container">
              <div className="focus-intro">
                <Eyebrow>A wider vision</Eyebrow>
                <h2>
                  Helping people move forward,
                  <br />
                  at every stage of life.
                </h2>
              </div>
              <div className="focus-grid">
                {[
                  [
                    BookOpen,
                    "Education",
                    "Opening pathways to learning and examination readiness.",
                  ],
                  [
                    HeartPulse,
                    "Healthcare",
                    "Making essential care and preventive screenings accessible.",
                  ],
                  [
                    Users,
                    "Youth development",
                    "A focus on helping young people build their future.",
                  ],
                  [
                    HandHeart,
                    "Women’s empowerment",
                    "A focus on opportunity and support for women.",
                  ],
                ].map(([Icon, title, text]) => {
                  const I = Icon as typeof BookOpen;
                  return (
                    <div className="focus-item" key={String(title)}>
                      <I />
                      <h3>{String(title)}</h3>
                      <p>{String(text)}</p>
                    </div>
                  );
                })}
              </div>
            </section>
            {content.showStories && (
              <section className="stories-section">
                <div className="container">
                  <div className="section-heading">
                    <div>
                      <Eyebrow>From our communities</Eyebrow>
                      <h2>
                        The work behind
                        <br />
                        the numbers.
                      </h2>
                    </div>
                    <a className="text-link" href="/stories">
                      All stories
                    </a>
                  </div>
                  <Stories />
                </div>
              </section>
            )}
            <Cta />
          </>
        ) : path === "/about" ? (
          <>
            <PageIntro
              label="Meet the foundation"
              title="Possibility begins with practical support."
              body={content.about}
            />
            <section className="container about-feature">
              <Photo />
              <div>
                <Eyebrow>Our purpose</Eyebrow>
                <h2>Support that meets people where they are.</h2>
                <p>{content.mission}</p>
                <p>
                  Our 2026 initiatives have focused on two everyday barriers: the cost of preparing
                  for higher education, and access to essential healthcare.
                </p>
              </div>
            </section>
            <section className="section container">
              <div className="section-heading">
                <h2>
                  Rooted in community.
                  <br />
                  Built through collaboration.
                </h2>
                <p>
                  Educators, healthcare professionals and local partners help turn good intentions
                  into practical support.
                </p>
              </div>
              <div className="about-columns">
                <div>
                  <span className="number">01</span>
                  <h3>Education with local expertise</h3>
                  <p>
                    The Surulere initiative worked with Solution Education Consult Ltd, with CBT
                    lessons held at Gbaja Boys Senior High School.
                  </p>
                </div>
                <div>
                  <span className="number">02</span>
                  <h3>Care through partnership</h3>
                  <p>
                    The Lagos Assembly medical outreach was supported in partnership with PASAN’s
                    Lagos State Branch and a team of healthcare professionals.
                  </p>
                </div>
                <div>
                  <span className="number">03</span>
                  <h3>People behind the work</h3>
                  <p>
                    Public coverage identifies Kassim Alli-Balogun as the foundation’s CEO. Ms
                    Omolola Alli-Balogun represented him at its reported programmes.
                  </p>
                </div>
              </div>
            </section>
            <Cta />
          </>
        ) : path === "/programmes" ? (
          <>
            <PageIntro
              label="Our programmes"
              title="Turning care into action."
              body="Explore our education and healthcare initiatives, alongside the foundation’s wider focus on youth development and women’s empowerment."
            />
            <ProgrammeDirectory
              educationImage={content.educationImage}
              healthImage={content.healthImage}
            />
            <Cta />
          </>
        ) : path.startsWith("/programmes/") ? (
          <>
            <ProgrammeDetail slug={path.split("/").pop()!} />
            <Cta />
          </>
        ) : path === "/impact" ? (
          <>
            <PageIntro
              label="Our impact"
              title="Every number begins with a person."
              body="A snapshot of the foundation’s reported education and healthcare work in Lagos during 2026."
            />
            <section className="impact-band">
              <div className="container">
                <Metrics />
                <p className="metric-note">
                  Programme figures reflect public reporting; the measures should not be added
                  together as a unique beneficiary total.
                </p>
              </div>
            </section>
            <section className="section container">
              <Eyebrow>2026 / Programme timeline</Eyebrow>
              <div className="timeline">
                <article>
                  <span>MAR—APR</span>
                  <div>
                    <h2>Preparing for the next step.</h2>
                    <p>
                      Over 180 students in Surulere received free UTME forms and CBT preparation.
                      Lessons began on 30 March at Gbaja Boys Senior High School.
                    </p>
                    <a className="text-link" href="/stories/education">
                      Read the education story
                    </a>
                  </div>
                </article>
                <article>
                  <span>SEPTEMBER</span>
                  <div>
                    <h2>Bringing care within reach.</h2>
                    <p>
                      The outreach at Lateef Jakande Auditorium offered screenings, consultations
                      and treatment to over 500 staff and legislative aides. A team of 30 doctors
                      and other health professionals supported the event.
                    </p>
                    <a className="text-link" href="/stories/healthcare">
                      Read the healthcare story
                    </a>
                  </div>
                </article>
              </div>
            </section>
            <section className="sources container">
              <Eyebrow>In the news</Eyebrow>
              <h2>Our work, as reported.</h2>
              {sources.map((s) => (
                <a
                  className="source-link"
                  key={s.url}
                  href={s.url}
                  target="_blank"
                  rel="noreferrer"
                >
                  <span>{s.publisher}</span>
                  <h3>{s.title}</h3>
                  <small>{s.date} · Read coverage</small>
                </a>
              ))}
            </section>
            <Cta />
          </>
        ) : path === "/stories" ? (
          <>
            <PageIntro
              label="Stories & updates"
              title="The work. The people. The possibilities."
              body="Explore the foundation’s education and medical outreach initiatives, through the programmes that brought them to life."
            />
            <section className="container section stories-list">
              <Tabs value={filter} onValueChange={setFilter}>
                <TabsList className="story-filters">
                  {["All", "Education", "Healthcare"].map((f) => (
                    <TabsTrigger value={f} key={f}>
                      {f}
                    </TabsTrigger>
                  ))}
                </TabsList>
              </Tabs>
              <Stories />
            </section>
            <Cta />
          </>
        ) : path === "/stories/education" || path === "/stories/healthcare" ? (
          <>
            <PageIntro
              label={
                path.includes("/education")
                  ? "Education / Surulere, Lagos"
                  : "Healthcare / Lagos Assembly"
              }
              title={
                path.includes("/education")
                  ? "Removing barriers. Building confidence."
                  : "An outreach built around people."
              }
              body={
                path.includes("/education")
                  ? "Free UTME forms and CBT preparation helped over 180 students take a step towards higher education."
                  : "Free screenings, consultations and treatment brought care to over 500 staff and legislative aides."
              }
            />
            <article className="article container">
              <figure>
                <Photo health={path.includes("/healthcare")} />
                <figcaption>
                  {path.includes("/education")
                    ? "March–April 2026 · Surulere"
                    : "September 2026 · Lagos State House of Assembly"}
                </figcaption>
              </figure>
              <div className="article-body">
                {path.includes("/education") ? (
                  <>
                    <Eyebrow>Education in action</Eyebrow>
                    <h2>A form can open a door.</h2>
                    <p>{content.educationText}</p>
                    <p>
                      CBT lessons began on 30 March 2026 at Gbaja Boys Senior High School and
                      continued into April. Mr Monday Kayode Adodo, Head of Solution Education
                      Consult Ltd, coordinated the initiative.
                    </p>
                    <h3>Preparing for the opportunity</h3>
                    <p>
                      The programme combined help with registration costs and practice using
                      computer-based examinations. Beneficiaries were encouraged to prepare
                      thoroughly and aim for strong results.
                    </p>
                    <p>
                      The foundation also expressed its intention to sponsor high-performing
                      beneficiaries who secure admission. Further details on those awards have not
                      been published in the sources reviewed.
                    </p>
                    <div className="article-stat">
                      <strong>180+</strong>
                      <span>Students supported with registration and exam preparation.</span>
                    </div>
                  </>
                ) : (
                  <>
                    <Eyebrow>Care in action</Eyebrow>
                    <h2>Access to care makes a difference.</h2>
                    <p>{content.healthText}</p>
                    <p>
                      The event took place at Lateef Jakande Auditorium during PASAN Week, in
                      partnership with the Parliamentary Staff Association of Nigeria, Lagos State
                      Branch.
                    </p>
                    <h3>Screening, advice and treatment</h3>
                    <p>
                      Services included blood pressure and blood sugar checks, eye screenings,
                      dental care, physiotherapy and other medical screenings. Participants could
                      access consultations and treatment, including malaria care.
                    </p>
                    <p>
                      A team of 30 doctors and other healthcare professionals, led by Dr Eniye
                      Aprezi of the Atti Theresa Foundation, supported the outreach. One hundred
                      pairs of prescription glasses were provided.
                    </p>
                    <div className="article-stat">
                      <strong>500+</strong>
                      <span>Staff and legislative aides reached through the outreach.</span>
                    </div>
                  </>
                )}
                <p className="article-source">
                  Based on public programme coverage.{" "}
                  <a
                    href={path.includes("/education") ? educationSource : healthSource}
                    target="_blank"
                    rel="noreferrer"
                  >
                    Read the original report at Western Post
                  </a>
                  .
                </p>
                <Button href="/get-involved">Partner with the foundation</Button>
              </div>
            </article>
            <Cta />
          </>
        ) : path === "/opportunities" || path === "/get-involved" ? (
          <>
            <Opportunities />
            <Cta />
          </>
        ) : path === "/support" ? (
          <SupportPledge />
        ) : path === "/contact" ? (
          <>
            <PageIntro
              label="Contact the foundation"
              title="Let’s start a conversation."
              body="Support an education initiative, bring professional expertise or explore a community partnership. Start a conversation about how you can contribute."
            />
            <section className="contact-layout container">
              <div>
                <div className="ways">
                  <article>
                    <BookOpen />
                    <div>
                      <h3>
                        <a href="/support">Support a programme</a>
                      </h3>
                      <p>Help remove barriers to education and essential healthcare.</p>
                    </div>
                  </article>
                  <article>
                    <Users />
                    <div>
                      <h3>
                        <a href="/contact?interest=Volunteering">Volunteer your expertise</a>
                      </h3>
                      <p>Bring skills in education, health, outreach or community support.</p>
                    </div>
                  </article>
                  <article>
                    <HandHeart />
                    <div>
                      <h3>
                        <a href="/contact?interest=Partnership">Build a partnership</a>
                      </h3>
                      <p>Explore how your organisation can contribute to future initiatives.</p>
                    </div>
                  </article>
                </div>
                <div className="contact-details">
                  <Eyebrow>Connect with us</Eyebrow>
                  <p>
                    <MapPin size={18} />
                    Lagos, Nigeria
                  </p>
                  {content.email && (
                    <p>
                      <Mail size={18} />
                      <a href={"mailto:" + content.email}>{content.email}</a>
                    </p>
                  )}
                  {content.phone && (
                    <p>
                      <a href={"tel:" + content.phone}>{content.phone}</a>
                    </p>
                  )}
                  <p className="small-text">
                    Official contact and donation details will be added when confirmed by the
                    foundation.
                  </p>
                </div>
              </div>
              <div className="contact-form">
                {sent ? (
                  <div className="form-success" role="status">
                    <span>
                      <Check />
                    </span>
                    <h2>Thank you for your interest.</h2>
                    <p>
                      Your enquiry has been saved in this browser for the prototype. It has not been
                      sent to the foundation. You can view it in the Preview Editor’s enquiries tab.
                    </p>
                    <a className="text-link" href="/admin">
                      View saved enquiries
                    </a>
                    <button className="button outline" onClick={() => setSent(false)}>
                      Write another enquiry
                    </button>
                  </div>
                ) : (
                  <form onSubmit={submitEnquiry}>
                    <Eyebrow>Start a conversation</Eyebrow>
                    <h2>How would you like to help?</h2>
                    <label>
                      Full name
                      <input
                        name="name"
                        autoComplete="name"
                        required
                        placeholder="Your name"
                        maxLength={120}
                      />
                    </label>
                    <label>
                      Email address
                      <input
                        name="email"
                        type="email"
                        autoComplete="email"
                        required
                        placeholder="you@example.com"
                        maxLength={200}
                      />
                    </label>
                    <label>
                      I am interested in
                      <Select
                        name="interest"
                        value={contactInterest}
                        onValueChange={setContactInterest}
                      >
                        <SelectTrigger className="interest-select" aria-label="Area of interest">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {[
                            "Partnership",
                            "Volunteering",
                            "Supporting education",
                            "Supporting healthcare",
                            "Youth development",
                            "Women’s empowerment",
                            "In-kind support",
                            "General enquiry",
                          ].map((v) => (
                            <SelectItem value={v} key={v}>
                              {v}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </label>
                    <label>
                      Your message
                      <textarea
                        name="message"
                        rows={4}
                        required
                        maxLength={3000}
                        placeholder="Tell us a little about your interest."
                      />
                    </label>
                    <p className="form-note">
                      Prototype form: your enquiry stays in this browser and is not sent. Please use
                      sample details.
                    </p>
                    <button className="button" type="submit">
                      Save demo enquiry
                    </button>
                  </form>
                )}
              </div>
            </section>
          </>
        ) : path === "/privacy" ? (
          <>
            <PageIntro
              label="Your privacy"
              title="A considered approach to your information."
              body="This is a website prototype for presentation. Its demo editor and enquiry form store information only in your browser."
            />
            <section className="article-body container privacy">
              <h2>What this prototype stores</h2>
              <p>
                Content changes and demo enquiries are stored using your browser’s local storage.
                They are not sent to the foundation. Avoid entering personal or sensitive
                information into the demo form.
              </p>
              <h2>External coverage</h2>
              <p>
                Links to press reports open third-party websites, which have their own privacy
                policies.
              </p>
              <h2>Programme photography</h2>
              <p>
                Programme imagery is drawn from public coverage by{" "}
                <a
                  className="text-link"
                  href="https://www.firstweeklymagazine.com/kab-foundation-brings-medical-care-to-over-500-lagos-assembly-staff-legislative-aides/"
                  target="_blank"
                  rel="noreferrer"
                >
                  First Weekly
                </a>{" "}
                and Western Post. Publication permission will be confirmed with the rights holders
                before the foundation’s website launches.
              </p>
              <h2>Before launch</h2>
              <p>
                The foundation’s final privacy notice, contact details, consent requirements and
                data handling arrangements will be confirmed before the production website launches.
              </p>
            </section>
          </>
        ) : (
          <>
            <PageIntro
              label="Page not found"
              title="Let’s get you back to the work."
              body="The page you’re looking for isn’t available."
            />
            <section className="container section">
              <Button href="/">Back to home</Button>
            </section>
          </>
        )}
      </main>
      <footer className="footer">
        <div className="container footer-top">
          <div>
            <Brand light />
            <p>
              {content.name}
              <br />
              Education. Health. Possibility.
            </p>
          </div>
          <div>
            <h3>Explore</h3>
            {nav.map(([n, h]) => (
              <a href={h} key={h}>
                {n}
              </a>
            ))}
          </div>
          <div>
            <h3>Join the work</h3>
            <a href="/contact?interest=Partnership">Partner with us</a>
            <a href="/opportunities">Volunteer & opportunities</a>
            <a href="/support">Support a programme</a>
            <a href="/contact">Contact</a>
          </div>
          <div className="footer-purpose">
            <Eyebrow>Rooted in Lagos</Eyebrow>
            <h3>
              Possibility grows
              <br />
              when people care.
            </h3>
          </div>
        </div>
        <div className="container footer-bottom">
          <span>© 2026 {content.name}</span>
          <div>
            <a href="/privacy">Privacy</a>
            <a href="/admin">Preview editor</a>
            <span>Presentation prototype</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
