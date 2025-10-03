// import { Features } from "tailwindcss"

export const categories = [
    {id: 1, name: "أدوات القهوة", image: ""},
    {id: 2, name: "أدوات المطبخ", image: ""},
    {id: 3, name: "العناية", image: ""},
    {id: 4, name: "الكترونيات", image: ""},
    {id: 5, name: "أثاث", image: ""},
    {id: 6, name: "كتب", image: ""},
    {id: 7, name: "أزياء", image: ""},
    {id: 8, name: "العاب", image: ""},
];

// src/data/products.js

export const products = [
// ======= إلكترونيات )======= (٦
{
id: 1,
name: " Galaxy X20 جوال", 
categories: [1,8,4],
quantity: 10,
oldPrice: 2000,
discount: 20,
newPrice: 1600,
images: ["/images/products/phone1.png"],
features: ["  شاشة١٢٨  إنش", "ذاكرة٦٫٥ GB", "٦٤ MP كاميرا "], 
},
{
id: 2,
name: " iPhone Pro جوال", 
categories: [1,8,4],
quantity: 7,
oldPrice: 4000,
discount: 10,
newPrice: 3600,
images: ["/images/products/iphone.png"],
features: [" شاشةOLED", "٢٥٦ ذاكرةGB", " معالجA16"],
},
{
id: 3,
name: " AirPods سماعات", 
categories: [8,4],
quantity: 15,
oldPrice: 800,
discount: 5,
newPrice: 760,
images: ["/images/products/airpods.png"],
features: [
    "عزل الضوضاء", "صوت نقي"
]
},
{
id: 4,
name: "4K شاشة UHD", 
categories: [8,4],
quantity: 4,
oldPrice: 2500,
discount: 15,
newPrice: 2125,
images: ["/images/products/tv.png"],features: ["65 ٤ K", "HDR", " بوصة", "دقة"],
},
{
id: 5,
name: " لابتوب HP Elite", 
categories: [1,8,4],
quantity: 6,
oldPrice: 3500,
discount: 12,
newPrice: 3080,
images: ["/images/products/laptop.png"],
features: ["١٦ رامGB", "SSD 512GB", " معالجi7"],
},
{
id: 6,
name: " تابلت Galaxy Tab", 
categories: [1, 4, 8],
quantity: 12,
oldPrice: 1500,
discount: 10,
newPrice: 1350,
images: ["/images/products/tablet.png"],
features: ["  شاشة٦٤ GB", "ذاكرة١٠٫٥]"]
},
// ======= أزياء )======= (٦
{id: 7,
name: "قميص قطن رجالي",
categories: [7,3],
quantity: 20,
oldPrice: 150,
discount: 10,
newPrice: 135,
images: ["/images/products/shirt1.png"],
features: [
    "قطن", "ألوان متعددة",
]
},
{
id: 8,
name:"فستان سهرة" ,
categories: [2,7,3],
quantity: 5,
oldPrice: 500,
discount: 20,
newPrice: 400,
images: ["/images/products/dress.png"],
features:[ "قماش فاخر","ألوان متعددة",]
},
{
id: 9,
 name: "بنطال جينز",
categories: [2,7],
quantity: 25,
oldPrice: 200,discount: 5,
newPrice: 190,
images: ["/images/products/jeans.png"],
features:[ "مقاسات متعددة", "لون أزرق غامق",]
},
{
id: 10,
 name: "حذاء رياضي",
categories: [7,3],
quantity: 15,
oldPrice: 350,
discount: 15,
newPrice: 298,
images: ["/images/products/shoes.png"],
features: [
    "مريح","مناسب للجري",
]
},
{
id: 11,
name: "معطف شتوي",
categories: [7,3],
quantity: 10,
oldPrice: 600,
discount: 25,
newPrice: 450,
images: ["/images/products/coat.png"],
features: [
    "مبطن","مقاوم للمطر",
]
},{
id: 12,
name: "تيشيرت شبابي",
categories: [7,3],
quantity: 30,
oldPrice: 100,
discount: 0,
newPrice: 100,
images: ["/images/products/tshirt.png"],
features: [
    "100 قطن", "ألوان متعددة"
]
},
// ======= أثاث )======= (٦
{
id: 13,
name: "كرسي مكتب",
categories: [5,7,8,4],
quantity: 8,
oldPrice: 700,
discount: 15,
newPrice: 595,
images: ["/images/products/chair.png"],
features: [
    "مريح للظهر", "دوران ",
]
},
{
id: 14,
name:"طاولة قهوة",
categories: [8,1,2],
quantity: 12,
oldPrice: 400,
discount: 10,
newPrice: 360,
images: ["/images/products/table.png"],
features: [
    "خشب طبيعي","تصميم عصري",
]
},
{
id: 15,
name: "أريكة  ٣مقاعد",
categories: [5,2],
quantity: 5,
oldPrice: 2500,
discount: 20,
newPrice: 2000,
images: ["/images/products/sofa.png"],
features: [
    "مريحة", "قماش ناعم",
]
},
{
id: 16,
name: "سرير مزدوج",
categories: [5,2],
quantity: 7,
oldPrice: 3000,
discount: 15,
newPrice: 2550,images: ["/images/products/bed.png"],
features: [
    "تصميم خشبي", "مرتبة مريحة",
]
},
{
id: 17,
name: "خزانة ملابس",
categories: [5,2],
quantity: 6,
oldPrice: 2200,
discount: 10,
newPrice: 1980,
images: ["/images/products/wardrobe.png"],
features: ["أبواب منزلقة", "رفوف متعددة"],
},
{
id: 18,
name: "مكتبة جدارية ",
categories: [5,2],
quantity: 10,
oldPrice: 900,
discount: 10,
newPrice: 810,
images: ["/images/products/bookshelf.png"],
features: [
    "تصميم حديث", "سعة كبيرة",
]
},
// ======= كتب )======= (٦{
{
id: 19,
name:"رواية عالم صوفي",
categories: [6],
quantity: 15,
oldPrice: 80,
discount: 0,
newPrice: 80,
images: ["/images/products/book1.png"],
features: [
    "عدد الصفحات: ", "٤٥٠الكاتب: جوستاين غاردر",
]
},
{
id: 20,
name: "كتاب الأب الغني والأب الفقير",
categories: [6],
quantity: 20,
oldPrice: 60,
discount: 0,
newPrice: 60,
images: ["/images/products/book2.png"],
features: [
    "المؤلف: روبرت كيوساكي",
]
},
{
id: 21,
name: "رواية الخيميائي",
categories: [6],
quantity: 25,oldPrice: 70,
discount: 0,
newPrice: 70,
images: ["/images/products/book3.png"],
features:[ "المؤلف: باولو كويلو"],
},
{
id: 22,
name: "كتاب العادات السبع",
categories: [6],
quantity: 18,
oldPrice: 90,
discount: 0,
newPrice: 90,
images: ["/images/products/book4.png"],
features: [
    "المؤلف: ستيفن كوفي",
]
},
{
id: 23,
name: "١٩٨٤ رواية",
categories: [6],
quantity: 12,
oldPrice: 85,
discount: 0,
newPrice: 85,
images: ["/images/products/book5.png"],
features: [
    "المؤلف: جورج أورويل",
]
},
{
id: 24,
name: "كتاب فن اللامبالاة",
categories: [6],
quantity: 22,
oldPrice: 75,
discount: 0,
newPrice: 75,
images: ["/images/products/book6.png"],
features: [
    "المؤلف: مارك مانسون",
]
},
// ======= ألعاب )======= (٦
{
id: 25,
name: "مكعب روبك",
categories: [8],
quantity: 50,
oldPrice: 50,
discount: 0,
newPrice: 50,
images: ["/images/products/rubik.png"],
features: ["جودة عالية", "سهل الحركة"],
},
{
name: "id: 26,كرة قدم",
categories: [8],
quantity: 30,
oldPrice: 120,
discount: 10,
newPrice: 108,
images: ["/images/products/football.png"],
features: [
    "مقاس " ,"٥جلد صناعي",
]
},
{
id: 27,
name: "طاولة تنس",
categories: [8,7],
quantity: 5,
oldPrice: 1500,
discount: 20,
newPrice: 1200,
images: ["/images/products/tabletennis.png"],
features: [
    "مقاس رسمي", "شبكة مرفقة",
]
},
{
id: 28,
name: "دراجة أطفال",
categories: [8,7],
quantity: 10,
oldPrice: 800,
discount: 15,newPrice: 680,
images: ["/images/products/bike.png"],
features: [
    "عجلات تدريب", "ألوان متعددة",
]
},
{
id: 29,
name:"ليغو  ٥٠٠قطعة",
categories: [8],
quantity: 20,
oldPrice: 600,
discount: 10,
newPrice: 540,
images: ["/images/products/lego.png"],
features: [
    " للأطفال مناسبة", "أشكال متعددة" , 
]
},
{
id: 30,
name: "بلاي ستيشن 5",
categories: [5, 1, 8],
quantity: 4,
oldPrice: 3500,
discount: 5,
newPrice: 3325,
images: ["/images/products/ps5.png"],
 features: ["تيرا 1", "يد تحكم مزدوجة",]
},
];