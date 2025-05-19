const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 3000;

const mimeTypes = {
    '.html': 'text/html',
    '.js': 'text/javascript',
    '.css': 'text/css',
    '.json': 'application/json',
    '.png': 'image/png',
    '.jpg': 'image/jpg',
    '.jpeg': 'image/jpeg',
    '.gif': 'image/gif',
    '.svg': 'image/svg+xml',
    '.pdf': 'application/pdf',
    '.ico': 'image/x-icon'
};

const server = http.createServer((req, res) => {
    console.log(`Request for ${req.url} received.`);

    // Normalize URL by removing query string and trailing slash
    let url = req.url;
    if (url.includes('?')) {
        url = url.substring(0, url.indexOf('?'));
    }

    // If URL is '/', serve index.html
    if (url === '/') {
        url = '/index.html';
    }

    // Get the file path
    let filePath = path.join(__dirname, url);

    // Check if the file exists
    fs.access(filePath, fs.constants.F_OK, (err) => {
        if (err) {
            // File doesn't exist, return 404
            console.log(`File ${filePath} not found.`);
            res.writeHead(404, { 'Content-Type': 'text/html' });
            res.end('<h1>404 Not Found</h1>');
            return;
        }

        // Check if the path is a directory
        fs.stat(filePath, (err, stats) => {
            if (err) {
                // Error checking file stats
                console.error(`Error reading file stats: ${err}`);
                res.writeHead(500, { 'Content-Type': 'text/html' });
                res.end('<h1>500 Internal Server Error</h1>');
                return;
            }

            if (stats.isDirectory()) {
                // If it's a directory, try to serve index.html from it
                filePath = path.join(filePath, 'index.html');

                // Check if index.html exists in the directory
                fs.access(filePath, fs.constants.F_OK, (err) => {
                    if (err) {
                        // No index.html in directory
                        res.writeHead(404, { 'Content-Type': 'text/html' });
                        res.end('<h1>404 Not Found</h1>');
                        return;
                    }

                    // Serve the index.html
                    serveFile(filePath, res);
                });
            } else {
                // It's a file, serve it
                serveFile(filePath, res);
            }
        });
    });
});

function serveFile(filePath, res) {
    // Get file extension
    const extname = path.extname(filePath);

    // Get the MIME type
    const contentType = mimeTypes[extname] || 'application/octet-stream';

    // Read and serve the file
    fs.readFile(filePath, (err, content) => {
        if (err) {
            if (err.code === 'ENOENT') {
                // File not found
                console.log(`File ${filePath} not found.`);
                res.writeHead(404, { 'Content-Type': 'text/html' });
                res.end('<h1>404 Not Found</h1>');
            } else {
                // Server error
                console.error(`Server error: ${err}`);
                res.writeHead(500, { 'Content-Type': 'text/html' });
                res.end('<h1>500 Internal Server Error</h1>');
            }
        } else {
            // Success
            res.writeHead(200, { 'Content-Type': contentType });
            res.end(content, 'utf-8');
        }
    });
}

server.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}/`);
    console.log(`Press Ctrl+C to stop the server.`);
}); 