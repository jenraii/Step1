import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

function Home() {
    return (
        <div>
            <AppBar position="static" color="secondary">
                <Toolbar>
                    <Typography variant="h6">TRAINING APPLICATION</Typography>
                </Toolbar>
            </AppBar>
            <img src="https://pixabay.com/get/ge0518a7dd32a525731a1477e6770fae667d141248299e62e7eed751df0109dcdbddb515336edea0a1eba915f62de7a2a_1280.jpg" alt="training" />
        </div>
    );
}

export default Home;
