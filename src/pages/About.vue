<template>
  <div class="container mx-auto px-4 py-10">

    <!-- العنوان -->
    <h1 class="text-3xl font-bold text-center mb-10">
      عن متجرنا
    </h1>

    <!-- المحتوى -->
    <div class="grid md:grid-cols-2 gap-10 items-center">

      <!-- صورة -->
      <img
        src="https://via.placeholder.com/600x400"
        class="rounded-xl shadow-lg"
      />

      <!-- النص -->
      <div>
        <h2 class="text-2xl font-semibold mb-4">
          مرحباً بكم في My Store
        </h2>

        <p class="text-gray-600 leading-8 mb-4">
          نحن متجر إلكتروني متخصص في تقديم منتجات عالية الجودة
          بأسعار مناسبة مع تجربة تسوق سهلة وسريعة.
        </p>

        <p class="text-gray-600 leading-8 mb-4">
          هدفنا هو توفير أفضل المنتجات مع خدمة عملاء ممتازة
          وشحن سريع وآمن.
        </p>

        <!-- المميزات -->
        <div class="grid grid-cols-2 gap-4 mt-6">

          <div class="bg-gray-100 p-4 rounded-lg text-center font-medium">🚚 شحن سريع</div>
          <div class="bg-gray-100 p-4 rounded-lg text-center font-medium">💳 دفع آمن</div>
          <div class="bg-gray-100 p-4 rounded-lg text-center font-medium">⭐ منتجات مميزة</div>
          <div class="bg-gray-100 p-4 rounded-lg text-center font-medium">📞 دعم دائم</div>

        </div>
      </div>

    </div>
  </div>
</template>