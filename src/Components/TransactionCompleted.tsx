import { Button, Stack, Typography } from "@mui/material";
import { useFormContext } from "react-hook-form";

const TransactionCompleted = () => {
  const { reset } = useFormContext();
  const onClick = () => {
    reset({ step: 0, tokens: "", recipientAddress: "" });
  };
  return (
    <Stack alignItems="center" gap={2}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        version="1.1"
        x="0px"
        y="0px"
        height="150px"
        width="150px"
        viewBox="0 0 48 60"
        enable-background="new 0 0 48 48"
      >
        <g>
          <polyline
            fill="none"
            stroke="#1976d2"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-miterlimit="10"
            points="   15.14,16.964 15.14,14.896 6.67,14.896 6.67,37.741 1.648,37.741 10.906,47 20.164,37.741 15.14,37.741 15.14,31.041  "
          />
          <polyline
            fill="none"
            stroke="#1976d2"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-miterlimit="10"
            points="   32.858,31.043 32.858,33.104 41.33,33.104 41.33,10.259 46.352,10.259 37.094,1 27.835,10.259 32.858,10.259 32.858,16.96  "
          />
          <circle
            fill="none"
            stroke="#1976d2"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-miterlimit="10"
            cx="24"
            cy="24"
            r="11.316"
          />
          <g>
            <path
              fill="#1976d2"
              d="M23.314,32.281v-2.037c-1.17-0.021-2.382-0.383-3.085-0.889l0.481-1.35c0.728,0.483,1.776,0.867,2.907,0.867    c1.432,0,2.4-0.829,2.4-1.978c0-1.109-0.786-1.796-2.278-2.401c-2.059-0.807-3.33-1.736-3.33-3.49    c0-1.675,1.191-2.945,3.047-3.249v-2.037h1.251v1.957c1.208,0.04,2.037,0.363,2.622,0.706l-0.504,1.332    c-0.423-0.243-1.251-0.687-2.542-0.687c-1.553,0-2.138,0.929-2.138,1.734c0,1.051,0.745,1.574,2.502,2.302    c2.077,0.847,3.125,1.896,3.125,3.691c0,1.594-1.108,3.086-3.187,3.429v2.099H23.314z"
            />
          </g>
        </g>
      </svg>
      <Typography mb={2}>Transaction successfully executed!</Typography>
      <Button variant="outlined" onClick={onClick}>
        go back
      </Button>
    </Stack>
  );
};

export default TransactionCompleted;
