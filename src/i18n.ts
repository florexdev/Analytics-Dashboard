import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      "dashboard": "Dashboard",
      "logs": "System Logs",
      "settings": "Settings",
      "new_order": "New Order",
      "export": "Export",
      "search_placeholder": "Search by customer or order...",
      "recent_transactions": "Recent Transactions",
      "showing_records": "Showing {{count}} records",
      "total_revenue": "Total Revenue",
      "active_users": "Active Users",
      "system_uptime": "System Uptime",
      "new_signups": "New Signups",
      "revenue_overview": "Revenue Overview",
      "user_sessions": "User Sessions",
      "Dashboard Overview": "Dashboard Overview",
      "Welcome back. Here's what's happening with {{name}} today.": "Welcome back, here's what's happening with {{name}} today.",
      "Total Sales": "Total Sales",
      "Total Orders": "Total Orders",
      "tenant_settings": "Tenant Settings",
      "tenant_settings_desc": "Manage configuration and preferences for {{name}}.",
      "general_info": "General Information",
      "tenant_name": "Tenant Name",
      "tenant_id": "Tenant ID (Read Only)",
      "subscription_plan": "Subscription Plan",
      "save_changes": "Save Changes",
      "add_new_tenant": "Add New Tenant",
      "new_tenant_name": "New Tenant Name",
      "create_tenant": "Create Tenant",
      "system_health": "System Health & Logs",
      "system_health_desc": "Real-time infrastructure monitoring for {{name}}.",
      "server_load": "Server Load",
      "db_latency": "Database Latency",
      "error_rate": "Error Rate",
      "live": "Live",
      "no_tenant_title": "Welcome to SaaS Analytics",
      "no_tenant_desc": "You don't have any tenants configured yet. Please create your first tenant to continue.",
      "go_to_settings": "Go to Settings"
    }
  },
  tr: {
    translation: {
      "dashboard": "Kontrol Paneli",
      "logs": "Sistem Kayıtları",
      "settings": "Ayarlar",
      "new_order": "Yeni Sipariş",
      "export": "Dışa Aktar",
      "search_placeholder": "Müşteri veya sipariş ara...",
      "recent_transactions": "Son İşlemler",
      "showing_records": "{{count}} kayıt gösteriliyor",
      "total_revenue": "Toplam Gelir",
      "active_users": "Aktif Kullanıcılar",
      "system_uptime": "Sistem Çalışma Süresi",
      "new_signups": "Yeni Kayıtlar",
      "revenue_overview": "Gelir Özeti",
      "user_sessions": "Kullanıcı Oturumları",
      "Dashboard Overview": "Kontrol Paneli Özeti",
      "Welcome back. Here's what's happening with {{name}} today.": "Tekrar hoş geldiniz, işte {{name}} için bugünkü gelişmeler.",
      "Total Sales": "Toplam Satış",
      "Total Orders": "Toplam Sipariş",
      "tenant_settings": "İşletme Ayarları",
      "tenant_settings_desc": "{{name}} için yapılandırma ve tercihleri yönetin.",
      "general_info": "Genel Bilgiler",
      "tenant_name": "İşletme Adı",
      "tenant_id": "İşletme ID (Salt Okunur)",
      "subscription_plan": "Abonelik Planı",
      "save_changes": "Değişiklikleri Kaydet",
      "add_new_tenant": "Yeni İşletme Ekle",
      "new_tenant_name": "Yeni İşletme Adı",
      "create_tenant": "İşletme Oluştur",
      "system_health": "Sistem Sağlığı ve Loglar",
      "system_health_desc": "{{name}} için gerçek zamanlı altyapı izleme.",
      "server_load": "Sunucu Yükü",
      "db_latency": "Veritabanı Gecikmesi",
      "error_rate": "Hata Oranı",
      "live": "Canlı",
      "no_tenant_title": "SaaS Analytics'e Hoş Geldiniz",
      "no_tenant_desc": "Henüz yapılandırılmış bir işletmeniz (tenant) yok. Lütfen devam etmek için ilk işletmenizi oluşturun.",
      "go_to_settings": "Ayarlara Git"
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: "en", // default language
    fallbackLng: "en",
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
