import { useId } from 'react';
import { BsChevronDown } from 'react-icons/bs';

/**
 * Accessible labelled control. `as`: 'input' | 'select' | 'textarea'. `icon` is an optional leading icon element.
 * Pass `options` for selects: ['A', 'B'] or [{ value, label }].
 */
export default function Field({ label, error, as = 'input', icon = null, options = [], placeholder, hideLabel = false, className = '', ...rest }) {
  const id = useId();
  const errId = `${id}-err`;
  const common = { id, 'aria-invalid': error ? true : undefined, 'aria-describedby': error ? errId : undefined, ...rest };
  let control;
  if (as === 'select') {
    control = (
      <>
        <select {...common}>
          {placeholder && <option value="">{placeholder}</option>}
          {options.map((o) => {
            const v = typeof o === 'string' ? { value: o, label: o } : o;
            return <option key={v.value} value={v.value}>{v.label}</option>;
          })}
        </select>
        <BsChevronDown size={13} className="hs-fld__chev" aria-hidden="true" />
      </>
    );
  } else if (as === 'textarea') {
    control = <textarea rows={5} placeholder={placeholder} {...common} />;
  } else {
    control = <input placeholder={placeholder} {...common} />;
  }
  return (
    <div className={`hs-fld ${error ? 'has-error' : ''} ${className}`}>
      <label htmlFor={id} className={hideLabel ? 'visually-hidden' : ''}>{label}</label>
      <div className={`hs-fld__box hs-fld__box--${as} ${icon ? 'has-icon' : ''}`}>
        {icon && <span className="hs-fld__icon" aria-hidden="true">{icon}</span>}
        {control}
      </div>
      {error && <p id={errId} className="hs-fld__err" role="alert">{error}</p>}
    </div>
  );
}
