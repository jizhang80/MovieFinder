import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Provider from './Provider';

export default function StreamingInfo({providers}) {
	return (
		<Box>
			<Typography variant="h6">Now Streaming</Typography>
			{providers.map((provider) => <Provider providerLogo={provider.logo_path} key={provider.provider_id} />)}
		</Box>
		);
}

