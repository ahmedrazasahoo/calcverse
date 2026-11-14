"use client";

/**
 * Themed replacement for the native <select>, shared by every tool.
 *
 * Why custom: the native dropdown popup is rendered by the OS and clashes
 * with the site's frosted glass design (see the Loan Calculator currency
 * picker). This component keeps the exact props the tools already use
 * (id, value, onChange with e.target.value, disabled, aria-label, and
 * <option> children), so call sites only swap the tag name.
 *
 * Behaviour follows the ARIA combobox pattern: a button with
 * role="combobox" and a portalled role="listbox" popup (portalled so no
 * parent overflow can clip it), full keyboard support (arrows, Home, End,
 * Enter, Space, Escape, Tab and type-ahead), click-outside close, and the
 * site's glass-strong surface with the animated gradient border language
 * on the open field.
 */
import {
  Children,
  isValidElement,
  useCallback,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
  type ChangeEvent,
  type ChangeEventHandler,
  type ReactNode,
} from "react";
import { createPortal } from "react-dom";

export interface SelectProps {
  id?: string;
  className?: string;
  name?: string;
  value?: string | number;
  defaultValue?: string | number;
  onChange?: ChangeEventHandler<HTMLSelectElement>;
  disabled?: boolean;
  required?: boolean;
  "aria-label"?: string;
  "aria-labelledby"?: string;
  children?: ReactNode;
}

interface SelectOption {
  value: string;
  label: ReactNode;
  text: string;
  disabled: boolean;
}

function textOf(node: ReactNode): string {
  if (node == null || typeof node === "boolean") return "";
  if (typeof node === "string" || typeof node === "number") return String(node);
  if (Array.isArray(node)) return node.map(textOf).join("");
  if (isValidElement(node)) return textOf((node.props as { children?: ReactNode }).children);
  return "";
}

/** Flatten <option> children (including mapped arrays and fragments). */
function collectOptions(children: ReactNode): SelectOption[] {
  const out: SelectOption[] = [];
  const walk = (node: ReactNode) => {
    Children.forEach(node, (child) => {
      if (!isValidElement(child)) return;
      if (child.type === "option") {
        const props = child.props as {
          value?: string | number;
          disabled?: boolean;
          children?: ReactNode;
        };
        const text = textOf(props.children);
        out.push({
          value: props.value != null ? String(props.value) : text,
          label: props.children,
          text,
          disabled: Boolean(props.disabled),
        });
      } else {
        walk((child.props as { children?: ReactNode }).children);
      }
    });
  };
  walk(children);
  return out;
}

