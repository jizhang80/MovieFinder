import { useState } from "react";
import { useNavigate } from 'react-router-dom';

import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';

export default function SearchForm() {
	const [keyword, setKeyword] = useState("");
	const navigate = useNavigate();
	const handleInputChange = (e) => {
		const { target } = e;
		setKeyword(target.value);
	};

	const handleFormSubmit = async (e) => {
		e.preventDefault();
		//open page Movie search results page, just pass the search keyword to that page
		navigate(`/search/${keyword}`);
	}

	return (
	<Box mt={2} sx={{ width: '100%', textAlign: 'left' }}>
		<form onSubmit={handleFormSubmit}>
			<Typography variant="h5" gutterBottom>
				Search for Movies
			</Typography>
			<TextField
				variant="outlined"
				placeholder="Search..."
				fullWidth
				sx={{ marginBottom: '20px' }}
				onChange={handleInputChange}
			/>
			<Button
				variant="contained"
				color="primary"
				type='submit'
				style={{
					backgroundColor: 'black',
					color: 'white',
					opacity: '0.8',
					transition: 'opacity 0.3s',
				}}
				sx={{
					'&:hover': {
						opacity: '1',
					},
				}}
			>
				Search
			</Button>
		</form>
	</Box>
		);
}