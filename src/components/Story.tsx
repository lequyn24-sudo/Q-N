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

            <h2 className="font-serif text-[4rem] md:text-[7rem] lg:text-[7.5rem] text-vintage-ink leading-[0.85] tracking-tight">
              The Design <br/>
              <span className="italic text-vintage-sepia ml-12 md:ml-24">Of Us</span>
            </h2>
            <div className="mt-12 md:mt-20 space-y-8 font-jetbrains text-xs md:text-sm leading-loose text-vintage-soft-brown max-w-xl text-justify">
              <p>
              <span className="font-serif text-5xl float-left mr-3 mt-1 text-vintage-burgundy leading-none">K</span>
                hông phải mọi bản thiết kế đều bắt đầu từ một ý tưởng hoàn hảo. Có những điều được tạo nên qua từng lần chỉnh sửa, từng cuộc trò chuyện và những ngày cùng nhau cố gắng. Chúng mình gặp nhau vì cùng làm design, rồi dần nhận ra điều đẹp nhất mình tạo ra không phải là một sản phẩm, mà là một mối quan hệ.
              </p>
              <p>
                Đến hôm nay, bản thiết kế ấy vẫn đang được hoàn thiện mỗi ngày—bằng sự thấu hiểu, tôn trọng và lựa chọn đồng hành. Và có lẽ, đây sẽ luôn là project mà cả hai muốn dành nhiều tâm huyết nhất.
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
