"""Command-line interface for querying the Strava API."""

import argparse
import json
import sys

from .auth import token_store_from_env
from .client import StravaClient


def _print_json(data):
    print(json.dumps(data, indent=2))


def cmd_authorize(client, token_store, args):
    data = token_store.authorize(scopes=args.scopes)
    print(f"\nRefresh token (save this to STRAVA_REFRESH_TOKEN):\n{data['refresh_token']}")


def cmd_athlete(client, token_store, args):
    _print_json(client.get_athlete())


def cmd_stats(client, token_store, args):
    athlete = client.get_athlete()
    _print_json(client.get_athlete_stats(athlete["id"]))


def cmd_activities(client, token_store, args):
    _print_json(client.list_activities(page=args.page, per_page=args.per_page))


def cmd_activity(client, token_store, args):
    _print_json(client.get_activity(args.id))


def cmd_segments_explore(client, token_store, args):
    bounds = [float(b) for b in args.bounds.split(",")]
    _print_json(client.explore_segments(bounds, activity_type=args.type))


def cmd_club(client, token_store, args):
    _print_json(client.get_club(args.id))


def cmd_routes(client, token_store, args):
    _print_json(client.list_athlete_routes(page=args.page, per_page=args.per_page))


def main(argv=None):
    parser = argparse.ArgumentParser(description="Strava API CLI")
    sub = parser.add_subparsers(dest="command", required=True)

    # authorize
    p = sub.add_parser("authorize", help="Run OAuth2 authorization flow")
    p.add_argument("--scopes", default="read,activity:read", help="OAuth scopes")

    # athlete
    sub.add_parser("athlete", help="Show authenticated athlete profile")

    # stats
    sub.add_parser("stats", help="Show athlete stats")

    # activities
    p = sub.add_parser("activities", help="List recent activities")
    p.add_argument("--page", type=int, default=1)
    p.add_argument("--per-page", type=int, default=10)

    # activity detail
    p = sub.add_parser("activity", help="Get activity details")
    p.add_argument("id", type=int)

    # explore segments
    p = sub.add_parser("segments-explore", help="Explore segments in a bounding box")
    p.add_argument("bounds", help="sw_lat,sw_lng,ne_lat,ne_lng")
    p.add_argument("--type", default="riding", choices=["riding", "running"])

    # club
    p = sub.add_parser("club", help="Get club details")
    p.add_argument("id", type=int)

    # routes
    p = sub.add_parser("routes", help="List athlete routes")
    p.add_argument("--page", type=int, default=1)
    p.add_argument("--per-page", type=int, default=10)

    args = parser.parse_args(argv)

    token_store = token_store_from_env()
    client = StravaClient(token_store)

    commands = {
        "authorize": cmd_authorize,
        "athlete": cmd_athlete,
        "stats": cmd_stats,
        "activities": cmd_activities,
        "activity": cmd_activity,
        "segments-explore": cmd_segments_explore,
        "club": cmd_club,
        "routes": cmd_routes,
    }
    commands[args.command](client, token_store, args)


if __name__ == "__main__":
    main()
