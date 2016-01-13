#!/usr/bin/python

import argparse
import httplib2
import json

from apiclient.discovery import build
from oauth2client.client import flow_from_clientsecrets
from oauth2client.file import Storage
from oauth2client.tools import run_flow, argparser

# Parse the command-line arguments (e.g. --noauth_local_webserver)
parser = argparse.ArgumentParser(parents=[argparser])
flags = parser.parse_args()

# Path to the client_secret.json file downloaded from the Developer Console
CLIENT_SECRET_FILE = 'client_secret.json'

# Check https://developers.google.com/gmail/api/auth/scopes
# for all available scopes
OAUTH_SCOPE = 'https://www.googleapis.com/auth/gmail.readonly'

# Location of the credentials storage file
STORAGE = Storage('gmail.json')

# Start the OAuth flow to retrieve credentials
flow = flow_from_clientsecrets('client_secret.json', scope=OAUTH_SCOPE)
print "flow == %s" % flow
http = httplib2.Http()

# Try to retrieve credentials from storage or run the flow to generate them
credentials = STORAGE.get()
if credentials is None or credentials.invalid:
  credentials = run_flow(flow, STORAGE, flags, http=http)

# Authorize the httplib2.Http object with our credentials
http = credentials.authorize(http)
print "http == %s" % http
# Build the Gmail service from discovery
gmail_service = build('gmail', 'v1', http=http)

# Retrieve a page of threads
threads = gmail_service.users().threads().list(userId='me').execute()

response = gmail_service.users().threads().list(userId='me').execute()

messages = []

if 'messages' in response:
	messages.extend(response['messages'])

print "messages == %s" % messages

print(json.dumps(threads, indent=4))

with open('result.json', 'w') as outfile:
	json.dump(threads, outfile)
# Print ID for each thread
if threads['threads']:
  for thread in threads['threads']:
    print 'Thread ID: %s' % (thread['id'])  