function ChevronIcon({ open }: { open: boolean }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={`h-4 w-4 shrink-0 text-brand-500 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
    >
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className="h-4 w-4 shrink-0 text-brand-600"
    >
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
}

interface PopupPos {
  left: number;
  width: number;
  top?: number;
  bottom?: number;
  placement: "bottom" | "top";
}

const OPTION_H = 44;
const POPUP_MAX_H = 288;

export function Select({
  id,
  className,
  value,
  defaultValue,
  onChange,
  disabled = false,
  "aria-label": ariaLabel,
  "aria-labelledby": ariaLabelledBy,
  children,
}: SelectProps) {
  const options = useMemo(() => collectOptions(children), [children]);
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const [pos, setPos] = useState<PopupPos | null>(null);
  const [internalValue, setInternalValue] = useState<string | undefined>(
    defaultValue != null ? String(defaultValue) : undefined,
  );
  const buttonRef = useRef<HTMLButtonElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const typeAhead = useRef({ buffer: "", at: 0 });
  const reactId = useId().replace(/[^a-zA-Z0-9_-]/g, "");
  const listboxId = `${id ?? `select-${reactId}`}-listbox`;
  const optionId = (index: number) => `${listboxId}-option-${index}`;

  const currentValue =
    value !== undefined ? String(value) : (internalValue ?? options[0]?.value ?? "");
  const selectedIndex = options.findIndex((option) => option.value === currentValue);
  const displayOption = options[selectedIndex] ?? options[0];

  const updatePosition = useCallback(() => {
    const button = buttonRef.current;
    if (!button) return;
    const rect = button.getBoundingClientRect();
    const wanted = Math.min(options.length * OPTION_H + 12, POPUP_MAX_H);
    const spaceBelow = window.innerHeight - rect.bottom;
    const placement =
      spaceBelow < wanted + 10 && rect.top > spaceBelow ? "top" : "bottom";
    setPos({
      left: rect.left,
      width: rect.width,
      top: placement === "bottom" ? rect.bottom + 6 : undefined,
      bottom: placement === "top" ? window.innerHeight - rect.top + 6 : undefined,
      placement,
    });
  }, [options.length]);

  const openPopup = useCallback(() => {
    if (disabled || options.length === 0) return;
    setActiveIndex(selectedIndex >= 0 ? selectedIndex : 0);
    updatePosition();
    setOpen(true);
  }, [disabled, options.length, selectedIndex, updatePosition]);

  const closePopup = useCallback(() => setOpen(false), []);

  const commit = useCallback(
    (option: SelectOption | undefined) => {
      if (!option || option.disabled) return;
      setOpen(false);
      buttonRef.current?.focus();
      if (value === undefined) setInternalValue(option.value);
      if (onChange) {
        const target = { value: option.value } as HTMLSelectElement;
        const event = {
          target,
          currentTarget: target,
          preventDefault: () => {},
          stopPropagation: () => {},
        } as unknown as ChangeEvent<HTMLSelectElement>;
        onChange(event);
      }
    },
    [onChange, value],
  );

  // While open: keep the popup glued to the field on scroll and resize,
  // and close on any pointer press outside the field and the popup.
  useEffect(() => {
    if (!open) return;
    const onScroll = (event: Event) => {
      if (listRef.current && event.target instanceof Node && listRef.current.contains(event.target)) {
        return;
      }
      updatePosition();
    };
    const onPointerDown = (event: PointerEvent) => {
      const target = event.target as Node;
      if (buttonRef.current?.contains(target)) return;
      if (listRef.current?.contains(target)) return;
      setOpen(false);
    };
    window.addEventListener("scroll", onScroll, true);
    window.addEventListener("resize", updatePosition);
    document.addEventListener("pointerdown", onPointerDown);
    return () => {
      window.removeEventListener("scroll", onScroll, true);
      window.removeEventListener("resize", updatePosition);
      document.removeEventListener("pointerdown", onPointerDown);
    };
  }, [open, updatePosition]);

  // Keep the active option visible inside the scrolling popup.
  useEffect(() => {
    if (!open || activeIndex < 0) return;
    listRef.current
      ?.querySelector(`[data-index="${activeIndex}"]`)
      ?.scrollIntoView({ block: "nearest" });
  }, [open, activeIndex]);

  const moveActive = (from: number, delta: number) => {
    if (options.length === 0) return;
    let next = from;
    for (let step = 0; step < options.length; step++) {
      next = (next + delta + options.length) % options.length;
      if (!options[next].disabled) break;
    }
    setActiveIndex(next);
  };

  const runTypeAhead = (key: string) => {
    const now = Date.now();
    const buffer = now - typeAhead.current.at > 600 ? key : typeAhead.current.buffer + key;
    typeAhead.current = { buffer, at: now };
    const needle = buffer.toLowerCase();
    const start = (open ? activeIndex : selectedIndex) + 1;
    for (let step = 0; step < options.length; step++) {
      const index = (start + step) % options.length;
      const option = options[index];
      if (!option.disabled && option.text.toLowerCase().startsWith(needle)) {
        if (!open) openPopup();
        setActiveIndex(index);
        return;
      }
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (disabled) return;
    switch (event.key) {
      case "ArrowDown":
        event.preventDefault();
        if (open) moveActive(activeIndex, 1);
        else openPopup();
        break;
      case "ArrowUp":
        event.preventDefault();
        if (open) moveActive(activeIndex, -1);
        else openPopup();
        break;
      case "Home":
        if (open) {
          event.preventDefault();
          setActiveIndex(options.findIndex((option) => !option.disabled));
        }
        break;
      case "End":
        if (open) {
          event.preventDefault();
          setActiveIndex(options.length - 1 - [...options].reverse().findIndex((o) => !o.disabled));
        }
        break;
      case "Enter":
      case " ":
        if (open) {
          // Handled here; preventDefault stops the native button click
          // that keyboard activation would otherwise fire on top.
          event.preventDefault();
          commit(options[activeIndex]);
        }
        // When closed, the native click (fired by Enter or Space) opens.
        break;
      case "Escape":
        if (open) {
          event.preventDefault();
          closePopup();
        }
        break;
      case "Tab":
        if (open) closePopup();
        break;
      default:
        if (event.key.length === 1 && !event.ctrlKey && !event.metaKey && !event.altKey) {
          runTypeAhead(event.key);
        }
    }
  };

  const triggerClass = [
    "flex min-h-12 w-full min-w-0 items-center justify-between gap-3 rounded-full border py-3 pr-4 pl-5 text-left text-base text-gray-900 shadow-sm backdrop-blur transition duration-200 outline-none",
    open
      ? "anim-border border-brand-400 bg-white ring-4 ring-brand-500/15"
      : "border-brand-200/90 bg-white/70 hover:border-brand-300 hover:bg-white/90 focus-visible:border-brand-400 focus-visible:bg-white focus-visible:ring-4 focus-visible:ring-brand-500/20",
    disabled ? "cursor-not-allowed bg-white/40 text-gray-500 hover:border-brand-200/90 hover:bg-white/40" : "",
    className ?? "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <>
      <button
        ref={buttonRef}
        type="button"
        id={id}
        role="combobox"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={listboxId}
        aria-activedescendant={open && activeIndex >= 0 ? optionId(activeIndex) : undefined}
        aria-label={ariaLabel}
        aria-labelledby={ariaLabelledBy}
        disabled={disabled}
        onClick={() => (open ? closePopup() : openPopup())}
        onKeyDown={handleKeyDown}
        className={triggerClass}
      >
        <span className="min-w-0 flex-1 truncate">{displayOption?.label ?? ""}</span>
        <ChevronIcon open={open} />
      </button>
      {open &&
        pos &&
        createPortal(
          <ul
            ref={listRef}
            id={listboxId}
            role="listbox"
            aria-label={ariaLabel}
            className={`glass-strong select-pop z-[60] overflow-y-auto rounded-3xl p-1.5 ${
              pos.placement === "top" ? "select-pop-up" : ""
            }`}
            style={{
              position: "fixed",
              left: pos.left,
              width: pos.width,
              top: pos.top,
              bottom: pos.bottom,
              maxHeight: POPUP_MAX_H,
            }}
          >
            {options.map((option, index) => {
              const isSelected = index === selectedIndex;
              const isActive = index === activeIndex;
              return (
                <li
                  key={`${option.value}-${index}`}
                  id={optionId(index)}
                  data-index={index}
                  role="option"
                  aria-selected={isSelected}
                  aria-disabled={option.disabled || undefined}
                  onPointerEnter={() => !option.disabled && setActiveIndex(index)}
                  onClick={() => commit(option)}
                  className={`flex cursor-pointer items-center justify-between gap-2 rounded-2xl px-4 py-2.5 text-[15px] leading-snug transition duration-150 ${
                    option.disabled
                      ? "cursor-not-allowed text-gray-400"
                      : isActive
                        ? "bg-brand-100/80 text-brand-950"
                        : "text-gray-800"
                  } ${isSelected ? "font-semibold text-brand-900" : ""}`}
                >
                  <span className="min-w-0 truncate">{option.label}</span>
                  {isSelected && <CheckIcon />}
                </li>
              );
            })}
          </ul>,
          document.body,
        )}
    </>
  );
}
