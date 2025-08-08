from .models import ClassRoom, ClassSession
from datetime import timedelta
import datetime
import os.path

import os
import datetime
import uuid
from google.oauth2.credentials import Credentials
from google_auth_oauthlib.flow import InstalledAppFlow
from google.auth.transport.requests import Request
from googleapiclient.discovery import build
from googleapiclient.errors import HttpError

SCOPES = ["https://www.googleapis.com/auth/calendar"]


def generate_meet_link(classroom, current_date, start_time, end_time):
    creds = None

    if os.path.exists("token.json"):
        creds = Credentials.from_authorized_user_file("token.json", SCOPES)
    if not creds or not creds.valid:
        if creds and creds.expired and creds.refresh_token:
            creds.refresh(Request())
        else:
            flow = InstalledAppFlow.from_client_secrets_file("credentials.json", SCOPES)
            creds = flow.run_local_server(port=8080)
        with open("token.json", "w") as token:
            token.write(creds.to_json())

    try:
        service = build("calendar", "v3", credentials=creds)

        # Combine date and time into full datetime objects
        start_datetime = datetime.datetime.combine(current_date, start_time)
        end_datetime = datetime.datetime.combine(current_date, end_time)

        # Ensure timezone is UTC or use your own, like "Europe/Bucharest"
        timezone = "UTC"

        event = {
            'summary': f'Class Session - {classroom}',
            'start': {
                'dateTime': start_datetime.isoformat(),
                'timeZone': timezone,
            },
            'end': {
                'dateTime': end_datetime.isoformat(),
                'timeZone': timezone,
            },
            'conferenceData': {
                'createRequest': {
                    'requestId': str(uuid.uuid4()),
                    'conferenceSolutionKey': {'type': 'hangoutsMeet'}
                }
            },
        }

        created_event = service.events().insert(
            calendarId='primary',
            body=event,
            conferenceDataVersion=1
        ).execute()

        print('Google Meet link:', created_event.get('hangoutLink'))
        return created_event.get('hangoutLink')

    except HttpError as error:
        print(f"An error occurred: {error}")
        return None



def generate_session(classroom: ClassRoom):
    pass
    WEEKDAY_CODES = ['MO', 'TU', 'WE', 'TH', 'FR', 'SA', 'SU']
    start_date = classroom.start_date
    end_date = classroom.end_date
    repeat_days = classroom.repeat_days.split(',')
    
    current_date = start_date
    sessions_created = 0
    
    while current_date <= end_date:
        weekday_code = WEEKDAY_CODES[current_date.weekday()]
        if weekday_code in repeat_days:
            ClassSession.objects.create(
                classRoom=classroom,
                date=current_date,
                meetUrl=generate_meet_link(classroom, current_date, classroom.start_time, classroom.end_time),
                isCanceled=False
            )
            sessions_created += 1

        current_date += timedelta(days=1)

    return sessions_created
        
    