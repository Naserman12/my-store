import  { ref, onMounted } from "vue";
const darkMode = ref(true);

// استرجاع المود عند تحميل الصفحة
// onMounted(() => {
    const savedMode = localStorage.getItem('headerMode')
    if (savedMode !== null) {
        darkMode.value = savedMode === "dark"
    }
// });
const toggleMode = () => {
    darkMode.value = !darkMode.value;
    localStorage.setItem('headerMode', darkMode.value ? 'dark' : 'light')
}
export function useDarkMode() {
 return {darkMode, toggleMode}
}