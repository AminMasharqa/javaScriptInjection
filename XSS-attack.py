from http.server import BaseHTTPRequestHandler, HTTPServer
import urllib.parse as urlparse

# HTML content with Bootstrap styling
html_content = '''
<!doctype html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Simple Blog</title>
    <link href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" rel="stylesheet">
</head>
<body>
    <div class="container mt-5">
        <h1 class="mb-4">Simple Blog</h1>
        <form method="POST" action="/">
            <div class="form-group">
                <label for="comment">Leave a comment:</label>
                <textarea class="form-control" id="comment" name="comment" rows="3" required></textarea>
            </div>
            <button type="submit" class="btn btn-primary">Submit</button>
        </form>
        <hr>
        <h2>Comments:</h2>
        <div id="comments">
            {comments}
        </div>
    </div>
</body>
</html>
'''

comments_list = []

class MyHandler(BaseHTTPRequestHandler):
    def do_GET(self):
        # Display the page with the form and comments
        comments_html = '<ul class="list-group">'
        for comment in comments_list:
            comments_html += f'<li class="list-group-item">{comment}</li>'
        comments_html += '</ul>'
        
        content = html_content.format(comments=comments_html).encode('utf-8')
        self.send_response(200)
        self.send_header('Content-type', 'text/html')
        self.end_headers()
        self.wfile.write(content)

    def do_POST(self):
        # Handle form submission and display the page again
        content_length = int(self.headers['Content-Length'])
        post_data = self.rfile.read(content_length)
        parsed_data = urlparse.parse_qs(post_data.decode('utf-8'))
        comment = parsed_data.get('comment', [''])[0]
        comments_list.append(comment)
        
        self.send_response(302)
        self.send_header('Location', '/')
        self.end_headers()

def run(server_class=HTTPServer, handler_class=MyHandler, port=8080):
    server_address = ('', port)
    httpd = server_class(server_address, handler_class)
    print(f'Starting httpd server on port {port}')
    httpd.serve_forever()

if __name__ == "__main__":
    run()
