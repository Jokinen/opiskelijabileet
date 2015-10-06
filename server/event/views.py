import datetime
from rest_framework.parsers import JSONParser, FormParser, MultiPartParser
from rest_framework.views import APIView
from rest_framework import status
from rest_framework.response import Response
from django.shortcuts import get_object_or_404
from django.core import serializers
from django.http import Http404
from event.models import Event
from event.serializers import EventSerializer
from city.models import City
from city.serializers import CitySerializer
from group_profile.models import GroupProfile


class EventList(APIView):
    """
    List all events.
    """
    def get(self, request, format=None):
        events = Event.objects.all()
        serializer = EventSerializer(events, many=True)
        return Response(serializer.data)


class EventSingle(APIView):
    """
    Get event.
    """
    parser_classes = (JSONParser, FormParser, MultiPartParser)

    def get(self, request, id, format=None):
        event = get_object_or_404(Event, pk=id)
        serializer = EventSerializer(event)
        return Response(serializer.data)

    def post(self, request, format=None):
        request.data[u'creator'] = self.request.user.id
        serializer = EventSerializer(data=request.data)
        if serializer.is_valid():
            #print(serializer)
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class DateQuery(APIView):
    """
    Events for a specific date.
    """
    def get(self, request):
        if request.method == 'GET':
            events = Event.objects.filter(is_public=True).select_related()
            if 'cities' in request.GET:
                cities = request.GET['cities'].split(',')
                events = events.filter(city__name__in=cities)
            if 'year' in request.GET \
                    and 'month' in request.GET \
                    and 'day' in request.GET \
                    and 'daterange' in request.GET:
                year, month, day, daterange = int(request.GET['year']), int(request.GET['month']), int(request.GET['day']), int(request.GET['daterange'])
                start_date = datetime.date(year, month, day)
                dates = []
                for x in range(0, daterange):
                    this_date = start_date + datetime.timedelta(days=x)
                    events_tmp = events.filter(start_time__year=this_date.year, start_time__month=this_date.month, start_time__day=this_date.day)
                    serializer = EventSerializer(events_tmp, many=True)
                    date = {
                        'date': this_date,
                        'events': serializer.data
                    }
                    dates.append(date)
                return Response(dates)
            else:
                return Response()
        else:
            return Response()


class DateList(APIView):
    """
    Events for a specific dates.
    """
    def get(self, request, year, month, day):
        year, month, day = int(year), int(month), int(day)
        events = Event.objects.filter(start_time__year=year, start_time__month=month, start_time__day=day)
        serializer = EventSerializer(events, many=True)
        date = {
            'date': datetime.date(year, month, day),
            'events': serializer.data
        }
        return Response(date)


class DateRangeList(APIView):
    """
    Events for a specific date range.
    """
    def get(self, request, year, month, day, daterange):
        year, month, day, daterange = int(year), int(month), int(day), int(daterange)
        # Maybe a more efficient call (only hit db once)
        # start_date = datetime.date(year, month, day)
        # end_date = start_date + datetime.timedelta(days=daterange)
        # events = Event.objects.filter(start_time__range=(start_date, end_date)
        start_date = datetime.date(year, month, day)
        dates = []
        for x in range(0, daterange):
            this_date = start_date + datetime.timedelta(days=x)
            events = Event.objects.filter(start_time__year=this_date.year, start_time__month=this_date.month, start_time__day=this_date.day)
            serializer = EventSerializer(events, many=True)
            date = {
                'date': this_date,
                'events': serializer.data
            }
            dates.append(date)
        return Response(dates)
