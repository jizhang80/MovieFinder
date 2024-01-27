import Box from '@mui/material/Box';

export default function Provider({providerLogo}) {
	const pathPre = "https://image.tmdb.org/t/p/original"
	const logoPath = pathPre + providerLogo;
	return (
		<Box>
			<img width="50" src={logoPath} ></img>
		</Box>
		);
}