<template>
  <!-- Layout par défaut : header + contenu + footer -->
  <div class="min-h-screen flex flex-col">
    <SiteHeader />
    <main class="flex-1 pb-36 md:pb-44">
      <slot />
    </main>
    <SiteFooter />
    <LazyFloatingNav />
    <LazyToastContainer />
  </div>
</template>
