from django.urls import path
from . import views

urlpatterns = [
    # --- หน้าฝั่งลูกค้า (Customer Side) ---
    path('', views.index, name='index'),
    path('menu/', views.menu_view, name='menu'),
    path('cart/', views.cart, name='cart'),
    path('checkout/', views.checkout, name='checkout'),
    path('about/', views.about, name='about'),
    path('contact/', views.contact, name='contact'),
    path('custom/', views.custom_view, name='custom'),
    path('team/', views.team_view, name='team'),
    path('login/', views.login_view, name='login'),
    
    # เพิ่มบรรทัดนี้ลงไปเพื่อให้แมตช์กับ {% url 'register' %} ใน Template
    path('register/', views.register_view, name='register'), 

    # --- หน้าฝั่งจัดการ (Admin Panel) ---
    path('admin-panel/', views.admin_dashboard, name='admin_dashboard'),
    path('admin-panel/inventory/', views.inventory, name='inventory'),
    path('admin-panel/orders/', views.orders, name='orders'),
    path('admin-panel/shipping/', views.shipping, name='shipping'),
    path('admin-panel/customers/', views.customers, name='customers'),
    path('admin-panel/reports/', views.reports, name='reports'),
]