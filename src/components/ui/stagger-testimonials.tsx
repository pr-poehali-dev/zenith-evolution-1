import type React from "react"
import { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"

const SQRT_5000 = Math.sqrt(5000)

// Running club testimonials data with randomly generated icons
const testimonials = [
  {
    tempId: 0,
    testimonial:
      "Заказывала сумку с розами и готическим орнаментом — получила шедевр. Мастер учёл каждую мелочь, которую я описала. Ношу её уже полгода и до сих пор получаю комплименты на улице.",
    by: "Анастасия М., Москва",
    imgSrc: "https://api.dicebear.com/7.x/initials/svg?seed=AnastasiyaM&backgroundColor=7c3aed&textColor=ffffff",
  },
  {
    tempId: 1,
    testimonial:
      "Хотел готическую сумку через плечо с черепами и цепями — не верил, что найду что-то достойное. Dark Craft сделали именно то, что я просил. Качество кожи отличное, швы идеальные.",
    by: "Виктор Г., Санкт-Петербург",
    imgSrc: "https://api.dicebear.com/7.x/initials/svg?seed=ViktorG&backgroundColor=1e293b&textColor=ffffff",
  },
  {
    tempId: 2,
    testimonial:
      "Мне нужна была маленькая женская сумочка с тиснением в стиле темной романтики. Мастер предложил несколько вариантов эскизов, выбрала лучший — и не пожалела ни на секунду!",
    by: "Дарья К., Екатеринбург",
    imgSrc: "https://api.dicebear.com/7.x/initials/svg?seed=DaryaK&backgroundColor=be185d&textColor=ffffff",
  },
  {
    tempId: 3,
    testimonial:
      "Живу в Новосибирске, доставка пришла быстро и в отличной упаковке. Сумка завёрнута в крафтовую бумагу и уложена в красивую коробку. Сразу видно — люди делают это с душой.",
    by: "Игорь С., Новосибирск",
    imgSrc: "https://api.dicebear.com/7.x/initials/svg?seed=IgorS&backgroundColor=0f172a&textColor=ffffff",
  },
  {
    tempId: 4,
    testimonial:
      "Заказывала в подарок подруге — она в восторге. Мастер помог подобрать цвет и размер по фото. Это не просто сумка, это произведение искусства. Рекомендую всем!",
    by: "Ксения Л., Казань",
    imgSrc: "https://api.dicebear.com/7.x/initials/svg?seed=KseniyaL&backgroundColor=9333ea&textColor=ffffff",
  },
  {
    tempId: 5,
    testimonial:
      "Долго искал мастера для мужской кожаной сумки в тёмном стиле. Везде либо масс-маркет, либо слишком дорого и без индивидуальности. Dark Craft — находка. Сделали именно под мой образ.",
    by: "Роман В., Краснодар",
    imgSrc: "https://api.dicebear.com/7.x/initials/svg?seed=RomanV&backgroundColor=292524&textColor=ffffff",
  },
  {
    tempId: 6,
    testimonial:
      "Процесс заказа очень приятный — мастер общается, объясняет, присылает фото в процессе работы. Чувствуешь, что сумку делают именно для тебя, а не штампуют на конвейере.",
    by: "Полина Р., Самара",
    imgSrc: "https://api.dicebear.com/7.x/initials/svg?seed=PolinaR&backgroundColor=6d28d9&textColor=ffffff",
  },
  {
    tempId: 7,
    testimonial:
      "Была скептически настроена насчёт онлайн-заказа авторской вещи. Но всё прошло идеально: обсудили детали в переписке, оплата без проблем, доставка во Владивосток за 9 дней.",
    by: "Светлана Н., Владивосток",
    imgSrc: "https://api.dicebear.com/7.x/initials/svg?seed=SvetlanaN&backgroundColor=a21caf&textColor=ffffff",
  },
  {
    tempId: 8,
    testimonial:
      "Мужская сумка-мессенджер с готическим узором — ношу каждый день уже год. Кожа не потеряла вид, швы не расходятся. Видно, что материалы и работа высокого класса.",
    by: "Артём Ф., Ростов-на-Дону",
    imgSrc: "https://api.dicebear.com/7.x/initials/svg?seed=ArtemF&backgroundColor=18181b&textColor=ffffff",
  },
  {
    tempId: 9,
    testimonial:
      "Хотела что-то особенное — женскую сумку с элементами темной эстетики, но без перебора. Мастер нашёл идеальный баланс: изящно, стильно, немного мрачно. Именно то, что я описала.",
    by: "Валерия Т., Тюмень",
    imgSrc: "https://api.dicebear.com/7.x/initials/svg?seed=ValeriyaT&backgroundColor=5b21b6&textColor=ffffff",
  },
  {
    tempId: 10,
    testimonial:
      "Заказывал уже трижды — каждый раз новый дизайн. Мастер помнит мои предпочтения и каждый раз предлагает что-то интересное. Это уже не просто покупка, а творческое сотрудничество.",
    by: "Никита М., Пермь",
    imgSrc: "https://api.dicebear.com/7.x/initials/svg?seed=NikitaM&backgroundColor=0c0a09&textColor=ffffff",
  },
  {
    tempId: 11,
    testimonial:
      "Цены адекватные для авторской ручной работы. Я смотрела разные мастерские — здесь лучшее соотношение цены и качества. И подход очень человеческий, без высокомерия.",
    by: "Татьяна Б., Уфа",
    imgSrc: "https://api.dicebear.com/7.x/initials/svg?seed=TatyanaB&backgroundColor=86198f&textColor=ffffff",
  },
  {
    tempId: 12,
    testimonial:
      "Получил сумку — внутри лежала открытка с благодарностью от мастера. Мелочь, но это очень трогательно. Видно, что люди вкладывают в работу не только руки, но и сердце.",
    by: "Олег К., Воронеж",
    imgSrc: "https://api.dicebear.com/7.x/initials/svg?seed=OlegK&backgroundColor=1c1917&textColor=ffffff",
  },
  {
    tempId: 13,
    testimonial:
      "Подруга увидела мою сумку и тоже заказала. Теперь мы обе ходим с авторскими изделиями Dark Craft — и каждый раз находятся люди, которые спрашивают, где взяли такую красоту.",
    by: "Марина Е., Волгоград",
    imgSrc: "https://api.dicebear.com/7.x/initials/svg?seed=MarinaE&backgroundColor=7e22ce&textColor=ffffff",
  },
  {
    tempId: 14,
    testimonial:
      "Сделал заказ из Хабаровска — думал, будут проблемы с доставкой. Всё пришло целым, упаковано на совесть. Сумка превзошла ожидания. Уже думаю над следующим заказом.",
    by: "Денис Ш., Хабаровск",
    imgSrc: "https://api.dicebear.com/7.x/initials/svg?seed=DenisS&backgroundColor=0f0f0f&textColor=ffffff",
  },
  {
    tempId: 15,
    testimonial:
      "Женская сумка через плечо с тёмными цветами и серебряной фурнитурой — просто мечта. Мастер предложил добавить внутренний карман с застёжкой. Не просила, но оценила заботу.",
    by: "Юлия П., Нижний Новгород",
    imgSrc: "https://api.dicebear.com/7.x/initials/svg?seed=YuliyaP&backgroundColor=4c1d95&textColor=ffffff",
  },
  {
    tempId: 16,
    testimonial:
      "Готическая поясная сумка с металлическими заклёпками — то, что я искал очень долго. Нигде не мог найти нужного размера и качества. Dark Craft сделали под заказ за две недели.",
    by: "Максим З., Челябинск",
    imgSrc: "https://api.dicebear.com/7.x/initials/svg?seed=MaksimZ&backgroundColor=171717&textColor=ffffff",
  },
  {
    tempId: 17,
    testimonial:
      "Очень понравилось, что можно обсудить всё до мелочей: длину ремня, тип застёжки, цвет нитей. Это настоящий индивидуальный подход. Результат — идеальная вещь под мой стиль.",
    by: "Алина В., Красноярск",
    imgSrc: "https://api.dicebear.com/7.x/initials/svg?seed=AlinaV&backgroundColor=6b21a8&textColor=ffffff",
  },
  {
    tempId: 18,
    testimonial:
      "Приятно удивлён скоростью работы — от заявки до готовой сумки прошло 12 дней. При этом качество ни капли не пострадало. Буду рекомендовать всем друзьям.",
    by: "Евгений К., Омск",
    imgSrc: "https://api.dicebear.com/7.x/initials/svg?seed=EvgeniyK&backgroundColor=27272a&textColor=ffffff",
  },
  {
    tempId: 19,
    testimonial:
      "Dark Craft — это не магазин, это мастерская с душой. Здесь тебя слышат, понимают твою эстетику и воплощают её в кожу. Такой подход встречается редко — ценю и уважаю.",
    by: "Ирина Д., Томск",
    imgSrc: "https://api.dicebear.com/7.x/initials/svg?seed=IrinaD&backgroundColor=581c87&textColor=ffffff",
  },
]

interface TestimonialCardProps {
  position: number
  testimonial: (typeof testimonials)[0]
  handleMove: (steps: number) => void
  cardSize: number
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({ position, testimonial, handleMove, cardSize }) => {
  const isCenter = position === 0
  return (
    <div
      onClick={() => handleMove(position)}
      className={cn(
        "absolute left-1/2 top-1/2 cursor-pointer border-2 p-8 transition-all duration-500 ease-in-out",
        isCenter
          ? "z-10 bg-gray-900 text-white border-gray-900"
          : "z-0 bg-white text-gray-900 border-gray-200 hover:border-gray-400",
      )}
      style={{
        width: cardSize,
        height: cardSize,
        clipPath: `polygon(50px 0%, calc(100% - 50px) 0%, 100% 50px, 100% 100%, calc(100% - 50px) 100%, 50px 100%, 0 100%, 0 0)`,
        transform: `
          translate(-50%, -50%)
          translateX(${(cardSize / 1.5) * position}px)
          translateY(${isCenter ? -65 : position % 2 ? 15 : -15}px)
          rotate(${isCenter ? 0 : position % 2 ? 2.5 : -2.5}deg)
        `,
        boxShadow: isCenter ? "0px 8px 0px 4px hsl(var(--border))" : "0px 0px 0px 0px transparent",
      }}
    >
      <span
        className="absolute block origin-top-right rotate-45 bg-gray-300"
        style={{
          right: -2,
          top: 48,
          width: SQRT_5000,
          height: 2,
        }}
      />
      <img
        src={testimonial.imgSrc || "/placeholder.svg"}
        alt={`${testimonial.by.split(",")[0]}`}
        className="mb-4 h-14 w-12 bg-gray-100 object-cover object-top"
        style={{
          boxShadow: "3px 3px 0px hsl(var(--background))",
        }}
      />
      <h3 className={cn("text-base sm:text-xl font-medium", isCenter ? "text-white" : "text-gray-900")}>
        "{testimonial.testimonial}"
      </h3>
      <p
        className={cn(
          "absolute bottom-8 left-8 right-8 mt-2 text-sm italic",
          isCenter ? "text-gray-300" : "text-gray-600",
        )}
      >
        - {testimonial.by}
      </p>
    </div>
  )
}

export const StaggerTestimonials: React.FC = () => {
  const [cardSize, setCardSize] = useState(365)
  const [testimonialsList, setTestimonialsList] = useState(testimonials)

  const handleMove = (steps: number) => {
    const newList = [...testimonialsList]
    if (steps > 0) {
      for (let i = steps; i > 0; i--) {
        const item = newList.shift()
        if (!item) return
        newList.push({ ...item, tempId: Math.random() })
      }
    } else {
      for (let i = steps; i < 0; i++) {
        const item = newList.pop()
        if (!item) return
        newList.unshift({ ...item, tempId: Math.random() })
      }
    }
    setTestimonialsList(newList)
  }

  useEffect(() => {
    const updateSize = () => {
      const { matches } = window.matchMedia("(min-width: 640px)")
      setCardSize(matches ? 365 : 290)
    }
    updateSize()
    window.addEventListener("resize", updateSize)
    return () => window.removeEventListener("resize", updateSize)
  }, [])

  return (
    <div className="relative w-full overflow-hidden bg-white" style={{ height: 600 }}>
      {testimonialsList.map((testimonial, index) => {
        const position =
          testimonialsList.length % 2 ? index - (testimonialsList.length + 1) / 2 : index - testimonialsList.length / 2
        return (
          <TestimonialCard
            key={testimonial.tempId}
            testimonial={testimonial}
            handleMove={handleMove}
            position={position}
            cardSize={cardSize}
          />
        )
      })}
      <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2">
        <button
          onClick={() => handleMove(-1)}
          className={cn(
            "flex h-14 w-14 items-center justify-center text-2xl transition-colors",
            "bg-white border-2 border-gray-300 hover:bg-gray-900 hover:text-white",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-500 focus-visible:ring-offset-2",
          )}
          aria-label="Предыдущий отзыв"
        >
          <ChevronLeft />
        </button>
        <button
          onClick={() => handleMove(1)}
          className={cn(
            "flex h-14 w-14 items-center justify-center text-2xl transition-colors",
            "bg-white border-2 border-gray-300 hover:bg-gray-900 hover:text-white",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-500 focus-visible:ring-offset-2",
          )}
          aria-label="Следующий отзыв"
        >
          <ChevronRight />
        </button>
      </div>
    </div>
  )
}