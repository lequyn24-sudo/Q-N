export default function GoogleMapSection() {
  return (
    <section className="w-full h-[50vh] min-h-[400px] bg-[#e5e5e5] relative overflow-hidden flex items-center justify-center">
      {/* Container for styled map effect */}
      <div className="absolute inset-0 z-10 pointer-events-none bg-[#faf9f6] mix-blend-color opacity-50" />
      <div className="absolute inset-0 z-10 pointer-events-none bg-black mix-blend-saturation opacity-80" />
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.062060010078!2d-73.97437142346908!3d40.76450657138379!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c258f00030eb97%3A0xeae06c57dbbbdce2!2sThe%20Plaza!5e0!3m2!1sen!2sus!4v1700000000000!5m2!1sen!2sus"
        width="100%"
        height="100%"
        style={{ border: 0 }}
        allowFullScreen={false}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        className="relative z-0"
      ></iframe>
    </section>
  );
}
