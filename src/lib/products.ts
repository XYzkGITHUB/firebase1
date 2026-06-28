import React from 'react';

export interface Product {
  id: string;
  cat: string;
  name: string;
  price: string;
  sub: string;
  image: string;
}

export interface Category {
  id: string;
  name: string;
}

export const CATEGORIES: Category[] = [
  { id: "keramogranit", name: "Керамогранит" },
  { id: "laminate", name: "Ламинат" },
  { id: "carpets", name: "Ковры" },
  { id: "lyustri", name: "Люстры" },
];

export const PRODUCTS: Product[] = [
  // Люстры (Lyustri) - 58 items total
  { id: 'ly1', cat: "lyustri", name: "Люстра", price: "7 000 ₽", sub: "5 ламп", image: "/imgs/Catalog/Lyustri/5-lamp-7000.png" },
  { id: 'ly2', cat: "lyustri", name: "Люстра", price: "8 900 ₽", sub: "6 ламп", image: "/imgs/Catalog/Lyustri/6-lamp-8900-(2).png" },
  { id: 'ly3', cat: "lyustri", name: "Люстра", price: "8 900 ₽", sub: "6 ламп", image: "/imgs/Catalog/Lyustri/6-lamp-8900.png" },
  { id: 'ly4', cat: "lyustri", name: "Люстра", price: "28 500 ₽", sub: "6 ламп", image: "/imgs/Catalog/Lyustri/6-lamp-28500.png" },
  { id: 'ly5', cat: "lyustri", name: "Люстра", price: "6 800 ₽", sub: "8 ламп", image: "/imgs/Catalog/Lyustri/8-lamp-6800.png" },
  { id: 'ly6', cat: "lyustri", name: "Люстра", price: "9 520 ₽", sub: "8 ламп", image: "/imgs/Catalog/Lyustri/8-lamp-9520.png" },
  { id: 'ly7', cat: "lyustri", name: "Люстра", price: "11 900 ₽", sub: "8 ламп", image: "/imgs/Catalog/Lyustri/8-lamp-11900.png" },
  { id: 'ly8', cat: "lyustri", name: "Люстра", price: "15 500 ₽", sub: "8 ламп", image: "/imgs/Catalog/Lyustri/8-lamp-15500.png" },
  { id: 'ly9', cat: "lyustri", name: "Люстра", price: "16 500 ₽", sub: "8 ламп", image: "/imgs/Catalog/Lyustri/8-lamp-16500.png" },
  { id: 'ly10', cat: "lyustri", name: "Люстра", price: "17 000 ₽", sub: "8 ламп", image: "/imgs/Catalog/Lyustri/8-lamp-17000.png" },
  { id: 'ly11', cat: "lyustri", name: "Люстра \"Дождик\"", price: "13 200 ₽", sub: "8 ламп", image: "/imgs/Catalog/Lyustri/8-lamp-dozhdik-13200.png" },
  { id: 'ly12', cat: "lyustri", name: "Люстра", price: "19 500 ₽", sub: "10 ламп", image: "/imgs/Catalog/Lyustri/10-lamp-19500.png" },
  { id: 'ly13', cat: "lyustri", name: "Люстра", price: "24 000 ₽", sub: "10 ламп", image: "/imgs/Catalog/Lyustri/10-lamp-24000.png" },
  { id: 'ly14', cat: "lyustri", name: "Люстра \"Диодная\"", price: "13 120 ₽", sub: "10 ламп", image: "/imgs/Catalog/Lyustri/10-lamp-diodnaya-13120.png" },
  { id: 'ly15', cat: "lyustri", name: "Люстра", price: "15 800 ₽", sub: "11 ламп", image: "/imgs/Catalog/Lyustri/11-lamp-15800.png" },
  { id: 'ly16', cat: "lyustri", name: "Люстра", price: "18 900 ₽", sub: "11 ламп", image: "/imgs/Catalog/Lyustri/11-lamp-18900.png" },
  { id: 'ly17', cat: "lyustri", name: "Люстра", price: "18 500 ₽", sub: "12 ламп", image: "/imgs/Catalog/Lyustri/12-lamp-18500.png" },
  { id: 'ly18', cat: "lyustri", name: "Люстра", price: "25 200 ₽", sub: "12 ламп", image: "/imgs/Catalog/Lyustri/12-lamp-25200.png" },
  { id: 'ly19', cat: "lyustri", name: "Люстра", price: "32 500 ₽", sub: "12 ламп", image: "/imgs/Catalog/Lyustri/12-lamp-32500.png" },
  { id: 'ly20', cat: "lyustri", name: "Люстра \"Ветка\"", price: "23 750 ₽", sub: "12 ламп", image: "/imgs/Catalog/Lyustri/12-lamp-vetka-23750.png" },
  { id: 'ly21', cat: "lyustri", name: "Люстра", price: "17 000 ₽", sub: "15 ламп", image: "/imgs/Catalog/Lyustri/15-lamp-17000.png" },
  { id: 'ly22', cat: "lyustri", name: "Люстра", price: "25 400 ₽", sub: "15 ламп", image: "/imgs/Catalog/Lyustri/15-lamp-25400.png" },
  { id: 'ly23', cat: "lyustri", name: "Люстра", price: "33 750 ₽", sub: "16 ламп", image: "/imgs/Catalog/Lyustri/16-lamp-33750.png" },
  { id: 'ly24', cat: "lyustri", name: "Люстра", price: "33 800 ₽", sub: "16 ламп, диаметр 1000 мм", image: "/imgs/Catalog/Lyustri/16-lamp-diameter-1000cm-33800.png" },
  { id: 'ly25', cat: "lyustri", name: "Люстра", price: "38 000 ₽", sub: "18 ламп", image: "/imgs/Catalog/Lyustri/18-lamp-38000.png" },
  { id: 'ly26', cat: "lyustri", name: "Люстра", price: "47 300 ₽", sub: "18 ламп", image: "/imgs/Catalog/Lyustri/18-lamp-47300.png" },
  { id: 'ly27', cat: "lyustri", name: "Люстра", price: "14 700 ₽", sub: "740x550 мм, 6 ламп", image: "/imgs/Catalog/Lyustri/740mmx550mm-6-lamp-14700.png" },
  { id: 'ly28', cat: "lyustri", name: "Люстра", price: "4 900 ₽", sub: "", image: "/imgs/Catalog/Lyustri/4900.png" },
  { id: 'ly29', cat: "lyustri", name: "Люстра", price: "5 900 ₽", sub: "", image: "/imgs/Catalog/Lyustri/5900.png" },
  { id: 'ly30', cat: "lyustri", name: "Люстра", price: "6 000 ₽", sub: "", image: "/imgs/Catalog/Lyustri/6000.png" },
  { id: 'ly31', cat: "lyustri", name: "Люстра", price: "7 000 ₽", sub: "", image: "/imgs/Catalog/Lyustri/7000-(2).png" },
  { id: 'ly32', cat: "lyustri", name: "Люстра", price: "7 000 ₽", sub: "", image: "/imgs/Catalog/Lyustri/7000.png" },
  { id: 'ly33', cat: "lyustri", name: "Люстра", price: "9 500 ₽", sub: "", image: "/imgs/Catalog/Lyustri/9500.png" },
  { id: 'ly34', cat: "lyustri", name: "Люстра", price: "9 800 ₽", sub: "", image: "/imgs/Catalog/Lyustri/9800.png" },
  { id: 'ly35', cat: "lyustri", name: "Люстра", price: "10 000 ₽", sub: "", image: "/imgs/Catalog/Lyustri/10000.png" },
  { id: 'ly36', cat: "lyustri", name: "Люстра", price: "10 350 ₽", sub: "", image: "/imgs/Catalog/Lyustri/10350.png" },
  { id: 'ly37', cat: "lyustri", name: "Люстра", price: "11 250 ₽", sub: "", image: "/imgs/Catalog/Lyustri/11250.png" },
  { id: 'ly38', cat: "lyustri", name: "Люстра", price: "12 300 ₽", sub: "", image: "/imgs/Catalog/Lyustri/12300.png" },
  { id: 'ly39', cat: "lyustri", name: "Люстра", price: "13 050 ₽", sub: "", image: "/imgs/Catalog/Lyustri/13050.png" },
  { id: 'ly40', cat: "lyustri", name: "Люстра", price: "13 500 ₽", sub: "", image: "/imgs/Catalog/Lyustri/13500.png" },
  { id: 'ly41', cat: "lyustri", name: "Люстра", price: "13 650 ₽", sub: "", image: "/imgs/Catalog/Lyustri/13650.png" },
  { id: 'ly42', cat: "lyustri", name: "Люстра", price: "15 500 ₽", sub: "", image: "/imgs/Catalog/Lyustri/15500.png" },
  { id: 'ly43', cat: "lyustri", name: "Люстра", price: "16 400 ₽", sub: "", image: "/imgs/Catalog/Lyustri/16400.png" },
  { id: 'ly44', cat: "lyustri", name: "Люстра", price: "17 700 ₽", sub: "", image: "/imgs/Catalog/Lyustri/17700.png" },
  { id: 'ly45', cat: "lyustri", name: "Люстра", price: "19 800 ₽", sub: "", image: "/imgs/Catalog/Lyustri/19800.png" },
  { id: 'ly46', cat: "lyustri", name: "Люстра", price: "22 200 ₽", sub: "", image: "/imgs/Catalog/Lyustri/22200.png" },
  { id: 'ly47', cat: "lyustri", name: "Люстра", price: "22 400 ₽", sub: "", image: "/imgs/Catalog/Lyustri/22400.png" },
  { id: 'ly48', cat: "lyustri", name: "Люстра", price: "27 750 ₽", sub: "", image: "/imgs/Catalog/Lyustri/27750.png" },
  { id: 'ly49', cat: "lyustri", name: "Люстра", price: "28 100 ₽", sub: "", image: "/imgs/Catalog/Lyustri/28100.png" },
  { id: 'ly50', cat: "lyustri", name: "Люстра", price: "29 900 ₽", sub: "", image: "/imgs/Catalog/Lyustri/29900.png" },
  { id: 'ly51', cat: "lyustri", name: "Люстра", price: "31 500 ₽", sub: "", image: "/imgs/Catalog/Lyustri/31500.png" },
  { id: 'ly52', cat: "lyustri", name: "Люстра", price: "32 900 ₽", sub: "", image: "/imgs/Catalog/Lyustri/32900.png" },
  { id: 'ly53', cat: "lyustri", name: "Люстра", price: "33 800 ₽", sub: "", image: "/imgs/Catalog/Lyustri/33800.png" },
  { id: 'ly54', cat: "lyustri", name: "Люстра", price: "27 000 ₽", sub: "диаметр 60 см", image: "/imgs/Catalog/Lyustri/diameter-60-27000.png" },
  { id: 'ly55', cat: "lyustri", name: "Люстра \"Диодная\"", price: "33 700 ₽", sub: "диаметр 60 см", image: "/imgs/Catalog/Lyustri/diameter-60-diodnaya-33700.png" },
  { id: 'ly56', cat: "lyustri", name: "Люстра \"Диодная\"", price: "17 040 ₽", sub: "диаметр 800 мм", image: "/imgs/Catalog/Lyustri/diameter-800-diodnaya-17040.png" },
  { id: 'ly57', cat: "lyustri", name: "Люстра \"Диод-Трос\"", price: "17 850 ₽", sub: "", image: "/imgs/Catalog/Lyustri/Diod-tross-17850.png" },
  { id: 'ly58', cat: "lyustri", name: "Люстра \"Диодная\"", price: "25 400 ₽", sub: "", image: "/imgs/Catalog/Lyustri/diodnaya-25400.png" },

  // Ковры (Carpets)
  { id: 'c1', cat: "carpets", name: "Осло", price: "7 650 ₽", sub: "1.5 * 2 м", image: "/imgs/Catalog/Carpets/1,5.2oslo7650.png" },
  { id: 'c2', cat: "carpets", name: "Турецкий Ковер", price: "14 100 ₽", sub: "2.5 * 3.5 м", image: "/imgs/Catalog/Carpets/2,5.3,5turkish14100.avif" },
  { id: 'c3', cat: "carpets", name: "Турецкий Ковер", price: "16 135 ₽", sub: "2.5 * 3.5 м", image: "/imgs/Catalog/Carpets/2,5.3,5turkish16135.png" },
  { id: 'c4', cat: "carpets", name: "Турецкий Ковер", price: "23 100 ₽", sub: "2.5 * 3.5 м", image: "/imgs/Catalog/Carpets/2,5.3,5turkish23100.png" },
  { id: 'c5', cat: "carpets", name: "Ковер", price: "11 400 ₽", sub: "2 * 3 м", image: "/imgs/Catalog/Carpets/2.3carpet11400.png" },
  { id: 'c6', cat: "carpets", name: "Ковер", price: "14 800 ₽", sub: "2 * 3 м", image: "/imgs/Catalog/Carpets/2.3carpet14800.png" },
  { id: 'c7', cat: "carpets", name: "Ковер", price: "16 200 ₽", sub: "2 * 3 м", image: "/imgs/Catalog/Carpets/2.3carpet16200.avif" },
  { id: 'c8', cat: "carpets", name: "Ковер", price: "16 900 ₽", sub: "2 * 3 м", image: "/imgs/Catalog/Carpets/2.3carpet16900.png" },
  { id: 'c9', cat: "carpets", name: "Ковер", price: "17 400 ₽", sub: "2 * 3 м", image: "/imgs/Catalog/Carpets/2.3carpet17400.png" },
  { id: 'c10', cat: "carpets", name: "Ковер", price: "18 000 ₽", sub: "2 * 3 м", image: "/imgs/Catalog/Carpets/2.3carpet18000.png" },
  { id: 'c11', cat: "carpets", name: "Ковер", price: "28 100 ₽", sub: "2 * 3 м", image: "/imgs/Catalog/Carpets/2.3carpet28100.png" },
  { id: 'c12', cat: "carpets", name: "Диор", price: "20 100 ₽", sub: "2.4 м", image: "/imgs/Catalog/Carpets/2.4dior20100.png" },
  { id: 'c13', cat: "carpets", name: "Турецкий Ковер", price: "12 880 ₽", sub: "2.4 м", image: "/imgs/Catalog/Carpets/2.4turkish12880.png" },
  { id: 'c14', cat: "carpets", name: "Толстый Кролик", price: "10 450 ₽", sub: "160 * 230 см", image: "/imgs/Catalog/Carpets/160.230fat-rabbit10450.png" },

  // Керамогранит (Keramogranit)
  { id: 'k1', cat: "keramogranit", name: "Керамогранит", price: "850 ₽/м²", sub: "60x60 см", image: "/imgs/Catalog/Keramogranit/60x60-850.png" },
  { id: 'k2', cat: "keramogranit", name: "Керамогранит", price: "950 ₽/м²", sub: "60x60 см", image: "/imgs/Catalog/Keramogranit/60x60-950.png" },
  { id: 'k3', cat: "keramogranit", name: "Керамогранит", price: "1 450 ₽/м²", sub: "60x60 см", image: "/imgs/Catalog/Keramogranit/60x60-1450.png" },
  { id: 'k4', cat: "keramogranit", name: "Керамогранит", price: "1 100 ₽/м²", sub: "120x60 см", image: "/imgs/Catalog/Keramogranit/120x60-1100.png" },
  { id: 'k5', cat: "keramogranit", name: "Керамогранит", price: "1 250 ₽/м²", sub: "120x60 см", image: "/imgs/Catalog/Keramogranit/120x60-1250.png" },
  { id: 'k6', cat: "keramogranit", name: "Керамогранит", price: "1 400 ₽/м²", sub: "120x60 см", image: "/imgs/Catalog/Keramogranit/120x60-1400.png" },
  { id: 'k7', cat: "keramogranit", name: "Примавера", price: "2 340 ₽/м²", sub: "Керамогранит", image: "/imgs/Catalog/Keramogranit/Primavera-2340.png" },
  { id: 'k8', cat: "keramogranit", name: "Прогресс", price: "1 150 ₽/м²", sub: "Керамогранит", image: "/imgs/Catalog/Keramogranit/Progress-1150.png" },

  // Ламинат (Laminate)
  { id: 'l1', cat: "laminate", name: "Peli Анатолия Кофе", price: "950 ₽/м²", sub: "8мм, 33 класс", image: "/imgs/Catalog/Laminat/8mm-33class-peli-950 (2).png" },
  { id: 'l2', cat: "laminate", name: "Peli Анатолия Белый", price: "950 ₽/м²", sub: "8мм, 33 класс", image: "/imgs/Catalog/Laminat/8mm-33class-Peli-950 (3).png" },  
  { id: 'l3', cat: "laminate", name: "Peli Анатолия Темный дуб", price: "950 ₽/м²", sub: "8мм, 33 класс", image: "/imgs/Catalog/Laminat/8mm-33class-Peli-950.png" }, 
  { id: 'l4', cat: "laminate", name: "Peli Анатолия Бежевый", price: "950 ₽/м²", sub: "8мм", image: "/imgs/Catalog/Laminat/8mm-Peli-Anatolia-Beige.png" },
  { id: 'l5', cat: "laminate", name: "Peli Анатолия Серый", price: "950 ₽/м²", sub: "8мм", image: "/imgs/Catalog/Laminat/8mm-Peli-Anatolia-Gray-950.png" },
  { id: 'l6', cat: "laminate", name: "Дуб Аркадия", price: "1 270 ₽/м²", sub: "12мм, 33 класс", image: "/imgs/Catalog/Laminat/12mm-33class-Dub-Arcadia-1270.png" },
  { id: 'l7', cat: "laminate", name: "Дуб Кайзер", price: "1 270 ₽/м²", sub: "12мм, 33 класс", image: "/imgs/Catalog/Laminat/12mm-33class-Dub-Kaizer-1270.png" },
  { id: 'l8', cat: "laminate", name: "Дуб Медичи", price: "1 300 ₽/м²", sub: "12мм, 33 класс", image: "/imgs/Catalog/Laminat/12mm-33class-Dub-Medichi-1270.png" },
  { id: 'l9', cat: "laminate", name: "Дуб Рональд", price: "1 050 ₽/м²", sub: "12мм", image: "/imgs/Catalog/Laminat/12mm-Dob-Ronald-1050.png" },
  { id: 'l10', cat: "laminate", name: "Дуб Савой", price: "1 100 ₽/м²", sub: "12мм", image: "/imgs/Catalog/Laminat/12mm-Dub-Savoy.png" },
];
