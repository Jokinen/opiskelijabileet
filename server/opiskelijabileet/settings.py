"""
Django settings for opiskelijabileet project.

Generated by 'django-admin startproject' using Django 1.8.4.

For more information on this file, see
https://docs.djangoproject.com/en/1.8/topics/settings/

For the full list of settings and their values, see
https://docs.djangoproject.com/en/1.8/ref/settings/
"""

# Build paths inside the project like this: os.path.join(BASE_DIR, ...)
import os

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))


# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/1.8/howto/deployment/checklist/

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = 'wqtd@=%^urzr=34&4-*ti0ej7c=il5zmyi&&6a9ug^7dkes6!w'

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = False

ALLOWED_HOSTS = [
    'localhost',
    '127.0.0.1',
    '.opiskelijatapahtumat.fi',
    '46.101.226.205'
]

# Application definition

INSTALLED_APPS = (
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'django.contrib.sitemaps',
    'rest_framework',
    'rest_framework.authtoken',
    'rest_auth',
    'taggit',
    'taggit_serializer',
    'event',
    'group_profile',
    'city',
    'school',
)

MIDDLEWARE_CLASSES = (
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.auth.middleware.SessionAuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
    'django.middleware.security.SecurityMiddleware',
    'django.middleware.locale.LocaleMiddleware',
)

ROOT_URLCONF = 'opiskelijabileet.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [
            os.path.join(BASE_DIR, '../webapp'),
        ],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.media',
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'opiskelijabileet.wsgi.application'


# Database
# https://docs.djangoproject.com/en/1.8/ref/settings/#databases

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql_psycopg2',
        'NAME': 'django',
        'USER': 'django',
        'PASSWORD': '0T2KrLVmcV',
        'HOST': 'localhost',
    }
}


# Internationalization
# https://docs.djangoproject.com/en/1.8/topics/i18n/

LANGUAGE_CODE = 'fi-fi'

TIME_ZONE = 'Europe/Helsinki'

ugettext = lambda s: s

LANGUAGES = (
    ('fi-FI', ugettext('Finnish')),
)

LOCALE_PATHS = (
    os.path.join(BASE_DIR, 'event/locale/'),
)

USE_I18N = True

USE_L10N = True

USE_TZ = True

STATIC_ROOT = ''

STATICFILES_DIRS = (
    os.path.join(BASE_DIR, '../webapp/app'),
)

# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/1.8/howto/static-files/

STATIC_URL = '/static/'

MEDIA_ROOT = os.path.join(BASE_DIR, 'media/')
MEDIA_URL = 'media/'

# Taggit

TAGGIT_CASE_INSENSITIVE = True

OAUTH_TOKENS_FACEBOOK_CLIENT_ID = '214476328617064'
OAUTH_TOKENS_FACEBOOK_CLIENT_SECRET = '04a22861d0e4a0fb059be2830bc645ad'

REST_AUTH_SERIALIZERS = {
    'USER_DETAILS_SERIALIZER': 'opiskelijabileet.auth_serializer.UserDetailsSerializer',
}
