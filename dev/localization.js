// localization.js
export const localization = {
    en: {
      addEmployee: 'Add Employee',
      firstName: 'First Name',
      lastName: 'Last Name',
      email: 'Email',
      phone: 'Phone',
      department: 'Department',
      actions: 'Actions',
      edit: 'Edit',
      delete: 'Delete',
      updateEmployee: 'Update Employee',
      search: 'Search by name or email',
      listView: 'List View',
      tableView: 'Table View',
      next: 'Next',
      previous: 'Previous',
      page: 'Page',
      noEmployeesFound: 'No employees found.',
      employeeList: 'Employee List',
      switchToTable: 'Switch to Table View',
      switchToList: 'Switch to List View',
      dateEmployment: 'Date of Employment',
      dateBirth: 'Date of Birth',
      position: 'Position',
      save: 'Save',
      cancel: 'Cancel',
      yes: 'Yes',
      no: 'No',
      areYouSure: 'Are you sure you want to delete this employee?'
    },
    tr: {
        addEmployee: 'Çalışan Ekle',
        firstName: 'Ad',
        lastName: 'Soyad',
        email: 'Eposta',
        phone: 'Telefon',
        department: 'Bölüm',
        actions: 'Eylemler',
        edit: 'Düzenle',
        delete: 'Sil',
        updateEmployee: 'Düzenle',
        search: 'Isme veya epostayla ara',
        listView: 'Liste görüntüsü',
        tableView: 'Tablo görüntüsü',
        next: 'Sonraki',
        previous: 'Önceki',
        page: 'Sayfa',
        noEmployeesFound: 'Çalışan bulunamadı.',
        employeeList: 'Çalıșan Listesi',
        switchToTable: 'Tablo goruntusune gec',
        switchToList: 'Listelemeye gec',
        dateEmployment: 'İșe Giriș Tarihi',
        dateBirth: 'Doğum Tarihi',
        position: 'Pozisyon',
        save: 'Kaydet',
        cancel: 'Iptal',
        yes: 'Evet',
        no: 'Hayır',
        areYouSure: 'Kaydı silmek için eminmisiniz?'
    }
  };
  
  export function getCurrentLang() {
    const lang = document.documentElement.lang || 'en';
    return lang;
  }
  