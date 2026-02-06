"""Strava OAuth2 authentication helpers."""

import os
import time
import webbrowser
from http.server import HTTPServer, BaseHTTPRequestHandler
from urllib.parse import urlparse, parse_qs

import requests

TOKEN_URL = "https://www.strava.com/oauth/token"
AUTHORIZE_URL = "https://www.strava.com/oauth/authorize"
DEAUTHORIZE_URL = "https://www.strava.com/oauth/deauthorize"


class TokenStore:
    """Manages access and refresh tokens with automatic refresh."""

    def __init__(self, client_id, client_secret, refresh_token=None):
        self.client_id = client_id
        self.client_secret = client_secret
        self.refresh_token = refresh_token
        self.access_token = None
        self.expires_at = 0

    def get_access_token(self):
        """Return a valid access token, refreshing if expired."""
        if self.access_token and time.time() < self.expires_at - 60:
            return self.access_token
        if not self.refresh_token:
            raise RuntimeError(
                "No refresh token available. Run the OAuth authorization flow first."
            )
        return self._refresh()

    def _refresh(self):
        resp = requests.post(TOKEN_URL, data={
            "client_id": self.client_id,
            "client_secret": self.client_secret,
            "grant_type": "refresh_token",
            "refresh_token": self.refresh_token,
        })
        resp.raise_for_status()
        data = resp.json()
        self.access_token = data["access_token"]
        self.refresh_token = data["refresh_token"]
        self.expires_at = data["expires_at"]
        return self.access_token

    def authorize(self, port=8000, scopes="read,activity:read"):
        """Run the full OAuth2 authorization code flow via a local callback server."""
        redirect_uri = f"http://localhost:{port}/callback"
        auth_url = (
            f"{AUTHORIZE_URL}?client_id={self.client_id}"
            f"&response_type=code&redirect_uri={redirect_uri}"
            f"&scope={scopes}&approval_prompt=auto"
        )

        code = None

        class CallbackHandler(BaseHTTPRequestHandler):
            def do_GET(self):
                nonlocal code
                qs = parse_qs(urlparse(self.path).query)
                code = qs.get("code", [None])[0]
                self.send_response(200)
                self.send_header("Content-Type", "text/html")
                self.end_headers()
                self.wfile.write(b"<h1>Authorization complete. You can close this tab.</h1>")

            def log_message(self, format, *args):
                pass  # suppress request logs

        print(f"Opening browser for Strava authorization...\n{auth_url}")
        webbrowser.open(auth_url)

        server = HTTPServer(("localhost", port), CallbackHandler)
        server.handle_request()

        if not code:
            raise RuntimeError("Did not receive authorization code from Strava.")

        resp = requests.post(TOKEN_URL, data={
            "client_id": self.client_id,
            "client_secret": self.client_secret,
            "code": code,
            "grant_type": "authorization_code",
        })
        resp.raise_for_status()
        data = resp.json()
        self.access_token = data["access_token"]
        self.refresh_token = data["refresh_token"]
        self.expires_at = data["expires_at"]
        print("Authorization successful.")
        return data

    def deauthorize(self):
        """Revoke access for the current token."""
        token = self.get_access_token()
        resp = requests.post(DEAUTHORIZE_URL, headers={
            "Authorization": f"Bearer {token}",
        })
        resp.raise_for_status()
        self.access_token = None
        self.refresh_token = None
        self.expires_at = 0


def token_store_from_env():
    """Create a TokenStore from environment variables."""
    client_id = os.environ.get("STRAVA_CLIENT_ID")
    client_secret = os.environ.get("STRAVA_CLIENT_SECRET")
    refresh_token = os.environ.get("STRAVA_REFRESH_TOKEN")
    if not client_id or not client_secret:
        raise RuntimeError(
            "STRAVA_CLIENT_ID and STRAVA_CLIENT_SECRET must be set. "
            "See .env.example for details."
        )
    return TokenStore(client_id, client_secret, refresh_token)
