"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import LogoMark from "@/components/LogoMark";
import { buildMegaMenu, type MegaColumn, type MegaSection } from "@/lib/megaMenu";

const sections = buildMegaMenu();

const linkFocus =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2";

function Chevron({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}

function MenuIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      className="h-5 w-5"
      aria-hidden="true"
    >
      <path d="M4 7h16M4 12h16M4 17h16" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      className="h-5 w-5"
      aria-hidden="true"
    >
      <path d="M6 6l12 12M18 6L6 18" />
    </svg>
  );
}

/** Grid layout per section: one headed block per registry category. */
function panelGridClass(section: MegaSection): string {
  switch (section.id) {
    case "calculators":
      return "grid grid-cols-2 gap-x-8 gap-y-7 lg:grid-cols-3 xl:grid-cols-5";
    case "tools":
      return "grid grid-cols-2 gap-x-8 gap-y-7";
    case "converters":
      return "grid grid-cols-2 gap-x-8 gap-y-7";
    case "generators":
      return "grid grid-cols-2 gap-x-8 gap-y-7";
    default:
      return "grid grid-cols-2 gap-x-8 gap-y-7";
  }
}

/**
 * One registry category as a headed block: a small muted sub-heading with a
 * count, then that category's tools as a single list under it. Every panel
 * uses this exact shape, so no list ever appears without its heading.
 */
