<script setup>
import { onMounted, ref } from "vue"
import L from "leaflet"

const emit = defineEmits(["select"])

const map = ref(null)
const marker = ref(null)

// إحداثيات افتراضية (مكة مثلاً)
const lat = ref(21.3891)
const lng = ref(39.8579)

onMounted(() => {
  map.value = L.map("map").setView([lat.value, lng.value], 13)

  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: "&copy; OpenStreetMap"
  }).addTo(map.value)

  // marker draggable
  marker.value = L.marker([lat.value, lng.value], {
    draggable: true
  }).addTo(map.value)

  // عند سحب الدبوس
  marker.value.on("dragend", () => {
    const position = marker.value.getLatLng()
    lat.value = position.lat
    lng.value = position.lng

    emit("select", {
      lat: lat.value,
      lng: lng.value
    })
  })

  // عند الضغط على الخريطة
  map.value.on("click", (e) => {
    lat.value = e.latlng.lat
    lng.value = e.latlng.lng

    marker.value.setLatLng(e.latlng)

    emit("select", {
      lat: lat.value,
      lng: lng.value
    })
  })
})

</script>

<template>
  <div id="map" class="w-full h-80 rounded-lg"></div>
</template>