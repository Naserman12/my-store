export default{
    mounted(el, binding) {
        const loadImage = ()=>{
            el.src =binding.value
            el.classList.remove('opacity-0')
            el.classList.add('opacity-100')
        }
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry =>{
                if (entry.isIntersecting) {
                    loadImage()
                    observer.unobserve(el)
                }
            })
        })
        observer.observe(el)
    },
}