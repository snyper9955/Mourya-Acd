require('./src/config/env.js'); 
const http = require('http');
const { Server } = require('socket.io');
const connectDB = require('./src/config/db');
const { errorHandler } = require('./src/middlewares/errorMiddleware');
const app = require('./src/app');

// Connect to Database
connectDB();

// Create HTTP server
const server = http.createServer(app);

// Initialize Socket.io
const io = new Server(server, {
    cors: {
        origin: [
            process.env.FRONTEND_URL, 
            "http://localhost:5173", 
            "http://127.0.0.1:5173",
            "https://www.mouryaacademy.in",
            "https://mouryaacademy.in",
            /\.vercel\.app$/
        ],
        methods: ["GET", "POST"],
        credentials: true
    }
});

app.set('io', io);

// Socket.io handlers
io.on('connection', (socket) => {
    console.log('A user connected:', socket.id);

    socket.on('joinRoom', (userId) => {
        socket.join(userId);
        console.log(`User ${userId} joined their room`);
    });

    socket.on('disconnect', () => {
        console.log('User disconnected');
    });
});

// Root Route
app.get('/', (req, res) => {
    res.send('API is running...');
});

// Error handling middleware (Should be last)
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);

    // Keep-alive ping to prevent Render/Heroku from sleeping
    const BACKEND_URL = process.env.RENDER_EXTERNAL_URL || process.env.BASE_URL || `http://localhost:${PORT}`;
    const PING_INTERVAL = 14 * 60 * 1000; // 14 minutes
    
    setInterval(() => {
        try {
            const protocol = BACKEND_URL.startsWith('https') ? require('https') : require('http');
            protocol.get(BACKEND_URL, (resp) => {
                if (resp.statusCode === 200) {
                    console.log('Keep-alive ping successful');
                } else {
                    console.log('Keep-alive ping failed with status:', resp.statusCode);
                }
            }).on("error", (err) => {
                console.log('Keep-alive ping error:', err.message);
            });
        } catch (error) {
            console.log('Keep-alive ping error:', error.message);
        }
    }, PING_INTERVAL);
});

// Export io for use in controllers
module.exports = { io };
