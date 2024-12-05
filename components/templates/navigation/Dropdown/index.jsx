import { DropdownContainer, DropdownLinkItem } from './root';

/**
 * @param {{
 * open: boolean;
 * } & React.ComponentProps<typeof DropdownContainer>} props
*/
export function Dropdown({ children, open, ...props }) {
  return (
    <DropdownContainer open={open} {...props}>
      {children}
    </DropdownContainer>
  );
}

/**
 * @param {React.ComponentProps<typeof DropdownLinkItem>} props
*/
export function DropdownLink({ children, href, ...props }) {
  return (
    <DropdownLinkItem href={`${href}`} {...props}>
      {children}
    </DropdownLinkItem>
  );
}
