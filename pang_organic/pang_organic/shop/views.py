from django.shortcuts import render
from .models import Product
from django.core.paginator import Paginator  # นำเข้าตัวแบ่งหน้า

# --- หน้าฝั่งลูกค้า (Customer Side) ---

def index(request):
    """หน้าแรกของเว็บไซต์ฝั่งลูกค้า"""
    return render(request, 'shop/index.html')

def menu_view(request):
    """หน้าแสดงรายการสินค้าทั้งหมด พร้อมระบบแบ่งหน้า (Pagination)"""
    product_list = Product.objects.all().order_by('id')  # ดึงสินค้าทั้งหมดเรียงตาม ID
    
    # แสดงหน้าละ 8 ชิ้น (เพื่อให้โชว์ 4 คอลัมน์ x 2 แถว พอดีสวยๆ)
    paginator = Paginator(product_list, 4) 
    
    page_number = request.GET.get('page')
    products = paginator.get_page(page_number)
    
    return render(request, 'shop/menu.html', {'products': products})

def cart(request):
    """หน้าตะกร้าสินค้า"""
    return render(request, 'shop/cart.html')

def checkout(request):
    """หน้าชำระเงิน"""
    return render(request, 'shop/checkout.html')

def about(request):
    """หน้าเกี่ยวกับเรา"""
    return render(request, 'shop/about.html')

def contact(request):
    """หน้าติดต่อสอบถาม"""
    return render(request, 'shop/contact.html')

def custom_view(request):
    """หน้าสำหรับสั่งทำสินค้าพิเศษ"""
    return render(request, 'shop/custom.html')

def team_view(request):
    """หน้าข้อมูลทีมงาน"""
    return render(request, 'shop/team.html')

def login_view(request):
    """หน้าเข้าสู่ระบบ"""
    return render(request, 'shop/login.html')

def register_view(request):
    """หน้าสมัครสมาชิก"""
    return render(request, 'shop/register.html')

# --- หน้าฝั่งจัดการ (Admin Side) ---

def admin_dashboard(request):
    """หน้าหลัก Admin Dashboard"""
    return render(request, 'shop/admin.html')

def inventory(request):
    """หน้าจัดการสต็อกสินค้า"""
    products = Product.objects.all()
    return render(request, 'shop/inventory.html', {'products': products})

def orders(request):
    """หน้ารายการสั่งซื้อ"""
    return render(request, 'shop/orders.html')

def shipping(request):
    """หน้าจัดการการจัดส่ง"""
    return render(request, 'shop/shipping.html')

def customers(request):
    """หน้าจัดการข้อมูลลูกค้า"""
    return render(request, 'shop/customers.html')

def reports(request):
    """หน้าสรุปรายงาน"""
    return render(request, 'shop/reports.html')