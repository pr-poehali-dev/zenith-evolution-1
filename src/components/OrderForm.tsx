import { useState } from "react"
import { motion } from "framer-motion"
import Icon from "@/components/ui/icon"

const ORDER_URL = "https://functions.poehali.dev/0d5c9c92-f548-49c2-8164-3bd55ce7a9d1"

const BAG_TYPES = [
  "Женская сумка (шоппер, тоут)",
  "Женская кроссбоди",
  "Женский клатч",
  "Мужская готическая сумка",
  "Мужской мессенджер",
  "Мужской рюкзак",
  "Мужская поясная сумка",
  "Свой вариант",
]

export default function OrderForm() {
  const [form, setForm] = useState({ name: "", phone: "", bag_type: "", description: "" })
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle")

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus("loading")
    try {
      const res = await fetch(ORDER_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      })
      if (res.ok) {
        setStatus("success")
        setForm({ name: "", phone: "", bag_type: "", description: "" })
      } else {
        setStatus("error")
      }
    } catch {
      setStatus("error")
    }
  }

  return (
    <section id="order" className="relative py-20 bg-white">
      <div className="absolute inset-0 bg-grid-subtle opacity-30 pointer-events-none" />
      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true }}
          className="max-w-2xl mx-auto"
        >
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-6xl font-black tracking-wider text-gray-900 mb-4">
              СДЕЛАТЬ{" "}
              <span className="bg-gradient-to-r from-gray-900 to-gray-500 bg-clip-text text-transparent">ЗАКАЗ</span>
            </h2>
            <p className="text-xl text-gray-600">
              Опишите свою идею — мастер свяжется с вами в течение 24 часов
            </p>
          </div>

          {status === "success" ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-16 border-2 border-gray-900 bg-gray-50"
            >
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 bg-gray-900 rounded-full flex items-center justify-center">
                  <Icon name="Check" size={32} className="text-white" />
                </div>
              </div>
              <h3 className="text-2xl font-black tracking-wider text-gray-900 mb-2">ЗАЯВКА ПРИНЯТА!</h3>
              <p className="text-gray-600 mb-6">
                Мастер свяжется с вами в ближайшее время
              </p>
              <button
                onClick={() => setStatus("idle")}
                className="text-sm font-semibold tracking-wider text-gray-500 hover:text-gray-900 transition-colors underline underline-offset-4"
              >
                Оформить ещё один заказ
              </button>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="border-2 border-gray-900 bg-white p-8 md:p-12 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-bold tracking-widest text-gray-500 mb-2 uppercase">
                    Ваше имя *
                  </label>
                  <input
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    required
                    placeholder="Анастасия"
                    className="w-full border-2 border-gray-200 focus:border-gray-900 outline-none px-4 py-3 text-gray-900 font-medium transition-colors duration-200 bg-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold tracking-widest text-gray-500 mb-2 uppercase">
                    Телефон *
                  </label>
                  <input
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    required
                    placeholder="+7 999 000 00 00"
                    type="tel"
                    className="w-full border-2 border-gray-200 focus:border-gray-900 outline-none px-4 py-3 text-gray-900 font-medium transition-colors duration-200 bg-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold tracking-widest text-gray-500 mb-2 uppercase">
                  Тип сумки
                </label>
                <select
                  name="bag_type"
                  value={form.bag_type}
                  onChange={handleChange}
                  className="w-full border-2 border-gray-200 focus:border-gray-900 outline-none px-4 py-3 text-gray-900 font-medium transition-colors duration-200 bg-white appearance-none cursor-pointer"
                >
                  <option value="">Выберите тип...</option>
                  {BAG_TYPES.map((t) => (
                    <option key={t} value={t}>{t}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold tracking-widest text-gray-500 mb-2 uppercase">
                  Опишите вашу идею
                </label>
                <textarea
                  name="description"
                  value={form.description}
                  onChange={handleChange}
                  placeholder="Цвет кожи, орнамент, размер, фурнитура, особые пожелания..."
                  rows={5}
                  className="w-full border-2 border-gray-200 focus:border-gray-900 outline-none px-4 py-3 text-gray-900 font-medium transition-colors duration-200 bg-white resize-none"
                />
              </div>

              {status === "error" && (
                <p className="text-red-600 text-sm font-medium flex items-center gap-2">
                  <Icon name="AlertCircle" size={16} />
                  Произошла ошибка. Попробуйте ещё раз или напишите нам напрямую.
                </p>
              )}

              <button
                type="submit"
                disabled={status === "loading"}
                className="w-full bg-gray-900 text-white font-bold text-sm tracking-widest uppercase py-4 px-8 hover:bg-gray-700 transition-colors duration-200 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-3"
              >
                {status === "loading" ? (
                  <>
                    <Icon name="Loader2" size={18} className="animate-spin" />
                    Отправляем...
                  </>
                ) : (
                  <>
                    <Icon name="Send" size={18} />
                    Отправить заявку
                  </>
                )}
              </button>

              <p className="text-center text-xs text-gray-400">
                Нажимая кнопку, вы соглашаетесь на обработку персональных данных
              </p>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  )
}
