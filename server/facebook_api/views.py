import facebook
import json
from django.http import HttpResponse

APP_ID = '214476328617064'
APP_SECRET = '04a22861d0e4a0fb059be2830bc645ad'

def get_fb_event(request, id):
    oauth_access_token = facebook.get_app_access_token(APP_ID, APP_SECRET)
    graph = facebook.GraphAPI(oauth_access_token)
    event = graph.get_object(id, fields=[
        'name',
        'description',
        'location',
        'owner',
        'cover',
        'parent_group',
        'start_time',
        'end_time',
        'location',
        'parent_group',
        'timezone',
        'venue',
        'id',
    ])
    #event_img = facebook.request('?fields=cover,description,end_time,id,location,name,owner,parent_group,start_time,timezone,updated_time,venue', oauth_access_token)
    return HttpResponse(json.dumps(event), content_type="application/json")