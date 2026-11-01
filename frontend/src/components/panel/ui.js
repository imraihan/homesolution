'use client';
import { useEffect, useRef, useId } from 'react';
import { BsX, BsArrowUpShort, BsArrowDownShort, BsInbox } from 'react-icons/bs';
import { ICONS } from './navIcons';

export function PageHeader({ title, subtitle, actions }) {
  return (
    <div className="pn-pagehead">
      <div>
        <h1>{title}</h1>
        {subtitle && <p>{subtitle}</p>}
      </div>
      {actions && <div className="pn-pagehead__actions">{actions}</div>}
    </div>
  );
}

export function Card({ title, action, children, className = '', flush = false }) {
  return (
    <section className={`pn-card ${className}`}>
      {(title || action) && (
        <header className="pn-card__head">
          {title && <h2>{title}</h2>}
          {action}
        </header>
      )}
      <div className={flush ? 'pn-card__body pn-card__body--flush' : 'pn-card__body'}>{children}</div>
    </section>
  );
}

// tone: blue | orange | green | purple | red
export function StatCard({ label, value, delta, icon = 'dashboard', tone = 'blue', sub }) {
  const Icon = ICONS[icon] || ICONS.dashboard;
  return (
    <div className={`pn-stat pn-stat--${tone}`}>
      <span className="pn-stat__icon"><Icon size={20} aria-hidden="true" /></span>
      <div className="pn-stat__txt">
        <strong>{value}</strong>
        <span>{label}</span>
      </div>
      {typeof delta === 'number' && (
        <em className={`pn-stat__delta ${delta >= 0 ? 'is-up' : 'is-down'}`}>
          {delta >= 0 ? <BsArrowUpShort size={16} aria-hidden="true" /> : <BsArrowDownShort size={16} aria-hidden="true" />}
          {Math.abs(delta)}%
        </em>
      )}
      {sub && <small className="pn-stat__sub">{sub}</small>}
    </div>
  );
}

const TONES = {
  success: ['completed', 'active', 'approved', 'paid', 'resolved', 'published', 'accepted', 'enabled', 'live'],
  info: ['confirmed', 'ongoing', 'upcoming', 'in progress', 'on the way', 'processing', 'in-progress'],
  warn: ['pending', 'open', 'medium', 'unread'],
  danger: ['cancelled', 'rejected', 'failed', 'inactive', 'suspended', 'refunded', 'expired', 'flagged', 'high'],
};
export function toneOf(status) {
  const k = String(status).toLowerCase();
  return Object.keys(TONES).find((t) => TONES[t].includes(k)) || 'muted';
}
export function StatusBadge({ status }) {
  return <span className={`pn-badge pn-badge--${toneOf(status)}`}>{status}</span>;
}

export function Avatar({ name = '?', size = 36, tone }) {
  const hue = [...name].reduce((n, c) => n + c.charCodeAt(0), 0) % 5;
  return (
    <span className={`pn-avatar pn-avatar--${tone || hue}`} style={{ width: size, height: size, fontSize: size * 0.4 }} aria-hidden="true">
      {name.trim().charAt(0).toUpperCase()}
    </span>
  );
}

export function EmptyState({ title = 'Nothing here yet', text, action }) {
  return (
    <div className="pn-empty">
      <BsInbox size={34} aria-hidden="true" />
      <strong>{title}</strong>
      {text && <p>{text}</p>}
      {action}
    </div>
  );
}

export function Toggle({ checked, onChange, label, disabled }) {
  return (
    <button type="button" role="switch" aria-checked={checked} aria-label={label} disabled={disabled} className={`pn-toggle ${checked ? 'is-on' : ''}`} onClick={() => onChange(!checked)}>
      <span />
    </button>
  );
}

export function Tabs({ tabs, value, onChange }) {
  return (
    <div className="pn-tabs" role="tablist">
      {tabs.map((t) => {
        const v = typeof t === 'string' ? { value: t, label: t } : t;
        return (
          <button key={v.value} type="button" role="tab" aria-selected={value === v.value} className={value === v.value ? 'is-active' : ''} onClick={() => onChange(v.value)}>
            {v.label}
            {v.count !== undefined && <i>{v.count}</i>}
          </button>
        );
      })}
    </div>
  );
}

// Accessible modal: Escape closes, focus moves in and returns, background does not scroll.
export function Modal({ open, title, onClose, children, footer, size = 'md' }) {
  const ref = useRef(null);
  const titleId = useId();
  useEffect(() => {
    if (!open) return undefined;
    const prev = document.activeElement;
    document.body.style.overflow = 'hidden';
    const first = ref.current?.querySelector('input,select,textarea,button:not(.pn-modal__x)');
    (first || ref.current)?.focus();
    const onKey = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'Tab' && ref.current) {
        const f = [...ref.current.querySelectorAll('a[href],button:not([disabled]),input:not([disabled]),select,textarea')];
        if (!f.length) return;
        if (e.shiftKey && document.activeElement === f[0]) { e.preventDefault(); f[f.length - 1].focus(); }
        else if (!e.shiftKey && document.activeElement === f[f.length - 1]) { e.preventDefault(); f[0].focus(); }
      }
    };
    document.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      document.removeEventListener('keydown', onKey);
      prev?.focus?.();
    };
  }, [open, onClose]);
  if (!open) return null;
  return (
    <div className="pn-modal" role="presentation" onMouseDown={(e) => e.target === e.currentTarget && onClose()}>
      <div className={`pn-modal__panel pn-modal__panel--${size}`} role="dialog" aria-modal="true" aria-labelledby={titleId} ref={ref} tabIndex={-1}>
        <header className="pn-modal__head">
          <h2 id={titleId}>{title}</h2>
          <button type="button" className="pn-modal__x" aria-label="Close" onClick={onClose}><BsX size={24} /></button>
        </header>
        <div className="pn-modal__body">{children}</div>
        {footer && <footer className="pn-modal__foot">{footer}</footer>}
      </div>
    </div>
  );
}

export function ConfirmModal({ open, title = 'Are you sure?', text, confirmLabel = 'Confirm', danger, onConfirm, onClose }) {
  return (
    <Modal
      open={open}
      title={title}
      onClose={onClose}
      size="sm"
      footer={
        <>
          <button type="button" className="pn-btn pn-btn--ghost" onClick={onClose}>Cancel</button>
          <button type="button" className={`pn-btn ${danger ? 'pn-btn--danger' : 'pn-btn--primary'}`} onClick={() => { onConfirm(); onClose(); }}>{confirmLabel}</button>
        </>
      }
    >
      <p className="pn-muted">{text}</p>
    </Modal>
  );
}

// Labelled form control. type: text | number | email | tel | date | select | textarea | password
export function FormField({ label, type = 'text', options, error, hint, className = '', ...rest }) {
  const id = useId();
  let control;
  if (type === 'select') {
    control = (
      <select id={id} {...rest}>
        {options.map((o) => {
          const v = typeof o === 'string' ? { value: o, label: o } : o;
          return <option key={v.value} value={v.value}>{v.label}</option>;
        })}
      </select>
    );
  } else if (type === 'textarea') control = <textarea id={id} rows={3} {...rest} />;
  else control = <input id={id} type={type} {...rest} />;
  return (
    <div className={`pn-field ${error ? 'has-error' : ''} ${className}`}>
      <label htmlFor={id}>{label}</label>
      {control}
      {hint && !error && <small>{hint}</small>}
      {error && <small className="pn-field__err" role="alert">{error}</small>}
    </div>
  );
}
