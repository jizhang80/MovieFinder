import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';

export default function PercentageCircular({value}) {
	return (
		<Box sx={{ position: 'relative', display: 'inline-flex', backgroundColor: 'black', borderRadius: '50%' }}>
			<CircularProgress sx={{color: 'green',}} variant="determinate" value={value} />
			<Box
				sx={{
					top: 0,
					left: 0,
					bottom: 0,
					right: 0,
					position: 'absolute',
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'center',
				}}
			>
				<Typography variant="caption" component="div" color="white">
					{`${Math.round(value)}%`}
				</Typography>
			</Box>
		</Box>
		);
}

