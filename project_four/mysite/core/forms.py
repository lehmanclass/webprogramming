from django import forms
from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth.models import User


class SignUpForm(UserCreationForm):
    email = forms.EmailField(max_length=254, help_text='Enter your email address')
    birth_date = forms.DateField(help_text='Must be in this format: YYYY-MM-DD')
    bio = forms.CharField(max_length=500, required=False, help_text='Please enter a little information about yourself!')
     

    class Meta:
        model = User
        fields = ('username', 'email', 'password1', 'password2', 'birth_date','bio')


