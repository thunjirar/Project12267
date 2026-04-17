import os
from pathlib import Path

# 1. ตั้งค่า Path หลักของโปรเจกต์
BASE_DIR = Path(__file__).resolve().parent.parent

# 2. Security Settings
SECRET_KEY = 'django-insecure-+o7iz13%q=4@^8@b0mmlen&s7kfj%x8s=m%0sng+ah!4lt$ktx'
DEBUG = True
ALLOWED_HOSTS = ['yourusername.pythonanywhere.com', 'localhost', '127.0.0.1']

# 3. Application definition
INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'shop', 
]

MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

ROOT_URLCONF = 'pang_organic.urls'

# 4. การตั้งค่า Templates
TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [os.path.join(BASE_DIR, 'templates')], # ค้นหาในโฟลเดอร์ templates หลัก
        'APP_DIRS': True, # ค้นหาใน templates ของแต่ละแอป (shop/templates)
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
                'django.template.context_processors.media', # **เพิ่มบรรทัดนี้เพื่อให้เรียกใช้รูปใน Template ได้**
            ],
        },
    },
]

WSGI_APPLICATION = 'pang_organic.wsgi.application'

# 5. Database
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': BASE_DIR / 'db.sqlite3',
    }
}

# 6. Password validation
AUTH_PASSWORD_VALIDATORS = [
    {'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator'},
    {'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator'},
    {'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator'},
    {'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator'},
]

# 7. Internationalization (ปรับเป็นภาษาไทยและเวลาไทย)
LANGUAGE_CODE = 'th' # เปลี่ยนเป็นภาษาไทยสำหรับระบบ Admin
TIME_ZONE = 'Asia/Bangkok' # เปลี่ยนเป็นเวลาไทย
USE_I18N = True
USE_TZ = True

# 8. Static & Media files
STATIC_URL = 'static/'
STATICFILES_DIRS = [
    os.path.join(BASE_DIR, 'static'),
]
# สำหรับตอน Deploy จริง ต้องมี STATIC_ROOT
STATIC_ROOT = os.path.join(BASE_DIR, 'staticfiles')

# การตั้งค่ารูปภาพ (Media)
MEDIA_URL = '/media/'
MEDIA_ROOT = os.path.join(BASE_DIR, 'media')

DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'