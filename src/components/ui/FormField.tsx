import React from 'react'

type FormFieldProps = {
  label: string
  className?: string
} & React.InputHTMLAttributes<HTMLInputElement>

/**
 * Labelled controlled input used by the auth, profile and shopping list forms.
 * `className` is the wrapper class so each screen keeps its own CSS module.
 */
const FormField: React.FC<FormFieldProps> = ({ label, className, ...inputProps }) => (
  <div className={className}>
    <label>{label}</label>
    <input {...inputProps} />
  </div>
)

export default FormField
