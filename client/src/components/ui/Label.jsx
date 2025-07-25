export const Label = ({ children, htmlFor }) => (
  <label htmlFor={htmlFor} className="text-sm font-medium text-gray-700 dark:text-gray-200">
    {children}
  </label>
);
