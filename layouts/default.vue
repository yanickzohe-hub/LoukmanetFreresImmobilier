<template>
  <!-- Layout par défaut : header + contenu + footer -->
  <div class="min-h-screen flex flex-col">
    <SiteHeader />
    <main class="flex-1 pb-24 md:pb-28">
      <slot />
    </main>
    <SiteFooter />
    <LazyFloatingNav />
    <LazyToastContainer />
  </div>
</template>
