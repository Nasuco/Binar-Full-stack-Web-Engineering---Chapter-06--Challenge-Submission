## Getting Started

Didalam repository ini terdapat code untuk memenuhi kebutuhan challenge chapter 6 tentang Binar Car Management API. Repository ini menggunakan boilerplate yang sudah disediakan dari Binar. Challenge ini berisikan endpoint CRUD Cars dan juga endpoint CRUD Users. CRUD Users sendiri berisikan roles yang membedakan Superadmin, Admin, dan Members. Setiap roles khususnya Superadmin dan Admin memiliki authorization untuk mengakses data pada mobil.

```sh
npm install
```

## Database Management

Di dalam repository ini sudah terdapat beberapa script yang dapat digunakan dalam memanage database, yaitu:

- `npm db:create` digunakan untuk membuat database
- `npm db:drop` digunakan untuk menghapus database
- `npm db:migrate` digunakan untuk menjalankan database migration
- `npm db:seed` digunakan untuk melakukan seeding
- `npm db:rollback` digunakan untuk membatalkan migrasi terakhir

## Cars CRUD
- `async list()` digunakan untuk menampilkan semua data mobil (cars) di database
- `async create()` digunakan untuk membuat data mobil (cars) yang baru agar dapat masuk ke database
- `async update()` digunakan untuk memperbarui data mobil (cars) di database menjadi data mobil yang baru
- `async show()` digunakan untuk menampilkan data mobil (cars) di database sesuai ID
- `async destroy()` digunakan untuk menghapus data mobil (cars) di database

## Users CRUD
- `async register()` digunakan untuk register (mendaftar) data users agar masuk kedalam database
- `async login()` digunakan untuk login (masuk) menggunakan data users yang sudah terdaftar
- `async authorize()` digunakan untuk otorisasi data users menggunakan token sesuai login
- `async isAdminOrSuperAdmin()` digunakan untuk otorisasi roles users apakah dia admin atau superadmin
- `async isSuperAdmin()` digunakan untuk otorisasi roles users apakah dia superAdmin
- `async getUsers()` digunakan untuk menampilkan semua data users di database
- `async create()` digunakan untuk membuat data users yang baru agar dapat masuk ke database
- `async update()` digunakan untuk memperbarui data users di database menjadi data mobil yang baru
- `async show()` digunakan untuk menampilkan data users di database sesuai ID
- `async destroy()` digunakan untuk menghapus data users di database
