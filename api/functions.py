def get_week_start():
    now = datetime.datetime.now()
    now = now.replace(hour=0, minute=0, second=0)
    days = WEEKDAYS.index(now.strftime("%A")) + 1  # starting date from Saturday
    week_start = now - datetime.timedelta(days=days)
    return week_start

def get_name(id, arr):
    for a in arr:
        if id == a['id']:
            return a['first_name'] + ' ' + a['last_name']
    return '*name not found'

def generate_action(user, operation, target, name):
    action = Action(user_id=user, operation=operation, target=target, target_name=name)
    action.save()