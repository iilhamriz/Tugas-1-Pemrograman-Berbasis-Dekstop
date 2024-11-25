import java.util.Scanner;

class Menu {
    private String nama;
    private double harga;
    private String kategori;

    public Menu(String nama, double harga, String kategori) {
        this.nama = nama;
        this.harga = harga;
        this.kategori = kategori;
    }

    public String getNama() {
        return nama;
    }

    public double getHarga() {
        return harga;
    }

    public String getKategori() {
        return kategori;
    }
}

public class Main {
    static Menu[] daftarMenu = {
        new Menu("Nasi Padang", 20000, "makanan"),
        new Menu("Sate Ayam", 25000, "makanan"),
        new Menu("Ayam Goreng", 22000, "makanan"),
        new Menu("Mie Goreng", 15000, "makanan"),
        new Menu("Teh Manis", 5000, "minuman"),
        new Menu("Es Jeruk", 7000, "minuman"),
        new Menu("Kopi", 10000, "minuman"),
        new Menu("Susu", 8000, "minuman")
    };

    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);

        tampilkanMenu();
        System.out.println("Masukkan pesanan Anda (format: Nama Menu = Jumlah, ketik 'selesai' untuk mengakhiri):");

        Menu[] pesanan = new Menu[4];
        int[] jumlahPesanan = new int[4];
        int pesananCount = 0;

        while (pesananCount < 4) {
            System.out.print("Masukkan pesanan (misal: Kopi = 2 atau ketik 'selesai' jika sudah cukup): ");
            String input = scanner.nextLine();

            if (input.equalsIgnoreCase("selesai")) {
                break;
            }

            String[] parts = input.split("=");
            if (parts.length == 2) {
                String namaPesanan = parts[0].trim();
                int jumlah = Integer.parseInt(parts[1].trim());
                Menu item = cariMenu(namaPesanan);

                if (item != null) {
                    pesanan[pesananCount] = item;
                    jumlahPesanan[pesananCount] = jumlah;
                    pesananCount++;
                } else {
                    System.out.println("Menu tidak ditemukan. Silakan masukkan lagi.");
                }
            } else {
                System.out.println("Format input salah. Silakan masukkan dengan format Nama Menu = Jumlah.");
            }
        }

        cetakStruk(pesanan, jumlahPesanan);
        scanner.close();
    }

    public static void tampilkanMenu() {
        System.out.println("Menu Makanan:");
        for (Menu menu : daftarMenu) {
            if (menu.getKategori().equals("makanan")) {
                System.out.println("- " + menu.getNama() + " : Rp " + menu.getHarga());
            }
        }

        System.out.println("Menu Minuman:");
        for (Menu menu : daftarMenu) {
            if (menu.getKategori().equals("minuman")) {
                System.out.println("- " + menu.getNama() + " : Rp " + menu.getHarga());
            }
        }
    }

    public static Menu cariMenu(String nama) {
        for (Menu menu : daftarMenu) {
            if (menu.getNama().equalsIgnoreCase(nama)) {
                return menu;
            }
        }
        return null;
    }

    public static void cetakStruk(Menu[] pesanan, int[] jumlahPesanan) {
        double totalBiaya = 0;
        double biayaDiskon = 0;
        boolean minumanDiskon = false;

        System.out.println("\n========== Struk Pesanan ==========");
        for (int i = 0; i < pesanan.length && pesanan[i] != null; i++) {
            double hargaTotalItem = pesanan[i].getHarga() * jumlahPesanan[i];
            System.out.println(pesanan[i].getNama() + " x" + jumlahPesanan[i] + " = Rp " + hargaTotalItem);
            totalBiaya += hargaTotalItem;

            if (pesanan[i].getKategori().equals("minuman") && totalBiaya > 50000 && !minumanDiskon) {
                hargaTotalItem -= pesanan[i].getHarga();
                minumanDiskon = true;
            }
        }

        double pajak = totalBiaya * 0.10;
        double biayaPelayanan = 20000;
        double totalAkhir = totalBiaya + pajak + biayaPelayanan;

        if (totalAkhir > 100000) {
            biayaDiskon = totalAkhir * 0.10;
            totalAkhir -= biayaDiskon;
        }

        System.out.println("----------------------------------");
        System.out.println("Subtotal : Rp " + totalBiaya);
        System.out.println("Pajak (10%) : Rp " + pajak);
        System.out.println("Biaya Pelayanan : Rp " + biayaPelayanan);

        if (biayaDiskon > 0) {
            System.out.println("Diskon 10% : Rp " + biayaDiskon);
        }

        if (minumanDiskon) {
            System.out.println("Promo Beli 1 Gratis 1 (Minuman) telah diterapkan.");
        }

        System.out.println("Total Akhir : Rp " + totalAkhir);
        System.out.println("===================================");
    }
}
