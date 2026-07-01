"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function Story() {
  return (
    <section id="story" className="py-24 md:py-40 px-6 bg-vintage-bg overflow-hidden relative">
      <div className="container mx-auto max-w-[90rem] relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-y-16 md:gap-x-12 items-center">
          
          {/* Typography / Editorial Title */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="md:col-span-12 lg:col-span-5 lg:col-start-2 z-20"
          >
            <p className="font-jetbrains text-[10px] md:text-xs tracking-[0.3em] uppercase text-vintage-dusty-green mb-6 md:mb-10">
              Chương I — Khởi Đầu
            </p>
            <h2 className="font-serif text-[4rem] md:text-[7rem] lg:text-[7.5rem] text-vintage-ink leading-[0.85] tracking-tight">
              The Design <br/>
              <span className="italic text-vintage-sepia ml-12 md:ml-24">Of Us</span>
            </h2>
            <div className="mt-12 md:mt-20 space-y-8 font-serif text-lg md:text-2xl font-light leading-relaxed text-vintage-soft-brown max-w-xl">
              <p className="font-serif text-lg md:text-xl text-vintage-soft-brown leading-relaxed max-w-xl text-justify">
              <span className="font-serif text-5xl float-left mr-2 mt-1 text-vintage-burgundy">G</span>
              iống như một tác phẩm nghệ thuật được chế tác tuyệt đẹp, câu chuyện của chúng mình không phải do tình cờ mà có—nó được thiết kế tỉ mỉ bởi thời gian, sự kiên nhẫn và những ước mơ chung. Mỗi nét vẽ trên chặng đường chúng mình đi cùng nhau đều tô điểm thêm chiều sâu và sự ấm áp cho cuộc sống của cả hai.
            </p>
              <p>
                Từ những phác thảo lặng lẽ của những ngày đầu cho đến kiệt tác rực rỡ mà chúng mình đang cùng nhau xây dựng hôm nay, mỗi khoảnh khắc đều là sự lựa chọn đầy ý thức để luôn chọn lấy nhau. Đây chính là tạo tác tuyệt vời nhất của chúng mình.
              </p>
            </div>
          </motion.div>
          
          {/* Asymmetrical Images */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1.5, ease: "easeOut", delay: 0.3 }}
            className="md:col-span-12 lg:col-span-5 lg:col-start-7 relative min-h-[60vh] md:min-h-[80vh] w-full"
          >
            {/* Primary Large Image */}
            <div className="absolute top-0 right-0 w-[85%] h-[70%] z-10 p-2 bg-vintage-ivory shadow-xl rotate-[2deg]">
              <div className="w-full h-full relative overflow-hidden">
                <Image src="/images/gallery-1.png" alt="Our Story" fill className="object-cover grayscale-[40%] sepia-[25%] contrast-110" />
              </div>
            </div>
            
            {/* Secondary Overlapping Image */}
            <div className="absolute bottom-0 left-0 w-[60%] h-[50%] z-20 p-2 bg-vintage-warm-white shadow-lg -rotate-[3deg]">
              <div className="w-full h-full relative overflow-hidden">
                <Image src="/images/gallery-2.png" alt="Our Story Details" fill className="object-cover grayscale-[60%] sepia-[15%] contrast-105" />
              </div>
            </div>
            
            {/* Decorative Element */}
            <div className="absolute top-[60%] -left-12 z-0 font-script text-6xl md:text-8xl text-vintage-champagne opacity-60 -rotate-12">
              Tình yêu bất diệt
            </div>
          </motion.div>
          
        </div>
      </div>
    </section>
  );
}
