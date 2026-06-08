import HeroSection from "@/components/HeroSection"
import { TextGradientScroll } from "@/components/ui/text-gradient-scroll"
import { Timeline } from "@/components/ui/timeline"
import { StaggerTestimonials } from "@/components/ui/stagger-testimonials"
import { motion } from "framer-motion"
import SmoothScrollHero from "@/components/ui/smooth-scroll-hero"

export default function Index() {
  const missionStatement =
    "В Dark Craft каждая сумка — это маленький шедевр, рождённый из кожи, металла и вдохновения. Мы создаём нежные женские сумки с цветочными узорами и смелые готические изделия для мужчин с металлическими деталями и тёмными орнаментами. Каждый заказ уникален: мы воплощаем именно твою идею, твой образ, твой характер. Ручная работа, честные материалы, душа мастера в каждом стежке — вот наш путь. Доставляем по всей России, потому что настоящее искусство не должно знать границ."

  const timelineEntries = [
    {
      id: 1,
      image: "https://cdn.poehali.dev/projects/f86017df-c684-412f-8945-29721e51daeb/files/315953d0-cbea-4131-9080-a2ecd00fab9f.jpg",
      alt: "Авторская женская сумка с цветочным тиснением",
      title: "Для неё — нежность и характер",
      description:
        "Женские сумки Dark Craft созданы для тех, кто ценит уникальность. Мягкая кожа, изысканное тиснение с цветочными и природными узорами, фурнитура ручной полировки. Каждую сумку мы создаём по пожеланиям заказчицы — форма, цвет, декор. Ничего типового, только твой стиль.",
      layout: "left" as const,
    },
    {
      id: 2,
      image: "https://cdn.poehali.dev/projects/f86017df-c684-412f-8945-29721e51daeb/files/ea23095a-f626-4553-8987-d91f5c374b7a.jpg",
      alt: "Готическая мужская сумка с металлическими деталями",
      title: "Для него — сила и тёмная эстетика",
      description:
        "Готические сумки для мужчин — это заявление. Плотная кожа, металлические цепи, черепа и тёмные орнаменты, массивные застёжки. Мы работаем с мужчинами, которые знают чего хотят и не боятся выделяться. Расскажи нам свою идею — воплотим её в кожу и металл.",
      layout: "right" as const,
    },
    {
      id: 3,
      image: "https://cdn.poehali.dev/projects/f86017df-c684-412f-8945-29721e51daeb/files/32ac45a8-c37b-45dc-a90f-66e66514bc97.jpg",
      alt: "Коллекция авторских сумок Dark Craft",
      title: "Доставим в любую точку России",
      description:
        "Москва, Питер, Новосибирск, Владивосток — не важно, где ты живёшь. Отправляем заказы по всей России надёжными транспортными компаниями. Каждая сумка бережно упакована в фирменный бокс. От первого сообщения до получения посылки — держим тебя в курсе на каждом шаге.",
      layout: "left" as const,
    },
  ]

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <HeroSection />

      {/* Mission Statement Section with Grid Background */}
      <section id="mission" className="relative min-h-screen flex items-center justify-center py-20 bg-white">
        {/* Subtle Grid Pattern */}
        <div className="absolute inset-0 bg-grid-subtle opacity-30 pointer-events-none" />

        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl md:text-6xl font-black tracking-wider mb-12 text-gray-900">НАШ ПОДХОД</h2>
            <TextGradientScroll
              text={missionStatement}
              className="text-2xl md:text-3xl lg:text-4xl font-medium leading-relaxed text-gray-800"
              type="word"
              textOpacity="soft"
            />
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section id="community" className="relative py-20 bg-white">
        {/* Subtle Grid Pattern */}
        <div className="absolute inset-0 bg-grid-subtle opacity-30 pointer-events-none" />

        <div className="relative z-10">
          <div className="container mx-auto px-6 mb-16">
            <div className="text-center">
              <h2 className="text-4xl md:text-6xl font-black tracking-wider mb-6 text-gray-900">НАШИ КОЛЛЕКЦИИ</h2>
              <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto">
                Два мира — один мастер. Авторские сумки для женщин и готические изделия для мужчин.
              </p>
            </div>
          </div>

          <Timeline entries={timelineEntries} />
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="relative py-20 bg-white">
        {/* Subtle Grid Pattern */}
        <div className="absolute inset-0 bg-grid-subtle opacity-30 pointer-events-none" />

        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-6xl font-black tracking-wider text-gray-900 mb-6">
              Что говорят наши{" "}
              <span className="bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">КЛИЕНТЫ</span>
            </h2>
            <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed mb-12">
              Пожелания и отзывы людей, которые уже держат в руках своё уникальное изделие от Dark Craft.
            </p>
          </motion.div>

          <StaggerTestimonials />
        </div>
      </section>

      {/* Smooth Scroll Hero with CTA Overlay */}
      <section id="join" className="relative">
        <SmoothScrollHero
          scrollHeight={2500}
          desktopImage="https://cdn.poehali.dev/projects/f86017df-c684-412f-8945-29721e51daeb/files/32ac45a8-c37b-45dc-a90f-66e66514bc97.jpg"
          mobileImage="https://cdn.poehali.dev/projects/f86017df-c684-412f-8945-29721e51daeb/files/32ac45a8-c37b-45dc-a90f-66e66514bc97.jpg"
          initialClipPercentage={30}
          finalClipPercentage={70}
        />
      </section>
    </div>
  )
}