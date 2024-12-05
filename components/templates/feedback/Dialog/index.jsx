import { useEffect, useRef } from 'react';
import InlineSVG from 'react-inlinesvg';

import Button from '@/components/base/Button';
import Box from '@/components/base/Box';

import { DialogBody, DialogContainer, DialogHeader } from './root';

/**
 * @param {{
 * title: string;
 * children: React.ReactNode;
 * open: boolean;
 * onClose: (open: boolean) => void;
 * } & React.ComponentProps<typeof DialogContainer>} props
*/
export default function Dialog({
  open = false,
  onClose = () => {},
  children,
  title,
  ...props
}) {
  const dialogRef = useRef(null);

  const openDialog = () => {
    if (dialogRef.current) dialogRef.current.showModal();
  };

  const closeDialog = () => {
    if (dialogRef.current) dialogRef.current.close();
    onClose();
  };

  useEffect(() => {
    if (open) openDialog();
  }, [open]);

  return (
    <DialogContainer ref={dialogRef} {...props}>
      <DialogHeader>
        <Box
          color="white"
          cssx={({ typography }) => ({
            fontSize: typography.h6.fontSize,
          })}
        >
          {title}
        </Box>
        <Button
          size="iconOnly"
          variant="text"
          onClick={closeDialog}
        >
          <InlineSVG src="/icons/close.svg" width={25} fill="#fff" />
        </Button>
      </DialogHeader>
      <DialogBody>
        {children}
      </DialogBody>
    </DialogContainer>
  );
}
