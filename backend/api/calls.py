import os
from twilio.rest import Client
from dotenv import load_dotenv
load_dotenv()

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = os.environ["TWILIO_ACCOUNT_SID"]
auth_token = os.environ["TWILIO_AUTH_TOKEN"]
client = Client(account_sid, auth_token)

call = client.calls.create(
    from_="+15164477892",
    to="+40 736 564 409",
    url="https://remainder-5992.twil.io/remainder",
)

print(call.sid)