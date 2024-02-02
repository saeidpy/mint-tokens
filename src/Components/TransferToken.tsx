import { Button, Container, Stack, TextField, Typography } from "@mui/material";
import { useFormContext } from "react-hook-form";
import { parseEther } from "viem";
import { useSendTransaction, type BaseError } from "wagmi";
import StatusDialog from "./StatusDialog";
import { FormFields } from "./MainContainer";

const TransferToken = () => {
  const {
    data: hash,
    sendTransaction,
    error,
    isPending,
  } = useSendTransaction();
  const { register, handleSubmit, getValues, setValue } =
    useFormContext<FormFields>();

  const onCloseDialog = () => {
    setValue("step", 2);
  };

  const onSubmit = ({ tokens, recipientAddress }: FormFields) => {
    sendTransaction({
      to: recipientAddress as `0x${string}`,
      value: parseEther(tokens!),
    });
  };

  return (
    <Container maxWidth="sm">
      <Typography>Minted tokens: {getValues()["tokens"]}</Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack gap={2}>
          <TextField
            type="text"
            label="Enter recipient's Ethereum address"
            variant="outlined"
            fullWidth
            margin="normal"
            placeholder="0xA0Cf…251e"
            required
            {...register("recipientAddress")}
          />
          <Stack flexDirection="row" gap={2} justifyContent="space-between">
            <Button
              variant="outlined"
              color="primary"
              onClick={() => setValue("step", 0)}
            >
              go back
            </Button>
            <Button
              variant="contained"
              type="submit"
              color="primary"
              disabled={isPending}
            >
              {isPending ? "Confirming..." : "Transfer Tokens"}
            </Button>
          </Stack>
        </Stack>
      </form>
      {error && (
        <Typography mt={2} color="error">
          Error: {(error as BaseError).shortMessage || error.message}
        </Typography>
      )}
      {hash && <StatusDialog hash={hash} onClose={onCloseDialog} />}
    </Container>
  );
};

export default TransferToken;
