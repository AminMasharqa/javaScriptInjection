const http = require('http');

const server = http.createServer((req, res) => {
    if (req.method === 'GET' && req.url === '/') {
        res.setHeader('Content-Type', 'text/html');
        res.end(`
            <html>
            <head>
                <title>Client Blog</title>
            </head>
            <body>
                <h1>Welcome to the Blog</h1>
                <div id="comments"></div>
                <form method="post" action="/comment">
                    <input type="text" name="comment" placeholder="Enter your comment">
                    <button type="submit">Submit</button>
                </form>
                <script>
                    setTimeout(() => {
                        document.getElementById('comments').innerHTML = '<img src="http://localhost:4000/cookie_monster.jpg" onload="alert(document.cookie)">';
                    }, 1000);
                </script>
            </body>
            </html>
        `);
    } else if (req.method === 'POST' && req.url === '/comment') {
        let body = '';
        req.on('data', chunk => {
            body += chunk.toString();
        });
        req.on('end', () => {
            console.log('Comment submitted:', body);
            res.statusCode = 302;
            res.setHeader('Location', '/');
            res.end();
        });
    } else {
        res.statusCode = 404;
        res.end();
    }
});

server.listen(3000, () => {
    console.log('Client Blog Server running at http://localhost:3000/');
});
