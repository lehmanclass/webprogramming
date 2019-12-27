from leads.models import Lead
from rest_framework import viewsets, permissions
from .serializers import LeadSerializer

# Lead Viewset
# Allows to create a full CRUD Api
class LeadViewSet(viewsets.ModelViewSet):
    queryset = Lead.objects.all() #Grabs all the leads
    permissions_classes = [
        permissions.AllowAny
    ]

    serializer_class = LeadSerializer