<template>

<div class="flex justify-between items-center mt-4">

<div
v-for="step in steps"
:key="step.key"
class="flex-1 text-center">

<div
:class="[
' w-8 h-8 mx-auto rounded-full flex items-center justify-center text-white',
isActive(step.key)
? 'bg-emerald-600'
: 'bg-gray-300'
]">
✓
</div>

<p class="text-xs mt-2">
{{ step.label }}
</p>

</div>

</div>

</template>

<script setup>

const props = defineProps({
  status:String
})

const steps = [
 {key:'processing',label:'قيد التجهيز'},
 {key:'ready',label:'جاهز للشحن'},
 {key:'shipping',label:'في الطريق'},
 {key:'delivered',label:'تم الاستلام'}
]

function isActive(step){
  const index = steps.findIndex(s=>s.key===step)
  const current = steps.findIndex(s=>s.key===props.status)
  return index <= current
}
</script>