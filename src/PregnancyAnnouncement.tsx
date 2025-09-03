"use client"

import { useState, useEffect } from "react"
import { Heart } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import eco from "/ecografia.jpg"

const emotiveMessages = [
  "Sos muy importante para mí...",
  "Siempre has estado ahí cuando te necesité...",
  "Tu apoyo significa todo para mí...",
  "Compartimos tantos momentos especiales...",
  "Eres una persona increíble...",
  "Tu amor y cariño son únicos...",
  "Siempre puedo contar contigo...",
  "Eres parte fundamental de mi vida...",
  "Juntos hemos crecido y aprendido tanto...",
  "Tu felicidad es mi felicidad...",
  "Eres una inspiración para mí...",
  "Tu presencia hace todo mejor...",
]

export default function PregnancyAnnouncement() {
  const [timeLeft, setTimeLeft] = useState(20)
  const [currentMessage, setCurrentMessage] = useState(0)
  const [showFinalMessage, setShowFinalMessage] = useState(false)
  const [showBabyPhoto, setShowBabyPhoto] = useState(false)
  const [hearts, setHearts] = useState<Array<{ id: number; x: number; y: number }>>([])

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => {
        setTimeLeft(timeLeft - 1)

        if (timeLeft % 3 === 0 && currentMessage < emotiveMessages.length - 1) {
          setCurrentMessage(currentMessage + 1)
        }

        // Agregar corazones en momentos especiales
        if (timeLeft <= 10 && timeLeft % 2 === 0) {
          const newHeart = {
            id: Date.now(),
            x: Math.random() * 100,
            y: Math.random() * 100,
          }
          setHearts((prev) => [...prev, newHeart])

          // Remover corazón después de 2 segundos
          setTimeout(() => {
            setHearts((prev) => prev.filter((heart) => heart.id !== newHeart.id))
          }, 2000)
        }
      }, 1000)

      return () => clearTimeout(timer)
    } else {
      // Mostrar mensaje final
      setTimeout(() => setShowFinalMessage(true), 500)
      setTimeout(() => setShowBabyPhoto(true), 2500)
    }
  }, [timeLeft, currentMessage])

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-gray-800 via-slate-700 to-zinc-800 flex items-center justify-center  relative overflow-hidden">
      <AnimatePresence>
        {hearts.map((heart) => (
          <motion.div
            key={heart.id}
            initial={{ opacity: 0, scale: 0, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: -100 }}
            exit={{ opacity: 0, scale: 0 }}
            transition={{ duration: 2, ease: "easeOut" }}
            className="absolute pointer-events-none"
            style={{
              left: `${heart.x}%`,
              top: `${heart.y}%`,
            }}
          >
            <Heart className="text-rose-400/15" size={24} />
          </motion.div>
        ))}
      </AnimatePresence>

      <div className="container text-center mx-auto">
        {!showFinalMessage ? (
          <>
            <motion.div
              className="mb-8"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <motion.div
                key={timeLeft}
                initial={{ scale: 1.2 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="text-8xl md:text-9xl font-bold text-emerald-400 mb-4"
              >
                {timeLeft}
              </motion.div>
              <div className="text-xl md:text-2xl text-blue-200">segundos</div>
            </motion.div>

            <div className="relative w-[90%] mx-auto h-32 md:h-40 overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentMessage}
                  initial={{ x: "100%", opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: "-100%", opacity: 0 }}
                  transition={{
                    duration: 0.8,
                    ease: [0.25, 0.46, 0.45, 0.94], 
                  }}
                  className="absolute inset-0"
                >
                  <div className="bg-gray-800/90 backdrop-blur-sm rounded-2xl p-6 md:p-8 shadow-lg border border-emerald-400/50 h-full flex items-center justify-center">
                    <p className="text-lg md:text-2xl text-gray-200 font-medium leading-relaxed text-balance">
                      {emotiveMessages[currentMessage]}
                    </p>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </>
        ) : (
          <AnimatePresence>
            <motion.div
              className="flex flex-col items-center justify-start space-y-2 "
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: "easeOut" }}
            >
              <motion.h1
                className="text-3xl md:text-5xl font-bold text-emerald-400 leading-tight"
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.8}}
              >
                Por eso y muchas cosas más...
              </motion.h1>
              <motion.h2
                className="text-2xl md:text-4xl font-bold text-gray-300 "
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 2 }}
              >
                ¡Estoy muy contento de poder darte la noticia de que van a ser TÍOS!
              </motion.h2>
            </motion.div>

            {showBabyPhoto && (
              <AnimatePresence> 
                <motion.div
                  initial={{ opacity: 0, scale: 0.8, y: 100 }}
                  animate={{ opacity: 1, scale: 1, y: 20 }}
                  transition={{ duration: 1.5, ease: "easeOut" }}
                >
                  <div className="bg-gray-800/80 rounded-3xl p-6 shadow-2xl border-4 border-emerald-400/60 max-w-md mx-auto">
                    <motion.img
                      src={eco}
                      alt="Foto del bebé"
                      className="w-full h-auto rounded-2xl shadow-lg"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1}}
                      transition={{ duration: 4}}
                    />
                    <motion.div
                      className="mt-4 flex justify-center space-x-2"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 4 }}
                    >
                      {[...Array(5)].map((_, i) => (
                        <motion.div
                          key={i}
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{
                            duration: 0.5,
                            delay: 0.8 + i * 0.1,
                            repeat: Number.POSITIVE_INFINITY,
                            repeatType: "reverse",
                            repeatDelay: 1,
                          }}
                        >
                          <Heart className="text-rose-400" size={20} />
                        </motion.div>
                      ))}
                    </motion.div>
                  </div>
                </motion.div>
              </AnimatePresence>
            )}
          </AnimatePresence>
        )}
      </div>

      
    </div>
  )
}
