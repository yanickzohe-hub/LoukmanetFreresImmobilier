<template>
  <div class="relative w-full h-full flex items-center justify-center">
    <svg
      viewBox="0 0 400 400"
      class="w-full h-full max-w-md"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="roofGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#F5A623" />
          <stop offset="100%" stop-color="#D4891A" />
        </linearGradient>
        <linearGradient id="wallGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#ffffff" />
          <stop offset="100%" stop-color="#e8e8e8" />
        </linearGradient>
        <linearGradient id="doorGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#0B1B3D" />
          <stop offset="100%" stop-color="#1a2f5a" />
        </linearGradient>
        <filter id="glow">
          <feGaussianBlur stdDeviation="3" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      <g class="house-group">
        <g class="chimney">
          <rect x="280" y="60" width="24" height="50" rx="2" fill="#b8b8b8" />
          <rect x="276" y="56" width="32" height="10" rx="2" fill="#a0a0a0" />
          <g class="smoke-group">
            <circle class="smoke s1" cx="292" cy="44" r="6" fill="#ffffff" opacity="0.3" />
            <circle class="smoke s2" cx="300" cy="32" r="8" fill="#ffffff" opacity="0.2" />
            <circle class="smoke s3" cx="296" cy="18" r="10" fill="#ffffff" opacity="0.1" />
          </g>
        </g>

        <polygon
          class="roof"
          points="60,160 200,50 340,160"
          fill="url(#roofGrad)"
          stroke="#D4891A"
          stroke-width="2"
        />
        <rect
          class="wall"
          x="80" y="158" width="240" height="160" rx="4"
          fill="url(#wallGrad)"
        />
        <rect
          class="wall-border"
          x="80" y="158" width="240" height="160" rx="4"
          fill="none"
          stroke="#d0d0d0"
          stroke-width="1"
        />

        <rect
          class="door"
          x="172" y="238" width="56" height="80" rx="4"
          fill="url(#doorGrad)"
        />
        <circle class="door-knob" cx="216" cy="278" r="4" fill="#F5A623" />

        <rect
          class="window w1"
          x="104" y="190" width="50" height="56" rx="3"
          fill="#0B1B3D"
          stroke="#F5A623"
          stroke-width="2"
        />
        <rect
          class="window w2"
          x="246" y="190" width="50" height="56" rx="3"
          fill="#0B1B3D"
          stroke="#F5A623"
          stroke-width="2"
        />
        <line class="window-line" x1="129" y1="190" x2="129" y2="246" stroke="#F5A623" stroke-width="1.5" />
        <line class="window-line" x1="104" y1="218" x2="154" y2="218" stroke="#F5A623" stroke-width="1.5" />
        <line class="window-line" x1="271" y1="190" x2="271" y2="246" stroke="#F5A623" stroke-width="1.5" />
        <line class="window-line" x1="246" y1="218" x2="296" y2="218" stroke="#F5A623" stroke-width="1.5" />

        <rect
          class="window-light w1"
          x="106" y="192" width="46" height="52" rx="2"
          fill="#F5A623"
          opacity="0"
        />
        <rect
          class="window-light w2"
          x="248" y="192" width="46" height="52" rx="2"
          fill="#F5A623"
          opacity="0"
        />

        <rect
          class="base"
          x="70" y="316" width="260" height="12" rx="3"
          fill="#c0c0c0"
        />

        <g class="ping-group">
          <circle class="ping-ring" cx="200" cy="360" r="8" fill="none" stroke="#F5A623" stroke-width="2" />
          <path
            class="ping-pin"
            d="M200,352 C194,352 188,357 188,364 C188,374 200,384 200,384 C200,384 212,374 212,364 C212,357 206,352 200,352 Z"
            fill="none"
            stroke="#F5A623"
            stroke-width="2"
          />
        </g>
      </g>
    </svg>

    <span class="absolute -bottom-2 text-gold/40 text-[10px] tracking-widest uppercase font-heading">
      Loukman & Frères
    </span>
  </div>
</template>

<style scoped>
.house-group {
  animation: float 4s ease-in-out infinite;
}

@keyframes float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-8px); }
}

.smoke {
  animation: rise 3s ease-out infinite;
}
.smoke.s2 { animation-delay: 1s; }
.smoke.s3 { animation-delay: 2s; }

@keyframes rise {
  0% { transform: translateY(0) scale(1); opacity: 0.3; }
  100% { transform: translateY(-40px) scale(1.5); opacity: 0; }
}

.window-light.w1 {
  animation: glow 3s ease-in-out infinite;
}
.window-light.w2 {
  animation: glow 3s ease-in-out infinite 1.5s;
}

@keyframes glow {
  0%, 100% { opacity: 0; }
  30% { opacity: 0.15; }
  70% { opacity: 0.15; }
}

.ping-ring {
  animation: ping 2s ease-out infinite;
}

@keyframes ping {
  0% { r: 8; opacity: 1; }
  100% { r: 28; opacity: 0; }
}

.ping-pin {
  animation: pin-pulse 2s ease-in-out infinite;
}

@keyframes pin-pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.6; }
}

.chimney {
  animation: chimney-float 4s ease-in-out infinite;
}

@keyframes chimney-float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-2px); }
}
</style>
