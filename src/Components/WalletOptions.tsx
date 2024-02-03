import { Button, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { Connector, useConnect } from "wagmi";

export function WalletOptions() {
  const { connectors, connect } = useConnect();

  if (connectors.length === 0) {
    return (
      <Typography color="error">
        There is no available web wallet option.
      </Typography>
    );
  }

  return (
    <>
      {connectors.map((connector) => (
        <WalletOption
          key={connector.uid}
          connector={connector}
          onClick={() => connect({ connector })}
        />
      ))}
    </>
  );
}

function WalletOption({
  connector,
  onClick,
}: {
  connector: Connector;
  onClick: () => void;
}) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    (async () => {
      const provider = await connector.getProvider();
      setReady(!!provider);
    })();
  }, [connector]);

  return (
    <Button
      endIcon={<img src={connector.icon} alt={connector.name} />}
      disabled={!ready}
      variant="outlined"
      onClick={onClick}
    >
      {connector.name}
    </Button>
  );
}
