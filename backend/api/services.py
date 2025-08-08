from .models import ClassRoom, ClassSession
from datetime import timedelta

def generate_meet_link(classroom, current_date):
    pass

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
                meetUrl=generate_meet_link(classroom, current_date),
                isCanceled=False
            )
            sessions_created += 1

        current_date += timedelta(days=1)

    return sessions_created
        
    