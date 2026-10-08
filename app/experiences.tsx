"use client";
import React, { useState } from "react";
import { BookOpen, HeartPulse, Users, HandHeart, Check, MapPin, CalendarDays } from "lucide-react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { toast } from "sonner";
export const programmes = [
  {
    slug: "education",
    category: "Education",
    icon: BookOpen,
    title: "A fairer start in education.",
    intro:
      "Helping students overcome the cost of registration and prepare confidently for computer-based examinations.",
    status: "2026 initiative completed",
    date: "March–April 2026",
    place: "Surulere, Lagos",
    audience: "Financially disadvantaged students preparing for UTME",
    summary:
      "The foundation provided free UTME registration forms and CBT lessons to over 180 students. Lessons began on 30 March at Gbaja Boys Senior High School, with support from Solution Education Consult Ltd.",
    items: [
      "Free UTME registration forms",
      "Practical computer-based test preparation",
      "Encouragement and support for examination readiness",
    ],
    outcome: "180+ students supported",
    story: "/stories/education",
    interest: "Supporting education",
  },
  {
    slug: "healthcare",
    category: "Healthcare",
    icon: HeartPulse,
    title: "Care, closer to the community.",
    intro:
      "Making health screenings, consultations and treatment available through community outreach.",
    status: "2026 initiative completed",
    date: "September 2026",
    place: "Lagos State House of Assembly",
    audience: "Assembly staff, commission staff and legislative aides",
    summary:
      "The outreach at Lateef Jakande Auditorium reached over 500 participants during PASAN Week. A team of 30 doctors and other healthcare professionals supported the event, in partnership with PASAN’s Lagos State Branch.",
    items: [
      "Blood pressure, blood sugar and other health screenings",
      "Medical consultations, dental care and physiotherapy",
      "Eye screenings and 100 pairs of prescription glasses",
    ],
    outcome: "500+ outreach participants",
    story: "/stories/healthcare",
    interest: "Supporting healthcare",
  },
  {
    slug: "youth-development",
    category: "Youth development",
    icon: Users,
    title: "Helping young people take their next step.",
    intro: "Youth development is part of the foundation’s wider focus on people and possibility.",
    status: "Area of focus",
    date: "Future updates to be announced",
    place: "Lagos, Nigeria",
    audience: "Young people and community partners",
    summary:
      "The education initiative is a practical example of support for young people. Separate youth development programme dates, eligibility criteria and application arrangements have not yet been confirmed in the public information reviewed.",
    items: [
      "Explore a youth-focused partnership",
      "Offer relevant professional expertise",
      "Register interest in future programme updates",
    ],
    outcome: "Growing opportunities for young people",
    story: "",
    interest: "Youth development",
  },
  {
    slug: "women-empowerment",
    category: "Women’s empowerment",
    icon: HandHeart,
    title: "More opportunity for women.",
    intro: "Women’s empowerment is a stated part of the foundation’s wider vision.",
    status: "Area of focus",
    date: "Future updates to be announced",
    place: "Lagos, Nigeria",
    audience: "Women, professionals and partner organisations",
    summary:
      "Detailed information about a separate women’s empowerment initiative has not yet been confirmed. Partners can register an interest in contributing expertise, resources or programme support.",
    items: [
      "Explore a women-focused partnership",
      "Contribute skills and professional experience",
      "Register interest in future opportunities",
    ],
    outcome: "A commitment to women’s opportunities",
    story: "",
    interest: "Women’s empowerment",
  },
];
export function ProgrammeDetail({ slug }: { slug: string }) {
  const p = programmes.find((v) => v.slug === slug)!;
  const Icon = p.icon;
  return (
    <>
      <section className="page-intro container">
        <p className="eyebrow">Our programmes / {p.category}</p>
        <h1>{p.title}</h1>
        <p>{p.intro}</p>
      </section>
      <section className="programme-detail container">
        <div className="programme-main">
          <span className="programme-status">{p.status}</span>
          <h2>What this work involves</h2>
          <p>{p.summary}</p>
          <ul className="check-list">
            {p.items.map((t) => (
              <li key={t}>
                <Check />
                {t}
              </li>
            ))}
          </ul>
          <div className="programme-outcome">
            <Icon />
            <h3>{p.outcome}</h3>
          </div>
          <div className="detail-actions">
            {p.story && (
              <a className="button" href={p.story}>
                Read the programme story
              </a>
            )}
            <a
              className="button outline"
              href={"/contact?interest=" + encodeURIComponent(p.interest)}
            >
              Support this area
            </a>
          </div>
        </div>
        <aside className="programme-facts">
          <h3>Programme details</h3>
          <div>
            <CalendarDays />
            <p>
              <strong>When</strong>
              {p.date}
            </p>
          </div>
          <div>
            <MapPin />
            <p>
              <strong>Where</strong>
              {p.place}
            </p>
          </div>
          <div>
            <Users />
            <p>
              <strong>Who it serves</strong>
              {p.audience}
            </p>
          </div>
          <p className="small-text">
            There is no open application window confirmed here. Register interest to demonstrate the
            enquiry flow.
          </p>
          <a className="text-link" href="/opportunities">
            Explore ways to get involved
          </a>
        </aside>
      </section>
      <section className="container faq-section">
        <p className="eyebrow">Useful to know</p>
        <h2>Questions about this programme</h2>
        <Accordion type="single" collapsible>
          <AccordionItem value="apply">
            <AccordionTrigger>Can I apply or register now?</AccordionTrigger>
            <AccordionContent>
              No live application window is confirmed in this prototype. The education and
              healthcare initiatives shown took place in 2026. You can use the enquiry form to
              register interest in future activity.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="help">
            <AccordionTrigger>How can I contribute?</AccordionTrigger>
            <AccordionContent>
              Individuals and organisations can explore programme support, volunteering and
              partnerships.{" "}
              <a className="text-link" href={"/contact?interest=" + encodeURIComponent(p.interest)}>
                Start an enquiry about {p.category.toLowerCase()}
              </a>
              .
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="details">
            <AccordionTrigger>Where does the programme information come from?</AccordionTrigger>
            <AccordionContent>
              The completed initiatives are based on published programme coverage.{" "}
              <a className="text-link" href="/impact">
                View the impact timeline and source reports
              </a>
              . Detailed information about the foundation’s wider areas of focus will be confirmed
              before launch.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </section>
      <section className="related-programmes container">
        <div className="section-heading">
          <h2>Explore more of our work.</h2>
          <a className="text-link" href="/programmes">
            All programmes
          </a>
        </div>
        <div className="related-grid">
          {programmes
            .filter((v) => v.slug !== slug)
            .map((v) => (
              <a key={v.slug} href={"/programmes/" + v.slug}>
                <span>{v.category}</span>
                <h3>{v.title}</h3>
                <p>{v.status}</p>
              </a>
            ))}
        </div>
      </section>
    </>
  );
}
export function Opportunities() {
  return (
    <>
      <section className="page-intro container">
        <p className="eyebrow">Get involved / Opportunities</p>
        <h1>Your contribution can open a door.</h1>
        <p>
          Explore ways to contribute your time, resources or professional experience to the
          foundation’s work.
        </p>
      </section>
      <section className="container opportunities">
        <Tabs defaultValue="volunteer">
          <TabsList className="opportunity-tabs">
            <TabsTrigger value="volunteer">Volunteer</TabsTrigger>
            <TabsTrigger value="partner">Partner with us</TabsTrigger>
            <TabsTrigger value="support">Support a programme</TabsTrigger>
          </TabsList>
          <TabsContent value="volunteer">
            <div className="opportunity-panel">
              <div>
                <p className="eyebrow">Bring your skills</p>
                <h2>Make your experience useful.</h2>
                <p>
                  Register your interest in helping with education, healthcare or community
                  programme support. Share your skills, availability and the area you would like to
                  contribute to.
                </p>
                <a className="button" href="/contact?interest=Volunteering">
                  Register volunteer interest
                </a>
              </div>
              <div className="opportunity-roles">
                <h3>Ways you could contribute</h3>
                <ul className="check-list">
                  <li>
                    <BookOpen />
                    Education and exam preparation
                  </li>
                  <li>
                    <HeartPulse />
                    Health professional expertise
                  </li>
                  <li>
                    <Users />
                    Programme and community support
                  </li>
                </ul>
                <p className="small-text">
                  These are areas for expressing interest, rather than advertised vacancies. Roles
                  and requirements will be confirmed by the foundation.
                </p>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="partner">
            <div className="opportunity-panel">
              <div>
                <p className="eyebrow">Work together</p>
                <h2>A shared purpose. Practical action.</h2>
                <p>
                  Schools, organisations, professional networks and community groups can explore
                  supporting programme delivery, resources or professional services.
                </p>
                <a className="button" href="/contact?interest=Partnership">
                  Start a partnership enquiry
                </a>
              </div>
              <div className="opportunity-roles">
                <h3>Start with a conversation</h3>
                <ol>
                  <li>Introduce your organisation and expertise.</li>
                  <li>Tell us which area you would like to support.</li>
                  <li>Outline your proposed contribution.</li>
                </ol>
                <a className="text-link" href="/programmes">
                  Explore programme areas
                </a>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="support">
            <div className="opportunity-panel">
              <div>
                <p className="eyebrow">Support the work</p>
                <h2>Help make the next step possible.</h2>
                <p>
                  Explore support for education or healthcare. This prototype includes a
                  demonstration pledge flow, with no money collected.
                </p>
                <a className="button" href="/support">
                  Make a demo support pledge
                </a>
              </div>
              <div className="opportunity-roles">
                <h3>Explore an area of support</h3>
                <a className="opportunity-link" href="/programmes/education">
                  Education and UTME preparation
                </a>
                <a className="opportunity-link" href="/programmes/healthcare">
                  Community medical outreach
                </a>
                <a className="opportunity-link" href="/contact?interest=In-kind%20support">
                  Discuss resources or in-kind support
                </a>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </section>
      <section className="container faq-section">
        <h2>Before you get involved</h2>
        <Accordion type="single" collapsible>
          <AccordionItem value="live">
            <AccordionTrigger>Are there currently open volunteer roles?</AccordionTrigger>
            <AccordionContent>
              Confirmed vacancies and programme schedules will be supplied by the foundation. You
              can demonstrate the interest registration process using the enquiry form.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="donate">
            <AccordionTrigger>Can I make a donation here?</AccordionTrigger>
            <AccordionContent>
              The support flow is a prototype. No payment is processed. Official donation
              arrangements will be connected after the foundation confirms them.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="next">
            <AccordionTrigger>What happens when I submit an enquiry?</AccordionTrigger>
            <AccordionContent>
              The enquiry is saved in this browser and appears in the Preview Editor’s enquiries
              tab. It is not emailed to the foundation in this prototype.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </section>
    </>
  );
}
export function SupportPledge() {
  const [step, setStep] = useState(0);
  const [amount, setAmount] = useState("25000");
  const [programme, setProgramme] = useState("Education");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const currency = new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    maximumFractionDigits: 0,
  }).format(Number(amount) || 0);
  const confirm = () => {
    try {
      const existing = JSON.parse(localStorage.getItem("kab-enquiries") || "[]");
      localStorage.setItem(
        "kab-enquiries",
        JSON.stringify([
          {
            name,
            email,
            interest: "Demo support pledge",
            message: `${currency} pledged towards ${programme}. This is a demonstration; no payment has been processed.`,
            date: new Date().toLocaleDateString("en-GB"),
            status: "New",
          },
          ...existing,
        ]),
      );
      setStep(2);
    } catch {
      toast.error("Your browser could not save this pledge. Please try again.");
    }
  };
  return (
    <>
      <section className="page-intro container">
        <p className="eyebrow">Support a programme</p>
        <h1>A practical way to show your support.</h1>
        <p>
          Choose an area, set an amount and review your demonstration pledge. No money is collected
          in this prototype.
        </p>
      </section>
      <section className="container pledge-layout">
        <aside>
          <h2>Every contribution starts with care.</h2>
          <p>
            The foundation’s work has helped students prepare for UTME and brought medical care to
            people in Lagos.
          </p>
          <a className="text-link" href="/impact">
            Explore the work your support could help
          </a>
          <div className="notice">
            <p>
              Demonstration only. Please use sample contact details. Official payment options will
              be confirmed before launch.
            </p>
          </div>
        </aside>
        <div className="pledge-panel">
          <ol className="pledge-steps" aria-label="Pledge progress">
            {["Choose", "Review", "Complete"].map((t, i) => (
              <li key={t} className={step === i ? "current" : step > i ? "done" : ""}>
                {i + 1}. {t}
              </li>
            ))}
          </ol>
          {step === 0 ? (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (Number(amount) < 1000) {
                  toast.error("Enter an amount of at least ₦1,000.");
                  return;
                }
                setStep(1);
              }}
            >
              <h2>Choose your support</h2>
              <label className="editor-field">
                Programme
                <Select value={programme} onValueChange={setProgramme}>
                  <SelectTrigger className="interest-select" aria-label="Pledge programme">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {["Education", "Healthcare", "Where it is needed most"].map((v) => (
                      <SelectItem key={v} value={v}>
                        {v}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </label>
              <div className="pledge-amounts">
                <p>Suggested amount</p>
                <RadioGroup value={amount} onValueChange={setAmount} className="amount-options">
                  {["10000", "25000", "50000"].map((v) => (
                    <label key={v}>
                      <RadioGroupItem value={v} />
                      <span>₦{Number(v).toLocaleString()}</span>
                    </label>
                  ))}
                </RadioGroup>
              </div>
              <label className="editor-field">
                Amount in naira
                <input
                  type="number"
                  min="1000"
                  max="100000000"
                  step="1000"
                  value={amount}
                  required
                  onChange={(e) => setAmount(e.target.value)}
                />
              </label>
              <label className="editor-field">
                Full name
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  maxLength={120}
                  autoComplete="name"
                />
              </label>
              <label className="editor-field">
                Email address
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  maxLength={200}
                  autoComplete="email"
                />
              </label>
              <button className="button" type="submit">
                Review demo pledge
              </button>
            </form>
          ) : step === 1 ? (
            <div className="pledge-review">
              <h2>Review your pledge</h2>
              <dl>
                <div>
                  <dt>Programme</dt>
                  <dd>{programme}</dd>
                </div>
                <div>
                  <dt>Amount</dt>
                  <dd>{currency}</dd>
                </div>
                <div>
                  <dt>Name</dt>
                  <dd>{name}</dd>
                </div>
                <div>
                  <dt>Email</dt>
                  <dd>{email}</dd>
                </div>
              </dl>
              <p className="form-note">
                Confirming saves a demo pledge in this browser. No payment will be processed.
              </p>
              <div className="detail-actions">
                <button className="button" onClick={confirm}>
                  Confirm demo pledge
                </button>
                <button className="button outline" onClick={() => setStep(0)}>
                  Edit details
                </button>
              </div>
            </div>
          ) : (
            <div className="form-success" role="status">
              <span>
                <Check />
              </span>
              <h2>Your demo pledge is recorded.</h2>
              <p>
                {currency} towards {programme}. No payment has been processed. You can find this
                pledge in the Preview Editor’s enquiries tab.
              </p>
              <div className="detail-actions">
                <a className="button" href="/impact">
                  Explore our impact
                </a>
                <button
                  className="button outline"
                  onClick={() => {
                    setStep(0);
                    setName("");
                    setEmail("");
                  }}
                >
                  Make another demo pledge
                </button>
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
export function ProgrammeDirectory({
  educationImage = "/images/kassim.jpg",
  healthImage = "/images/health.webp",
}: {
  educationImage?: string;
  healthImage?: string;
}) {
  const [filter, setFilter] = useState("all");
  const visible = programmes.filter((p) => filter === "all" || p.slug === filter);
  return (
    <section className="container programme-directory">
      <Tabs value={filter} onValueChange={setFilter}>
        <TabsList className="programme-filter-tabs">
          <TabsTrigger value="all">All programmes</TabsTrigger>
          {programmes.map((p) => (
            <TabsTrigger key={p.slug} value={p.slug}>
              {p.category}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>
      <div className="programme-directory-grid">
        {visible.map((p) => {
          const Icon = p.icon;
          return (
            <article className="directory-card" key={p.slug}>
              {p.slug === "education" || p.slug === "healthcare" ? (
                <figure>
                  <a href={"/programmes/" + p.slug}>
                    <img
                      src={p.slug === "education" ? educationImage : healthImage}
                      alt={
                        p.slug === "education"
                          ? "Kassim Alli-Balogun, Foundation CEO"
                          : "Blood pressure screening at the 2026 medical outreach"
                      }
                    />
                  </a>
                  <figcaption>
                    {p.slug === "education"
                      ? "Kassim Alli-Balogun · Foundation CEO"
                      : "Lagos Assembly medical outreach"}
                  </figcaption>
                </figure>
              ) : (
                <div className="directory-icon">
                  <Icon />
                  <span>{p.category}</span>
                </div>
              )}
              <div className="directory-card-copy">
                <p className="eyebrow">{p.category}</p>
                <h2>{p.title}</h2>
                <p>{p.intro}</p>
                <span className="programme-status">{p.status}</span>
                <a className="button outline" href={"/programmes/" + p.slug}>
                  Programme details
                </a>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
