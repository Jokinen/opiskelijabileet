import datetime
from event.models import Event
from event.serializers import EventSerializer
from django.http import Http404
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status


class EventList(APIView):
    """
    List all events.
    """
    def get(self, request, format=None):
        events = Event.objects.all()
        serializer = EventSerializer(events, many=True)
        return Response(serializer.data)


class DateQuery(APIView):
    """
    Events for a specific date.
    """
    def get(self, request):
        if request.method == 'GET':
            print("proot")
            events = Event.objects.all()
            if 'city' in request.GET:
                events = events.filter(city__name=request.GET['city'])
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
    Events for a specific date.
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
