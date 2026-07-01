"use client";

import { motion } from "framer-motion";
import Image from "next/image";

import { useState, useEffect } from "react";

export default function WeddingDetails({ guestName: propGuestName }: { guestName?: string }) {
  const [urlName, setUrlName] = useState<string | null>(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const to = params.get('to');
    if (to) {
      setUrlName(to);
    }
  }, []);

  const finalName = propGuestName || urlName || "Bạn";

  return (
    <section id="details-venue" className="py-24 md:py-40 px-6 bg-vintage-bg text-vintage-ink overflow-hidden relative">
      <div className="container mx-auto max-w-[90rem] relative z-10">
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-y-16 md:gap-x-12 items-center">
          
          {/* Typography */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="md:col-span-12 lg:col-span-6 lg:col-start-2 z-20 space-y-16"
          >
            <div>
              <div className="mb-8">
                <div className="inline-block border border-vintage-ink/15 px-6 py-3 bg-vintage-ivory/30 backdrop-blur-sm">
                  <p className="font-jetbrains text-vintage-soft-brown text-sm md:text-base tracking-widest uppercase font-medium">
                    Thân Mời {finalName}
                  </p>
                </div>
              </div>
              <h2 className="font-serif text-[4rem] md:text-[6rem] lg:text-[7rem] leading-none tracking-tight text-vintage-ink">
                Chung Vui <br/>
                <span className="italic text-vintage-burgundy ml-12 md:ml-24">Cùng Chúng Mình</span>
              </h2>
            </div>

            <div className="space-y-12 max-w-lg mr-auto md:ml-12 lg:ml-0">
              <div className="border-l-2 border-vintage-sepia/30 pl-8">
                <h3 className="font-serif text-3xl mb-4 text-vintage-ink italic">Địa Điểm</h3>
                <p className="font-jetbrains text-xs md:text-sm text-vintage-soft-brown leading-loose text-justify mb-6">
                  Hôn lễ và tiệc mừng của chúng mình sẽ được tổ chức tại một khu vườn thơ mộng. Với không gian xanh mát và lãng mạn, đây là nơi hoàn hảo để chúng mình bắt đầu chương mới của cuộc đời.
                </p>
                <address className="not-italic font-jetbrains text-xs uppercase tracking-widest text-vintage-ink/70 leading-loose">
                  Khu Vườn Cổ Tích<br/>
                  123 Đường Hoa Hồng<br/>
                  Đà Lạt, Lâm Đồng
                </address>
              </div>
              
              <div className="border-l-2 border-vintage-dusty-green/30 pl-8">
                <h3 className="font-serif text-3xl mb-4 text-vintage-ink italic">Lời Cảm Ơn</h3>
                <p className="font-jetbrains text-xs md:text-sm text-vintage-soft-brown leading-loose text-justify">
                  Tụi mình biết bạn rất bận rộn, nên việc bạn dành thời gian đến chung vui đã là món quà vô giá và ý nghĩa nhất đối với hai đứa rồi. Chẳng có lời nào diễn tả hết sự biết ơn này. Cảm ơn bạn vì đã ở đây, chứng kiến và chúc phúc cho tình yêu của tụi mình trong ngày trọng đại nhất.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Image & Dress Code */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1.5, ease: "easeOut", delay: 0.3 }}
            className="md:col-span-12 lg:col-span-4 lg:col-start-8 relative mt-12 lg:mt-0"
          >
            <div className="relative aspect-[4/5] bg-vintage-cream p-4 shadow-2xl rotate-2 z-10 w-full md:w-3/4 mx-auto lg:w-full">
              <div className="w-full h-full relative overflow-hidden">
                <Image 
                  src="/images/gallery-4.png" 
                  alt="Venue" 
                  fill 
                  className="object-cover grayscale-[40%] sepia-[20%] contrast-110"
                />
              </div>
            </div>
            
            <div className="absolute -bottom-16 -left-12 md:-left-24 lg:-left-32 z-20 bg-vintage-ivory p-8 md:p-12 shadow-xl -rotate-3 max-w-sm border border-vintage-ink/5">
              <h3 className="font-script text-5xl md:text-7xl mb-4 text-vintage-champagne text-center -mt-6">
                Trang Phục
              </h3>
              <p className="font-jetbrains text-[10px] md:text-xs tracking-widest text-vintage-ink/80 leading-relaxed text-center uppercase">
                Tối giản và thanh lịch — công thức hoàn hảo dành cho khách mời. Vui lòng chọn trang phục trang trọng, mang âm hưởng Vintage.
              </p>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
