import { Button, Container, Stack, TextField, Typography } from "@mui/material";
import { useFormContext } from "react-hook-form";
import { parseEther } from "viem";
import { useWriteContract, type BaseError } from "wagmi";
import { abi } from "../abi";
import { SMART_CONTRACT_ADDRESS } from "../config";
import { FormFields } from "./MainContainer";
import StatusDialog from "./StatusDialog";

const MintToken = () => {
  const { data: hash, writeContract, isPending, error } = useWriteContract();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useFormContext<FormFields>();

  const onCloseDialog = () => {
    setValue("step", 1, { shouldDirty: true });
  };

  const onSubmit = ({ tokens }: FormFields) => {
    writeContract({
      address: SMART_CONTRACT_ADDRESS,
      abi,
      functionName: "mint",
      args: [parseEther(tokens!)],
    });
  };

  return (
    <Container maxWidth="sm">
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack gap={2}>
          <TextField
            label="Enter number of tokens to mint"
            variant="outlined"
            fullWidth
            margin="normal"
            required
            error={!!errors?.tokens?.message}
            helperText={errors?.tokens?.message}
            {...register("tokens", {
              pattern: {
                value: /^(?!0\d)\d*(\.\d+)?$/,
                message: "Number of tokens must be greater that 0.",
              },
            })}
          />
          <Button
            variant="contained"
            type="submit"
            color="primary"
            disabled={isPending}
          >
            {isPending ? "Confirming..." : "Mint Tokens"}
          </Button>
        </Stack>
      </form>
      {error && (
        <Typography mt={2} color="error">
          Error: {(error as BaseError).shortMessage || error.message}
        </Typography>
      )}
      {hash && (
        <StatusDialog
          hash={hash}
          buttonText="Next step"
          onClose={onCloseDialog}
        />
      )}
    </Container>
  );
};

export default MintToken;
