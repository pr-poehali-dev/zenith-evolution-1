import { motion } from "framer-motion"

const photos = [
  {
    src: "https://cdn.poehali.dev/projects/f86017df-c684-412f-8945-29721e51daeb/files/5f7a0bf4-da1c-46dd-a536-2222b86a61d5.jpg",
    alt: "Женская сумка — бордо с цветочным тиснением",
    label: "Женская · Бордо",
  },
  {
    src: "https://cdn.poehali.dev/projects/f86017df-c684-412f-8945-29721e51daeb/files/9225d96a-3dda-4dbd-8e1a-177cdbf743bf.jpg",
    alt: "Женская кроссбоди — сливовый с розами",
    label: "Женская · Кроссбоди",
  },
  {
    src: "https://cdn.poehali.dev/projects/f86017df-c684-412f-8945-29721e51daeb/files/c43477da-c950-4adf-8f11-4b1114067af5.jpg",
    alt: "Женский клатч — чёрный с лунным орнаментом",
    label: "Женская · Клатч",
  },
  {
    src: "https://cdn.poehali.dev/projects/f86017df-c684-412f-8945-29721e51daeb/files/70e0d57a-db51-4924-861c-c6c7cd4db4b5.jpg",
    alt: "Мужская готическая сумка-мессенджер",
    label: "Мужская · Мессенджер",
  },
  {
    src: "https://cdn.poehali.dev/projects/f86017df-c684-412f-8945-29721e51daeb/files/f8782a50-ce67-419c-accb-308bc218415b.jpg",
    alt: "Мужская поясная сумка с рунами",
    label: "Мужская · Поясная",
  },
  {
    src: "https://cdn.poehali.dev/projects/f86017df-c684-412f-8945-29721e51daeb/files/adeac899-6ad7-46cc-8b4a-242ce64fc375.jpg",
    alt: "Мужской рюкзак — чёрный с тиснением дракона",
    label: "Мужская · Рюкзак",
  },
]

export default function GallerySection() {
  return (
    <section id="gallery" className="relative py-20 bg-gray-950">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-6xl font-black tracking-wider text-white mb-4">
            НАШИ{" "}
            <span className="bg-gradient-to-r from-white via-gray-300 to-white bg-clip-text text-transparent">
              РАБОТЫ
            </span>
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Каждое изделие уникально. Это лишь часть того, что мы создаём.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {photos.map((photo, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
              viewport={{ once: true }}
              className="group relative overflow-hidden bg-gray-900 aspect-square"
            >
              <img
                src={photo.src}
                alt={photo.alt}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                <span className="text-white font-semibold text-sm tracking-wider uppercase">
                  {photo.label}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
