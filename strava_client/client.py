"""Strava API v3 client."""

import requests

BASE_URL = "https://www.strava.com/api/v3"


class StravaClient:
    """Thin wrapper around the Strava REST API v3."""

    def __init__(self, token_store):
        self.token_store = token_store

    def _headers(self):
        token = self.token_store.get_access_token()
        return {"Authorization": f"Bearer {token}"}

    def _get(self, path, params=None):
        resp = requests.get(f"{BASE_URL}{path}", headers=self._headers(), params=params)
        resp.raise_for_status()
        return resp.json()

    def _put(self, path, data=None):
        resp = requests.put(f"{BASE_URL}{path}", headers=self._headers(), json=data)
        resp.raise_for_status()
        return resp.json()

    # ---- Athlete ----

    def get_athlete(self):
        """Get the authenticated athlete's profile."""
        return self._get("/athlete")

    def get_athlete_stats(self, athlete_id):
        """Get stats for a given athlete (must be the authenticated athlete)."""
        return self._get(f"/athletes/{athlete_id}/stats")

    def get_athlete_zones(self):
        """Get the authenticated athlete's heart rate and power zones."""
        return self._get("/athlete/zones")

    # ---- Activities ----

    def list_activities(self, page=1, per_page=30, before=None, after=None):
        """List the authenticated athlete's activities."""
        params = {"page": page, "per_page": per_page}
        if before:
            params["before"] = int(before)
        if after:
            params["after"] = int(after)
        return self._get("/athlete/activities", params=params)

    def get_activity(self, activity_id, include_all_efforts=False):
        """Get details of a specific activity."""
        params = {"include_all_efforts": include_all_efforts}
        return self._get(f"/activities/{activity_id}", params=params)

    def get_activity_laps(self, activity_id):
        """Get laps for an activity."""
        return self._get(f"/activities/{activity_id}/laps")

    def get_activity_zones(self, activity_id):
        """Get zones for an activity."""
        return self._get(f"/activities/{activity_id}/zones")

    def get_activity_comments(self, activity_id, page=1, per_page=30):
        """Get comments on an activity."""
        return self._get(
            f"/activities/{activity_id}/comments",
            params={"page": page, "per_page": per_page},
        )

    def get_activity_kudos(self, activity_id, page=1, per_page=30):
        """Get kudos on an activity."""
        return self._get(
            f"/activities/{activity_id}/kudos",
            params={"page": page, "per_page": per_page},
        )

    def update_activity(self, activity_id, **kwargs):
        """Update an activity (name, type, description, etc.)."""
        return self._put(f"/activities/{activity_id}", data=kwargs)

    # ---- Segments ----

    def get_segment(self, segment_id):
        """Get a specific segment."""
        return self._get(f"/segments/{segment_id}")

    def explore_segments(self, bounds, activity_type="riding", min_cat=None, max_cat=None):
        """Explore segments in a given area. bounds = [sw_lat, sw_lng, ne_lat, ne_lng]."""
        params = {
            "bounds": ",".join(str(b) for b in bounds),
            "activity_type": activity_type,
        }
        if min_cat is not None:
            params["min_cat"] = min_cat
        if max_cat is not None:
            params["max_cat"] = max_cat
        return self._get("/segments/explore", params=params)

    def get_segment_leaderboard(self, segment_id, page=1, per_page=30):
        """Get the leaderboard for a segment."""
        return self._get(
            f"/segments/{segment_id}/leaderboard",
            params={"page": page, "per_page": per_page},
        )

    def star_segment(self, segment_id, starred=True):
        """Star or unstar a segment."""
        return self._put(f"/segments/{segment_id}/starred", data={"starred": starred})

    # ---- Clubs ----

    def get_club(self, club_id):
        """Get details of a club."""
        return self._get(f"/clubs/{club_id}")

    def list_club_activities(self, club_id, page=1, per_page=30):
        """List recent activities from club members."""
        return self._get(
            f"/clubs/{club_id}/activities",
            params={"page": page, "per_page": per_page},
        )

    def list_club_members(self, club_id, page=1, per_page=30):
        """List club members."""
        return self._get(
            f"/clubs/{club_id}/members",
            params={"page": page, "per_page": per_page},
        )

    # ---- Routes ----

    def get_route(self, route_id):
        """Get a route by ID."""
        return self._get(f"/routes/{route_id}")

    def list_athlete_routes(self, page=1, per_page=30):
        """List the authenticated athlete's routes."""
        return self._get("/athlete/routes", params={"page": page, "per_page": per_page})

    # ---- Streams ----

    def get_activity_streams(self, activity_id, keys=None, series_type="distance"):
        """Get streams (time series data) for an activity."""
        if keys is None:
            keys = ["time", "distance", "altitude", "heartrate", "cadence", "watts"]
        return self._get(
            f"/activities/{activity_id}/streams",
            params={
                "keys": ",".join(keys),
                "key_type": series_type,
            },
        )

    def get_segment_streams(self, segment_id, keys=None):
        """Get streams for a segment."""
        if keys is None:
            keys = ["distance", "altitude", "latlng"]
        return self._get(
            f"/segments/{segment_id}/streams",
            params={"keys": ",".join(keys)},
        )

    def get_route_streams(self, route_id):
        """Get streams for a route."""
        return self._get(f"/routes/{route_id}/streams")
