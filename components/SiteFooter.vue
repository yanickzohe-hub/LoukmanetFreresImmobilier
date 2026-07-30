<template>
  <footer class="bg-navy py-6 md:pt-10 md:pb-6 px-4 md:px-6">
    <div class="max-w-6xl mx-auto">
      <div class="flex flex-wrap md:gap-x-10 md:gap-y-6 text-xs md:text-sm">
        <div class="hidden md:block md:w-auto md:max-w-[220px]">
          <NuxtImg src="/logo1.png" alt="Loukman & Frères Immobilier" class="h-10 w-auto mb-2" />
          <p class="text-white/60 leading-relaxed">
            Vente de terrains, lotissement, aménagement, construction et gestion immobilière à Bonoua.
          </p>
        </div>

        <div class="w-full md:w-auto flex md:block items-center gap-3 mb-3 md:mb-0">
          <NuxtImg src="/logo1.png" alt="Loukman & Frères Immobilier" class="md:hidden h-6 w-auto" />
          <div class="flex flex-wrap gap-x-3 gap-y-1 text-white/70 md:mt-0">
            <a href="tel:0708342144" class="flex items-center gap-1 hover:text-white transition-colors">
              <Icon name="phone" class="w-3 h-3 text-gold shrink-0" /> 07 08 34 21 44
            </a>
             <a href="mailto:loukmanfreresimmobilier@gmail.com" class="flex items-center gap-1 hover:text-white transition-colors">
               <Icon name="mail" class="w-3 h-3 text-gold shrink-0" /> loukmanfreresimmobilier@gmail.com
             </a>
            <p class="flex items-center gap-1">
              <Icon name="map-pin" class="w-3 h-3 text-gold shrink-0" /> Bonoua
            </p>
          </div>
        </div>

        <div class="md:block">
          <h4 class="hidden md:block text-white font-semibold mb-2 uppercase tracking-wider">Liens</h4>
          <ul class="flex md:flex-col gap-3 md:gap-1 text-white/60 md:text-white/65">
            <li><NuxtLink to="/services" class="hover:text-white transition-colors">Services</NuxtLink></li>
            <li><NuxtLink to="/terrains" class="hover:text-white transition-colors">Terrains</NuxtLink></li>
            <li><NuxtLink to="/a-propos" class="hover:text-white transition-colors">À propos</NuxtLink></li>
            <li><NuxtLink to="/contact" class="hover:text-white transition-colors">Contact</NuxtLink></li>
          </ul>
        </div>

        <div class="hidden md:block">
          <h4 class="text-white font-semibold mb-2 uppercase tracking-wider">Horaires</h4>
          <div class="space-y-1 text-white/65">
            <p>Lun - Ven : 08h - 18h</p>
            <p>Sam : 09h - 13h</p>
            <p>Dim : Fermé</p>
          </div>
        </div>
      </div>

      <div class="border-t border-white/10 mt-3 md:mt-6 pt-2 md:pt-4 flex flex-col sm:flex-row justify-between items-center gap-0.5 md:gap-1.5 text-[10px] md:text-[11px] text-white/40 md:text-white/50 text-center sm:text-left">
        <p>&copy; {{ new Date().getFullYear() }} Loukman & Frères</p>
        <p>Capital : 1 000 000 FCFA — RC : RC-CI-GRDBSM-2023-B-3985 — SIS : 19 BP 36 ABIDJAN 19</p>
      </div>
    </div>
  </footer>
</template>