function ColumnBlock({ column }: { column: MegaColumn }) {
  return (
    <div>
      <h3 className="flex items-baseline gap-2 px-2 text-[11px] font-semibold tracking-[0.14em] text-gray-500 uppercase">
        {column.heading}
        <span className="text-[11px] font-medium tracking-normal text-gray-400 normal-case">
          {column.links.length} {column.links.length === 1 ? "tool" : "tools"}
        </span>
      </h3>
      <ul className="mt-2 space-y-0.5">
        {column.links.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className={`block rounded-lg px-2 py-[5px] text-[13px] leading-snug text-gray-700 transition duration-150 hover:bg-white/85 hover:text-brand-800 hover:shadow-sm ${linkFocus}`}
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

function WideStrip({ section }: { section: MegaSection }) {
  if (!section.wideSection) return null;
  return (
    <div className="mt-7 border-t border-white/60 pt-5">
      <h3 className="px-2 text-[11px] font-semibold tracking-[0.14em] text-gray-500 uppercase">
        {section.wideSection.heading}
      </h3>
      <ul className="mt-2 grid grid-cols-3 gap-x-3 sm:grid-cols-5 xl:grid-cols-10">
        {section.wideSection.links.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className={`block rounded-md px-1.5 py-1 text-xs whitespace-nowrap text-gray-600 transition duration-150 hover:bg-white/85 hover:text-brand-800 ${linkFocus}`}
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

function GuidesPanelBody({ section }: { section: MegaSection }) {
  return (
    <div className="grid grid-cols-2 gap-3.5 lg:grid-cols-4">
      {(section.categories ?? []).map((category) => (
        <Link
          key={category.name}
          href={category.href}
          className={`group rounded-2xl border border-white/60 bg-white/45 px-4 py-3.5 transition duration-150 hover:bg-white/85 hover:shadow-md ${linkFocus}`}
        >
          <span className="block text-sm font-semibold text-gray-900 group-hover:text-brand-800">
            {category.name}
          </span>
          <span className="mt-0.5 block text-xs text-gray-500">
            {category.count} {category.count === 1 ? "guide" : "guides"}
          </span>
        </Link>
      ))}
      {section.featured && (
        <div className="rounded-2xl border border-white/60 bg-white/45 px-4 py-3.5">
          <span className="block text-sm font-semibold text-gray-900">{section.featured.heading}</span>
          <ul className="mt-1.5 space-y-1">
            {section.featured.links.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={`block truncate text-[13px] text-gray-600 transition duration-150 hover:text-brand-800 ${linkFocus}`}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

function sectionTotal(section: MegaSection): number {
  const fromColumns = section.columns.reduce((sum, c) => sum + c.links.length, 0);
  const fromWide = section.wideSection?.links.length ?? 0;
  const fromCategories = (section.categories ?? []).reduce((sum, c) => sum + c.count, 0);
  return fromColumns + fromWide + fromCategories;
}

export default function Header() {
  const pathname = usePathname();
  const [openId, setOpenId] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const headerRef = useRef<HTMLElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const chevronRefs = useRef(new Map<string, HTMLButtonElement>());
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  // Route changes close everything.
  useEffect(() => {
    setOpenId(null);
    setMobileOpen(false);
    setExpandedId(null);
  }, [pathname]);

  const openSection = sections.find((s) => s.id === openId) ?? null;

  const focusChevron = (id: string) => {
    chevronRefs.current.get(id)?.focus();
  };

  const handleHeaderKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "Escape") {
      if (openId) {
        const id = openId;
        setOpenId(null);
        focusChevron(id);
      } else if (mobileOpen) {
        setMobileOpen(false);
        menuButtonRef.current?.focus();
      }
      return;
    }
    if (event.key === "ArrowDown") {
      const target = event.target as HTMLElement;
      const sectionId = target.closest<HTMLElement>("[data-nav-section]")?.dataset.navSection;
      if (sectionId) {
        event.preventDefault();
        setOpenId(sectionId);
        requestAnimationFrame(() => {
          panelRef.current?.querySelector<HTMLElement>("a, button")?.focus();
        });
      }
    }
  };

  const handlePointerEnter = (event: React.PointerEvent, id: string) => {
    if (event.pointerType === "mouse") setOpenId(id);
  };

  const handleHeaderPointerLeave = (event: React.PointerEvent) => {
    if (event.pointerType === "mouse") setOpenId(null);
  };

  const handleHeaderBlur = (event: React.FocusEvent) => {
    if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
      setOpenId(null);
    }
  };

  const isActive = (section: MegaSection) =>
    pathname === section.hubPath || pathname.startsWith(`${section.hubPath}/`);

  return (
    <header
      ref={headerRef}
      onPointerLeave={handleHeaderPointerLeave}
      onMouseLeave={() => setOpenId(null)}
      onKeyDown={handleHeaderKeyDown}
      onBlur={handleHeaderBlur}
      className="sticky top-0 z-40 border-b border-white/60 bg-white/55 shadow-[0_10px_30px_-18px_rgb(68_33_127/0.35)] backdrop-blur-xl"
    >
      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="flex min-h-16 items-center justify-between gap-2 py-2">
          <Link
            href="/"
            className={`group flex min-h-11 shrink-0 items-center gap-2.5 rounded-full pr-3 ${linkFocus}`}
            aria-label="CalcVerse home"
          >
            <LogoMark className="h-10 w-10 shadow-md shadow-brand-600/30 ring-1 ring-white/50 transition duration-200 group-hover:shadow-lg" />
            <span className="text-xl font-bold tracking-tight whitespace-nowrap text-gray-900">
              Calc
              <span className="bg-gradient-to-r from-brand-600 to-sky-600 bg-clip-text text-transparent">
                Verse
              </span>
            </span>
          </Link>

          {/* Desktop nav with mega menu panels */}
          <nav className="hidden items-center gap-1 md:flex" aria-label="Main navigation">
            {sections.map((section) => {
              const isOpen = openId === section.id;
              const active = isActive(section);
              return (
                <div
                  key={section.id}
                  onPointerEnter={(e) => handlePointerEnter(e, section.id)}
                  onFocus={() => setOpenId(section.id)}
                >
                  <div
                    className={`flex items-center rounded-full transition duration-200 ${
                      isOpen || active ? "bg-white/80 shadow-sm" : "hover:bg-white/60"
                    }`}
                  >
                    <Link
                      href={section.hubPath}
                      data-nav-section={section.id}
                      aria-current={active ? "page" : undefined}
                      className={`flex min-h-11 items-center rounded-l-full py-2 pr-1 pl-4 text-sm font-medium whitespace-nowrap transition duration-200 ${
                        active ? "text-brand-800" : "text-gray-700 hover:text-brand-800"
                      } ${linkFocus}`}
                    >
                      {section.label}
                    </Link>
                    <button
                      type="button"
                      ref={(el) => {
                        if (el) chevronRefs.current.set(section.id, el);
                        else chevronRefs.current.delete(section.id);
                      }}
                      data-nav-section={section.id}
                      aria-haspopup="true"
                      aria-expanded={isOpen}
                      aria-controls={`mega-panel-${section.id}`}
                      aria-label={`${section.label} menu`}
                      onClick={() => setOpenId(isOpen ? null : section.id)}
                      className={`flex min-h-11 w-7 items-center justify-center rounded-r-full text-gray-500 transition duration-200 hover:text-brand-800 ${linkFocus}`}
                    >
                      <Chevron
                        className={`h-3.5 w-3.5 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
                      />
                    </button>
                  </div>
                </div>
              );
            })}
          </nav>

          {/* Mobile menu button */}
          <button
            type="button"
            ref={menuButtonRef}
            aria-haspopup="true"
            aria-expanded={mobileOpen}
            aria-controls="mobile-menu-sheet"
            onClick={() => setMobileOpen((value) => !value)}
            className={`flex min-h-11 items-center gap-2 rounded-full px-3.5 text-sm font-semibold text-gray-800 transition duration-200 hover:bg-white/80 hover:text-brand-800 md:hidden ${linkFocus}`}
          >
            {mobileOpen ? <CloseIcon /> : <MenuIcon />}
            Menu
          </button>
        </div>

        {/* Desktop mega menu panel */}
        {openSection && (
          <div
            ref={panelRef}
            id={`mega-panel-${openSection.id}`}
            role="region"
            aria-label={`${openSection.label} menu`}
            className="mega-panel absolute inset-x-0 top-full z-40 hidden pt-2 md:block"
          >
            <div
              className="glass-strong flex max-h-[calc(100dvh-6rem)] flex-col overflow-hidden rounded-[2rem]"
              onClick={() => setOpenId(null)}
            >
              <div className="overflow-y-auto p-6 lg:p-7">
                {openSection.columns.length > 0 ? (
                  <>
                    <div className={panelGridClass(openSection)}>
                      {openSection.columns.map((column) => (
                        <ColumnBlock key={column.heading} column={column} />
                      ))}
                    </div>
                    <WideStrip section={openSection} />
                  </>
                ) : (
                  <GuidesPanelBody section={openSection} />
                )}
              </div>
              <div className="flex flex-wrap items-center justify-between gap-3 border-t border-white/60 bg-white/45 px-6 py-3.5 lg:px-7">
                <Link
                  href={openSection.hubPath}
                  className={`rounded-full bg-white/70 px-4 py-2 text-sm font-semibold text-brand-800 shadow-sm transition duration-200 hover:bg-white hover:shadow ${linkFocus}`}
                >
                  {openSection.hubLabel} {"\u2192"}
                </Link>
                <span className="text-xs text-gray-500">
                  {sectionTotal(openSection)}{" "}
                  {openSection.id === "guides" ? "long-form guides" : "free tools"}, no signup, no
                  downloads
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Mobile menu sheet */}
        {mobileOpen && (
          <div id="mobile-menu-sheet" className="mega-panel absolute inset-x-0 top-full z-40 pt-2 md:hidden">
            <div className="glass-strong max-h-[calc(100dvh-5rem)] overflow-y-auto rounded-[1.75rem] p-3">
              {sections.map((section) => {
                const expanded = expandedId === section.id;
                return (
                  <div key={section.id} className="border-b border-white/50 last:border-b-0">
                    <div className="flex items-center">
                      <Link
                        href={section.hubPath}
                        className={`flex min-h-11 flex-1 items-center px-3 text-[15px] font-semibold text-gray-900 ${linkFocus}`}
                      >
                        {section.label}
                      </Link>
                      <button
                        type="button"
                        aria-haspopup="true"
                        aria-expanded={expanded}
                        aria-label={`Show ${section.label} items`}
                        onClick={() => setExpandedId(expanded ? null : section.id)}
                        className={`flex min-h-11 w-11 items-center justify-center rounded-full text-gray-500 transition hover:bg-white/70 hover:text-brand-800 ${linkFocus}`}
                      >
                        <Chevron
                          className={`h-4 w-4 transition-transform duration-200 ${expanded ? "rotate-180" : ""}`}
                        />
                      </button>
                    </div>
                    {expanded && (
                      <div className="px-3 pb-4">
                        {section.columns.map((column) => (
                          <div key={column.heading} className="mt-3">
                            <h4 className="text-[11px] font-semibold tracking-[0.14em] text-gray-500 uppercase">
                              {column.heading}
                            </h4>
                            <ul>
                              {column.links.map((link) => (
                                <li key={link.href}>
                                  <Link
                                    href={link.href}
                                    className={`flex min-h-11 items-center py-1 text-sm text-gray-700 transition hover:text-brand-800 ${linkFocus}`}
                                  >
                                    {link.label}
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                        {section.wideSection && (
                          <div className="mt-3">
                            <h4 className="text-[11px] font-semibold tracking-[0.14em] text-gray-500 uppercase">
                              {section.wideSection.heading}
                            </h4>
                            <ul className="grid grid-cols-2 gap-x-4">
                              {section.wideSection.links.map((link) => (
                                <li key={link.href}>
                                  <Link
                                    href={link.href}
                                    className={`flex min-h-11 items-center py-1 text-sm text-gray-700 transition hover:text-brand-800 ${linkFocus}`}
                                  >
                                    {link.label}
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                        {section.categories && (
                          <ul>
                            {section.categories.map((category) => (
                              <li key={category.name}>
                                <Link
                                  href={category.href}
                                  className={`flex min-h-11 items-center justify-between py-1 text-sm text-gray-700 transition hover:text-brand-800 ${linkFocus}`}
                                >
                                  <span>{category.name}</span>
                                  <span className="text-xs text-gray-500">
                                    {category.count} guides
                                  </span>
                                </Link>
                              </li>
                            ))}
                          </ul>
                        )}
                        {section.featured && (
                          <div className="mt-3">
                            <h4 className="text-[11px] font-semibold tracking-[0.14em] text-gray-500 uppercase">
                              {section.featured.heading}
                            </h4>
                            <ul>
                              {section.featured.links.map((link) => (
                                <li key={link.href}>
                                  <Link
                                    href={link.href}
                                    className={`flex min-h-11 items-center py-1 text-sm text-gray-700 transition hover:text-brand-800 ${linkFocus}`}
                                  >
                                    {link.label}
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
