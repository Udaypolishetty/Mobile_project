// AuthInput.jsx — Reusable animated input field
import { useState } from "react";

export default function AuthInput({
  icon: Icon,
  type = "text",
  placeholder,
  value,
  onChange,
  error,
  rightElement,
  onKeyDown,
  autoComplete,
}) {
  const [focused, setFocused] = useState(false);

  return (
    <div className="auth-field-wrap">
      <div
        className={`auth-field ${focused ? "focused" : ""} ${error ? "errored" : ""}`}
      >
        {Icon && (
          <Icon
            className={`auth-field-icon ${focused ? "icon-active" : ""} ${error ? "icon-error" : ""}`}
          />
        )}
        <input
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          onKeyDown={onKeyDown}
          autoComplete={autoComplete}
          className="auth-input"
        />
        {rightElement && <div className="auth-field-right">{rightElement}</div>}
      </div>
      {error && (
        <p className="auth-field-error">{error}</p>
      )}
    </div>
  );
}