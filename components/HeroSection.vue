<template>
  <section class="relative min-h-screen flex items-center overflow-hidden">
    <div class="absolute inset-0 bg-gradient-to-br from-navy via-[#0f1f4a] to-navy z-10"></div>

    <div class="relative z-20 w-full section-container px-5 md:px-8 lg:px-12">
      <div class="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center min-h-[60vh] py-24 md:py-32">
        <div class="animate-on-scroll">
          <p class="text-gold text-xs md:text-sm font-semibold uppercase tracking-widest mb-3">
            Paysage de terrains à Bonoua
          </p>
          <p class="text-white/60 text-xs md:text-sm mb-3">
            Bonoua · Grand-Bassam · Côte d'Ivoire
          </p>
          <h1 class="text-[clamp(1.75rem,3.5vw,3.25rem)] text-white font-bold mb-4 leading-snug max-w-lg">
            Loukman & Frères <span class="text-gold">Immobilier</span>
          </h1>
          <p class="text-white/70 text-sm md:text-base max-w-md mb-8 leading-relaxed">
            Terrains viabilisés, lotissement, construction et gestion immobilière
            — depuis 2012 au service de la région de Bonoua.
          </p>
          <div class="flex flex-col sm:flex-row gap-3 md:gap-4">
            <NuxtLink to="/terrains" class="btn-cta text-sm md:text-base">
              Découvrir nos terrains
            </NuxtLink>
            <a
              href="https://wa.me/2250708342144"
              target="_blank"
              rel="noopener"
              class="btn-outline-white text-sm md:text-base"
            >
              <Icon name="whatsapp" class="w-4 h-4" />
              WhatsApp
            </a>
          </div>

          <div class="flex items-center gap-6 mt-8 pt-6 border-t border-white/10">
            <div class="flex -space-x-2">
              <div class="w-8 h-8 rounded-full border-2 border-navy bg-gold/20 flex items-center justify-center text-xs font-bold text-gold">120+</div>
            </div>
            <p class="text-white/50 text-xs">Terrains disponibles<br/>dans la région</p>
          </div>
        </div>

        <div class="animate-on-scroll" style="animation-delay: 0.2s">
          <div class="relative max-w-md mx-auto lg:mx-0">
            <div class="aspect-square rounded-full overflow-hidden shadow-2xl bg-navy/60">
              <GlobeCdn />
            </div>
            <div class="absolute -bottom-4 -left-4 w-24 h-24 rounded-xl bg-gold/10 border border-gold/20 flex items-center justify-center backdrop-blur-sm">
              <span class="text-gold font-heading font-bold text-lg">12+</span>
            </div>
            <div class="absolute -top-4 -right-4 w-20 h-20 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center backdrop-blur-sm">
              <span class="text-white/80 font-heading font-bold text-sm">Ans</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
