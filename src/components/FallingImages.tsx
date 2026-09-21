import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';

const PRE_IMAGES = [
  "/pre/1ST MONTH.jpg",
  "/pre/2ND MONTH.jpg",
  "/pre/3RD MONTH.jpg",
  "/pre/4TH MONTH.jpg",
  "/pre/5TH MONTH.jpg",
  "/pre/6TH MONTH.jpeg",
  "/pre/7TH MONTH.jpg",
  "/pre/8TH MONTH.jpg",
  "/pre/9TH MONTH.jpg",
  "/pre/10TH MONTH.jpg",
  "/pre/11TH MONTH.jpg.jpeg",
  "/pre/HOSPITAL.jpg",
  "/pre/NEW BORN.jpg"
];

export const FallingImages: React.FC = () => {
  const [items, setItems] = useState<{ id: number, src: string, x: number, delay: number, duration: number, rotate: number }[]>([]);

  useEffect(() => {
    // Generate an array of falling items
    const generateItems = () => {
      // Duplicate array to have more items falling
      const multipliedImages = [...PRE_IMAGES, ...PRE_IMAGES];
      
      return multipliedImages.map((src, index) => ({
        id: index,
        src,
        x: Math.random() * 80 + 10, // 10% to 90% viewport width
        delay: Math.random() * 3, // 0 to 3s delay
        duration: Math.random() * 8 + 12, // 12s to 20s to fall
        rotate: Math.random() * 40 - 20, // -20 to 20 degrees initial rotation
      }));
    };
    
    setItems(generateItems());
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-[60] overflow-hidden">
      {items.map((item) => (
        <motion.div
          key={item.id}
          className="absolute top-[-200px]"
          initial={{ 
            x: `${item.x}vw`, 
            y: -200, 
            rotate: item.rotate,
            opacity: 0.8
          }}
          animate={{ 
            y: '120vh', 
            rotate: item.rotate + (item.id % 2 === 0 ? 45 : -45) 
          }}
          transition={{
            duration: item.duration,
            repeat: Infinity,
            delay: item.delay,
            ease: "linear"
          }}
        >
          <div className="w-20 h-28 sm:w-28 sm:h-36 p-1 sm:p-1.5 bg-white rounded-md shadow-xl border border-gray-200">
             <img src={item.src} className="w-full h-full object-cover" alt="Memory" />
          </div>
        </motion.div>
      ))}
    </div>
  );
};
