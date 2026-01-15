export default function FeaturesGrid() {
  return (
    <section className="w-full bg-[#0a0a0a] text-white py-20 px-4 md:px-20 border-t border-white/10 relative z-30">
      <div className="mb-10">
         <h3 className="text-xs font-mono text-gray-500 mb-2">TECHNICAL SPECIFICATIONS</h3>
         <h2 className="font-oswald text-4xl font-bold">BUILT TO PERFORM.</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 md:grid-rows-2 gap-4 h-auto md:h-[600px]">
        <div className="md:col-span-2 row-span-2 bg-neutral-900/50 border border-white/10 p-8 rounded-2xl relative overflow-hidden group hover:border-white/30 transition-colors">
          <div className="absolute top-4 right-4 text-xs font-mono border border-white/20 px-2 rounded-full">RAW MATERIAL</div>
          <h3 className="font-oswald text-3xl mb-4 mt-8">EUROPEAN PAPER BOARD</h3>
          <p className="text-gray-400 max-w-sm text-sm leading-relaxed">
            ورق أوروبي عالي الكثافة (350 GSM) لضمان الصلابة. طبقة عزل PE آمنة غذائياً 100%.
          </p>
        </div>
        <div className="bg-neutral-900/50 border border-white/10 p-6 rounded-2xl flex flex-col justify-between hover:border-white/30 transition-colors">
            <h4 className="font-bold mb-1">OFFSET PRINTING</h4>
            <p className="text-xs text-gray-500">6 Colors HD</p>
        </div>
        <div className="bg-neutral-900/50 border border-white/10 p-6 rounded-2xl flex flex-col justify-between hover:border-white/30 transition-colors">
            <h4 className="font-bold mb-1">LEAK PROOF</h4>
            <p className="text-xs text-gray-500">Ultrasonic Sealing</p>
        </div>
      </div>
    </section>
  );
}