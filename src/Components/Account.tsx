import { ExitToApp } from "@mui/icons-material";
import { IconButton, Stack, Typography } from "@mui/material";
import { useAccount, useDisconnect, useEnsAvatar, useEnsName } from "wagmi";

export function Account() {
  const { address } = useAccount();
  const { disconnect } = useDisconnect();
  const { data: ensName } = useEnsName({ address });
  const { data: ensAvatar } = useEnsAvatar({ name: ensName! });

  return (
    <Stack flexDirection="row" alignItems="center" gap={1}>
      {ensAvatar && <img alt="ENS Avatar" src={ensAvatar} />}
      {address && (
        <Typography>
          {ensName ? `${ensName} (${address})` : address.substring(0, 5)}
        </Typography>
      )}
      <IconButton onClick={() => disconnect()}>
        <ExitToApp />
      </IconButton>
    </Stack>
  );
}
