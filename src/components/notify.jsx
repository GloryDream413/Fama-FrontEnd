import { useCallback } from 'react';

import LaunchIcon from '@mui/icons-material/Launch';
import { Link } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useSnackbar } from 'notistack';

// notify('error', 'Wallet not connected!');
// notify('info', 'Airdrop requested:', signature);
// notify('success', 'Airdrop successful!', signature);
// notify('error', `Airdrop failed! ${error?.message}`, signature);
//   enqueueSnackbar(error.message ? `${error.name}: ${error.message}` : error.name, { variant: 'error' });

const Notification = styled('span')(() => ({
   display: 'flex',
   alignItems: 'center',
}));

const StyledLink = styled(Link)(() => ({
   color: '#ffffff',
   display: 'flex',
   alignItems: 'center',
   marginLeft: 16,
   textDecoration: 'underline',
   '&:hover': {
      color: '#000000',
   },
}));

const StyledLaunchIcon = styled(LaunchIcon)(() => ({
   fontSize: 20,
   marginLeft: 8,
}));

export function useNotify() {
   const { enqueueSnackbar } = useSnackbar();

   return useCallback(
      (variant, message, signature) => {
         enqueueSnackbar(
            <Notification>
               {message}

               {signature && (
                  <StyledLink
                     href={`https://explorer.solana.com/tx/${signature}?cluster=devnet`}
                     target='_blank'
                  >
                     Transaction
                     <StyledLaunchIcon />
                  </StyledLink>
               )}
            </Notification>,
            { variant },
         );
      },
      [enqueueSnackbar],
   );
}
