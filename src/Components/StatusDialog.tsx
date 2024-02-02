import { Link, Stack, Typography } from "@mui/material";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { useState } from "react";
import { useWaitForTransactionReceipt } from "wagmi";

export interface StatusDialogProps {
  hash?: `0x${string}`;
  onClose?: () => void;
  buttonText?: string;
}

export default function StatusDialog({
  hash,
  onClose,
  buttonText,
}: StatusDialogProps) {
  const [open, setOpen] = useState(true);
  const { isLoading: isConfirming, isSuccess: isConfirmed } =
    useWaitForTransactionReceipt({
      hash,
    });

  const handleClose = () => {
    setOpen(false);
    onClose?.();
  };

  return (
    <Dialog maxWidth="md" open={open}>
      <DialogTitle>Transaction status</DialogTitle>
      <DialogContent>
        <Stack gap={2}>
          <Typography display="flex" flexDirection="column">
            Transaction Hash:
            <Link
              noWrap
              target="_blank"
              href={`https://goerli.etherscan.io/tx/${hash}`}
            >
              {hash}
            </Link>
          </Typography>
          {isConfirming && <Typography>Waiting for confirmation...</Typography>}
          {isConfirmed && (
            <Typography color="green">Transaction confirmed.</Typography>
          )}
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button disabled={isConfirming} onClick={handleClose}>
          {buttonText ?? "Close"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
