<div class="bg-white p-6 rounded-xl shadow">
  <h2 class="text-xl font-bold mb-6">📦 تتبع الطلب</h2>

  <div class="relative border-l-4 border-emerald-500 pl-6">

    <div
      v-for="(step, index) in timeline"
      :key="step.id"
      class="mb-8 relative"
    >
      <!-- الدائرة -->
      <div
        class="absolute -left-3 top-1 w-6 h-6 rounded-full flex items-center justify-center"
        :class="getStepClass(step.status)"
      >
        ✔
      </div>

      <!-- المحتوى -->
      <div>
        <h3 class="font-bold text-lg">
          {{ getStatusName(step.status) }}
        </h3>

        <p class="text-gray-600">{{ step.note }}</p>

        <span class="text-sm text-gray-400">
          {{ formatDate(step.created_at) }}
        </span>
      </div>
    </div>

  </div>
</div>

<script>
function getStatusName(status) {
  const map = {
    pending_payment: "🧾 تم إنشاء الطلب",
    paid: "💳 تم الدفع",
    processing: "⚙️ جاري التجهيز",
    shipped: "🚚 تم الشحن",
    delivered: "📦 تم التسليم",
  };

  return map[status] || status;
}

function getStepClass(status) {
  const active = ['paid', 'processing', 'shipped', 'delivered'];

  return active.includes(status)
    ? 'bg-emerald-500 text-white'
    : 'bg-gray-300 text-gray-500';
}

function formatDate(date) {
  return new Date(date).toLocaleString();
}
</script>