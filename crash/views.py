from django.http import JsonResponse
from django.shortcuts import render
from django.shortcuts import render,HttpResponse,redirect
# import requests
import json

from crash.models import Number
# Create your views here.

def index(request):

    return render(request, 'index.html')

def get_next_number(request):
    if request.method == 'GET':
        input_value = request.GET.get('value')

        if input_value is None:
            return JsonResponse({'error': 'No input value provided'})

        try:
            input_number = float(input_value)
            next_number_obj = Number.objects.filter(value__gt=input_number).order_by('value').first()
            if next_number_obj:
                return JsonResponse({
                    'success': True,
                    'next_number': next_number_obj.value,
                    'next_color': next_number_obj.color
                })
                
                return JsonResponse(response_data)
            else:
                return JsonResponse({'success': False, 'message': 'No next number found'})
        except ValueError:
            return JsonResponse({'error': 'Invalid input value. Please provide a valid number.'})

    else:
        return JsonResponse({'error': 'Invalid request method'})