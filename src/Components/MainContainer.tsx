import {
  AppBar,
  Box,
  Container,
  Stack,
  Step,
  StepLabel,
  Stepper,
  Typography,
} from "@mui/material";
import { useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import useFormPersist from "react-hook-form-persist";
import { useAccount } from "wagmi";
import { Account } from "./Account";
import MintToken from "./MintToken";
import TransactionCompleted from "./TransactionCompleted";
import TransferToken from "./TransferToken";
import { WalletOptions } from "./WalletOptions";

export interface FormFields {
  tokens?: string;
  recipientAddress?: string;
  step?: number;
}

function MainContainer() {
  const methods = useForm<FormFields>();
  const { watch, setValue, reset } = methods;
  useFormPersist("form", { watch, setValue });
  const { isConnected } = useAccount();
  const step = watch("step") ?? 0;
  useEffect(() => {
    if (!isConnected) {
      reset({ step: 0, tokens: "", recipientAddress: "" });
    }
  }, [isConnected, reset]);

  return (
    <FormProvider {...methods}>
      <AppBar position="static">
        <Container maxWidth="md">
          <Stack flexDirection="row" height={64} alignItems="center">
            <Typography variant="h6" sx={{ flexGrow: 1 }}>
              Token Manager
            </Typography>
            {isConnected && <Account />}
          </Stack>
        </Container>
      </AppBar>
      <Container maxWidth="md" sx={{ mt: 4 }}>
        {isConnected ? (
          <Stack gap={3}>
            <Box sx={{ width: "100%" }}>
              <Stepper activeStep={step} alternativeLabel>
                <Step key={"Mint Tokens"}>
                  <StepLabel>Mint Tokens</StepLabel>
                </Step>
                <Step key={"Transfer Tokens"}>
                  <StepLabel>Transfer Tokens</StepLabel>
                </Step>
              </Stepper>
            </Box>
            <>
              {step === 0 && <MintToken />}
              {step === 1 && <TransferToken />}
              {step === 2 && <TransactionCompleted />}
            </>
          </Stack>
        ) : (
          <Stack flexDirection="row" justifyContent="space-between" flexWrap="wrap" gap={2}>
            <Typography variant="h6">connect to wallet</Typography>
            <WalletOptions />
          </Stack>
        )}
      </Container>
    </FormProvider>
  );
}

export default MainContainer;
