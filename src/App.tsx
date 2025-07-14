import { Box, Typography, IconButton, Stack } from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';
import ConstructionIcon from '@mui/icons-material/Construction';
import { keyframes } from '@emotion/react';
import { injectSpeedInsights } from "@vercel/speed-insights"

injectSpeedInsights()

const bounce = keyframes`
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
`;

export default function App() {
  return (
      <Box
        height="100vh"
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        textAlign="center"
        gap={4}
      >
        <Stack direction="row" alignItems="center" spacing={1}>
          <ConstructionIcon
            sx={{ fontSize: 40, animation: `${bounce} 1s infinite` }}
            color="warning"
          />
          <Typography variant="h4" fontWeight="bold">
            Page under construction
          </Typography>
          <ConstructionIcon
            sx={{ fontSize: 40, animation: `${bounce} 1s infinite` }}
            color="warning"
          />
        </Stack>

        <Typography variant="body1" color="text.secondary">
          🚧 In the meantime, take a look below 🚧
        </Typography>

        <IconButton
          color="inherit"
          href="https://github.com/roopemyller"
          target="_blank"
          rel="noopener"
        >
          <GitHubIcon sx={{ fontSize: 36 }} />
        </IconButton>
      </Box>
  );
}
